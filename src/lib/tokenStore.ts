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
  const data = (await kv.get(`token:${token}`)) as string | null;
  return data ? (JSON.parse(data) as TokenData) : null;
}

export async function revokeToken(token: string) {
  const data = await lookupToken(token);
  if (data) {
    await kv.del(`email:${data.email}`);
  }
  await kv.del(`token:${token}`);
}
