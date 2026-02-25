import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/accessTokenStore';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') || '';

  const result = await verifyAccessToken(token);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.code, message: 'Invalid or expired access token.' },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    email: result.record.email,
    expiresAt: result.record.expiresAt,
  });
}
