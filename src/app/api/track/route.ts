import { NextResponse } from 'next/server';
import { lookupToken } from '@/lib/tokenStore';

export const runtime = 'nodejs';

type TrackPayload = {
  token?: string;
  documentId?: string;
  documentName?: string;
  action?: 'view' | 'download' | 'entered-deal-room' | string;
  timestamp?: string;
};

const TELEGRAM_CHAT_ID = '1947181248';
const HIGH_INTENT_DOCS = new Set([
  'private-placement-memorandum',
  'subscription-agreement',
  'convertible-promissory-note',
  'wire-instructions',
  'bsla-term-sheet',
  'invest-now-docusign',
]);

const TAG_BY_DOC_ID: Record<string, string> = {
  'private-placement-memorandum': 'activity:viewed-ppm',
  'subscription-agreement': 'activity:viewed-subscription-agreement',
  'convertible-promissory-note': 'activity:viewed-convertible-promissory-note',
  'wire-instructions': 'activity:viewed-wire-instructions',
  'bsla-term-sheet': 'activity:viewed-term-sheet',
  'invest-now-docusign': 'activity:clicked-invest-now',
};

function toCentralTimeLabel(input?: string) {
  const date = input ? new Date(input) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(safeDate);
}

async function lookupContactByEmail(email: string) {
  const ghlApiKey = process.env.GHL_API_KEY;
  if (!ghlApiKey || !email) return null;

  const res = await fetch(
    `https://services.leadconnectorhq.com/contacts/lookup?email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ghlApiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) return null;

  const json = (await res.json()) as {
    contact?: { id?: string; name?: string; email?: string };
    contacts?: Array<{ id?: string; name?: string; email?: string }>;
    id?: string;
  };

  const contact = json.contact || json.contacts?.[0] || undefined;
  const id = contact?.id || json.id;
  if (!id) return null;

  return {
    id,
    name: contact?.name,
    email: contact?.email,
  };
}

async function addContactNote(contactId: string, note: string) {
  const ghlApiKey = process.env.GHL_API_KEY;
  if (!ghlApiKey || !contactId) return;

  await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ghlApiKey}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({ body: note }),
  });
}

async function addContactTags(contactId: string, tags: string[]) {
  const ghlApiKey = process.env.GHL_API_KEY;
  if (!ghlApiKey || !contactId || tags.length === 0) return;

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

async function sendSlackMessage(text: string, emoji: string) {
  const botToken = process.env.SLACK_BOT_TOKEN;
  if (!botToken) return;

  await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${botToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: 'deal-room-access',
      text,
      icon_emoji: emoji,
      unfurl_links: false,
    }),
  }).catch(() => { /* non-blocking */ });
}

async function sendTelegramMessage(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return { sent: false as const, reason: 'TELEGRAM_BOT_TOKEN_MISSING' as const };

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  });

  return { sent: res.ok as boolean };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TrackPayload;
    const token = body.token?.trim() || '';
    const documentId = body.documentId?.trim() || '';
    const documentName = body.documentName?.trim() || 'Document';
    const action = body.action?.trim() || 'view';
    const timestampCt = toCentralTimeLabel(body.timestamp);

    const tokenData = token ? await lookupToken(token) : null;
    const email = tokenData?.email || '';
    const investorIdentifier = email || 'Unknown investor';

    let contactId = tokenData?.ghlContactId;
    if (!contactId && email) {
      const contact = await lookupContactByEmail(email);
      contactId = contact?.id;
    }

    if (contactId) {
      await addContactNote(contactId, `${action} ${documentName} — ${timestampCt}`);

      const shouldTag = action === 'view' && HIGH_INTENT_DOCS.has(documentId);
      if (shouldTag) {
        const tag = TAG_BY_DOC_ID[documentId] || `activity:viewed-${documentId}`;
        await addContactTags(contactId, [tag]);
      }
    }

    const isEntryEvent = action === 'entered-deal-room';
    const isHighIntentView = action === 'view' && HIGH_INTENT_DOCS.has(documentId);

    if (isEntryEvent) {
      await sendSlackMessage(`🏦 *DEAL ROOM ENTRY*\n\n${investorIdentifier} just entered the deal room\n\nTime: ${timestampCt}`, ':door:');
    } else if (isHighIntentView) {
      await sendSlackMessage(`🔥 *INVESTOR ALERT*\n\n${investorIdentifier} just viewed *${documentName}*\n\nTime: ${timestampCt}`, ':fire:');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('track_error', error);
    return NextResponse.json({ ok: false, code: 'TRACK_FAILED' }, { status: 500 });
  }
}
