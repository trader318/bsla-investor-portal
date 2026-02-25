import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { saveAccessToken } from '@/lib/accessTokens';

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
  accredConfirmed?: boolean;
  riskAccepted?: boolean;
};

function badRequest(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AccessPayload;

    const requiredText: Array<keyof AccessPayload> = [
      'name',
      'email',
      'phone',
      'accreditationBasis',
      'investmentRange',
    ];

    for (const key of requiredText) {
      if (!body[key] || typeof body[key] !== 'string' || !body[key]?.trim()) {
        return badRequest(`Missing required field: ${key}`);
      }
    }

    if (!body.ndaAccepted || !body.accredConfirmed || !body.riskAccepted) {
      return badRequest('All acknowledgements are required.');
    }

    const ghlApiKey = process.env.GHL_API_KEY || 'REPLACE_WITH_GHL_API_KEY';
    const ghlLocationId = process.env.GHL_LOCATION_ID || '';
    const resendApiKey = process.env.RESEND_API_KEY || '';
    const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'notifications@example.com';
    const resendFromName = process.env.RESEND_FROM_NAME || 'BSLA';
    const vercelUrl = process.env.VERCEL_URL
      ? process.env.VERCEL_URL.startsWith('http')
        ? process.env.VERCEL_URL
        : `https://${process.env.VERCEL_URL}`
      : '';
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_BASE_URL || vercelUrl;

    if (!ghlApiKey || ghlApiKey === 'REPLACE_WITH_GHL_API_KEY') {
      console.warn('GHL API key missing. Set GHL_API_KEY in environment variables.');
    } else {
      await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ghlApiKey}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          firstName: body.name,
          name: body.name,
          email: body.email,
          phone: body.phone,
          companyName: body.company || undefined,
          tags: [
            'source:portal-optin',
            'status:deal-room-access',
            'accreditation:self-certified',
          ],
          source: body.source || 'Portal Opt-In',
          customFields: [
            { key: 'accreditation_basis', field_value: body.accreditationBasis },
            { key: 'investment_range', field_value: body.investmentRange },
            { key: 'portal_notes', field_value: body.notes || '' },
          ],
        }),
      });
    }

    const token = randomUUID();
    await saveAccessToken(token, body.email!.trim());

    const dealRoomPath = `/room/${token}`;
    const dealRoomUrl = `${appBaseUrl ?? ''}${dealRoomPath}`;

    if (resendApiKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `${resendFromName} <${resendFromEmail}>`,
          to: [body.email],
          subject: 'Your BSLA Deal Room Access Link',
          html: `
            <p>Hi ${body.name},</p>
            <p>Your request has been approved. Use the secure link below to enter the BSLA deal room:</p>
            <p><a href="${dealRoomUrl}">${dealRoomUrl}</a></p>
            <p>This link is private. Please do not share it.</p>
            <p>— BSLA Team</p>
          `,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      dealRoomUrl: dealRoomPath,
    });
  } catch (error) {
    console.error('Failed to process /api/access:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to process request.' },
      { status: 500 },
    );
  }
}
