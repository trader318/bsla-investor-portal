import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') || '';

  if (!token.trim()) {
    return NextResponse.json(
      { ok: false, code: 'MISSING_TOKEN', message: 'Access token is required.' },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    token,
  });
}
