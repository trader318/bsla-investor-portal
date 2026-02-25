import { kv } from '@vercel/kv';

export interface TokenData {
  email: string;
  name: string;
  phone?: string;
  company?: string;
  ghlContactId?: string;
  createdAt: string;
}

export async function storeToken(token: string, data: TokenData) {
  await kv.set(`token:${token}`, JSON.stringify(data));
  await kv.set(`email:${data.email}`, token);
}

export async function lookupToken(token: string): Promise<TokenData | null> {
  const raw = await kv.get(`token:${token}`);
  if (!raw) return null;
  // @vercel/kv may return already-parsed object or a string
  if (typeof raw === 'object') return raw as TokenData;
  try { return JSON.parse(raw as string) as TokenData; } catch { return null; }
}

export async function revokeToken(token: string) {
  const data = await lookupToken(token);
  if (data) {
    await kv.del(`email:${data.email}`);
  }
  await kv.del(`token:${token}`);
}
