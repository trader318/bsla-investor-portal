import { createHash, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { issueAccessToken } from '@/lib/accessTokenStore';

export const runtime = 'nodejs';

type AccessPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  accreditationBasis?: string;
  investmentRange?: string;
  source?: string;
  notes?: string;
  ndaAccepted?: boolean;
  accreditationConfirmed?: boolean;
  riskAccepted?: boolean;
};

function splitName(name: string) {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length <= 1) return { firstName: trimmed, lastName: '' };
  return { firstName: parts.slice(0, -1).join(' '), lastName: parts.at(-1) ?? '' };
}

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, '').slice(0, 20);
}

function badRequest(code: string, message: string) {
  return NextResponse.json({ ok: false, code, message }, { status: 400 });
}

function encodeRef(email: string) {
  return Buffer.from(email, 'utf8').toString('base64url');
}

function originAllowed(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_BASE_URL;
  if (!appUrl) return true;
  try {
    return new URL(origin).host === new URL(appUrl).host;
  } catch {
    return false;
  }
}

async function upsertGhlContact(payload: Required<Pick<AccessPayload, 'name' | 'email' | 'phone' | 'accreditationBasis' | 'investmentRange'>> & AccessPayload) {
  const ghlApiKey = process.env.GHL_API_KEY;
  const ghlLocationId = process.env.GHL_LOCATION_ID;
  if (!ghlApiKey || !ghlLocationId) {
    return { ok: false as const, code: 'GHL_CONFIG_MISSING' as const };
  }

  const { firstName, lastName } = splitName(payload.name);
  const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ghlApiKey}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId: ghlLocationId,
      firstName,
      lastName,
      name: payload.name,
      email: payload.email,
      phone: normalizePhone(payload.phone),
      companyName: payload.company || undefined,
      customFields: [
        { key: 'accreditationBasis', field_value: payload.accreditationBasis },
        { key: 'investmentRange', field_value: payload.investmentRange },
        { key: 'commitment_amount', field_value: payload.investmentRange },
        { key: 'source', field_value: payload.source || '' },
        { key: 'notes', field_value: payload.notes || '' },
        { key: 'ndaAccepted', field_value: String(payload.ndaAccepted) },
        { key: 'accreditationConfirmed', field_value: String(payload.accreditationConfirmed) },
        { key: 'riskAccepted', field_value: String(payload.riskAccepted) },
      ],
    }),
  });

  if (!upsertRes.ok) {
    return { ok: false as const, code: 'GHL_UPSERT_FAILED' as const };
  }

  const upsertJson = (await upsertRes.json()) as {
    contact?: { id?: string };
    id?: string;
  };
  const contactId = upsertJson.contact?.id || upsertJson.id;

  if (contactId) {
    const tags = [
      'bsla_access_requested',
      'bsla_accredited_self_attested',
      'bsla_investor_portal',
      `range:${payload.investmentRange.toLowerCase().replace(/\s+/g, '-')}`,
      payload.source ? `source:${payload.source.toLowerCase().replace(/\s+/g, '-')}` : null,
    ].filter(Boolean);

    await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({ tags }),
    });
  }

  return { ok: true as const, contactId };
}

async function sendAccessEmail(params: {
  email: string;
  name: string;
  dealRoomUrl: string;
  expiresAt: string;
  requestId: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;
  const resendFromName = process.env.RESEND_FROM_NAME || 'BSLA';
  if (!resendApiKey || !resendFromEmail) {
    return { ok: false as const, code: 'RESEND_CONFIG_MISSING' as const };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${resendFromName} <${resendFromEmail}>`,
      to: [params.email],
      subject: 'Your Private BSLA Deal Room Access Link',
      html: `
        <p>Hi ${params.name},</p>
        <p>Thanks for submitting your investor intake. Your private deal room link is below:</p>
        <p><a href="${params.dealRoomUrl}">${params.dealRoomUrl}</a></p>
        <p>This link expires on <strong>${new Date(params.expiresAt).toUTCString()}</strong>.</p>
        <p>Please do not share this private access link.</p>
        <p>Request ID: ${params.requestId}</p>
      `,
    }),
  });

  if (!response.ok) return { ok: false as const, code: 'RESEND_SEND_FAILED' as const };
  return { ok: true as const };
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json(
      { ok: false, code: 'ORIGIN_NOT_ALLOWED', message: 'Request origin not allowed.' },
      { status: 403 },
    );
  }

  try {
    const body = (await request.json()) as AccessPayload;

    if (!body.name?.trim()) return badRequest('VALIDATION_ERROR', 'Name is required.');
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
      return badRequest('VALIDATION_ERROR', 'Valid email is required.');
    }
    if (!body.phone?.trim()) return badRequest('VALIDATION_ERROR', 'Phone is required.');
    if (!body.accreditationBasis?.trim()) {
      return badRequest('VALIDATION_ERROR', 'Accreditation basis is required.');
    }
    if (!body.investmentRange?.trim()) {
      return badRequest('VALIDATION_ERROR', 'Investment range is required.');
    }
    if (!body.ndaAccepted || !body.accreditationConfirmed || !body.riskAccepted) {
      return badRequest('VALIDATION_ERROR', 'All compliance checkboxes are required.');
    }

    const requestId = randomUUID();
    const idempotencyKey = createHash('sha256')
      .update(`${body.email.toLowerCase()}|${normalizePhone(body.phone)}|${new Date().toISOString().slice(0, 13)}`)
      .digest('hex');

    const ghl = await upsertGhlContact({
      ...body,
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      accreditationBasis: body.accreditationBasis,
      investmentRange: body.investmentRange,
    });

    if (!ghl.ok && ghl.code !== 'GHL_CONFIG_MISSING') {
      return NextResponse.json(
        { ok: false, code: 'UPSTREAM_GHL_ERROR', message: 'Failed to sync CRM contact.' },
        { status: 502 },
      );
    }

    const { rawToken, expiresAt } = await issueAccessToken({
      email: body.email.trim().toLowerCase(),
      contactId: ghl.ok ? ghl.contactId : undefined,
    });

    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_BASE_URL || 'https://bsla-investor-portal.vercel.app';
    const ref = encodeRef(body.email.trim().toLowerCase());
    const dealRoomUrl = `${appBaseUrl}/room/${rawToken}?ref=${encodeURIComponent(ref)}`;

    const emailResult = await sendAccessEmail({
      email: body.email.trim().toLowerCase(),
      name: body.name.trim(),
      dealRoomUrl,
      expiresAt,
      requestId,
    });

    console.info('access_submit', {
      requestId,
      emailMasked: body.email.replace(/(^.).+(@.+$)/, '$1***$2'),
      contactId: ghl.ok ? ghl.contactId ?? null : null,
      emailStatus: emailResult.ok ? 'sent' : 'failed',
      idempotencyKey,
    });

    return NextResponse.json({
      ok: true,
      dealRoomUrl,
      expiresAt,
      requestId,
      emailStatus: emailResult.ok ? 'sent' : 'failed',
    });
  } catch (error) {
    console.error('access_submit_unexpected', error);
    return NextResponse.json(
      { ok: false, code: 'INTERNAL_ERROR', message: 'Unexpected server error.' },
      { status: 500 },
    );
  }
}
