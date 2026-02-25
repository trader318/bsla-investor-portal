import { createHash, randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = '/tmp/bsla-access';
const TOKENS_FILE = path.join(DATA_DIR, 'access-tokens.v2.json');
const DEFAULT_TTL_DAYS = Number(process.env.ACCESS_TOKEN_TTL_DAYS || 30);

export type TokenRecord = {
  tokenHash: string;
  email: string;
  contactId?: string;
  issuedAt: string;
  expiresAt: string;
  status: 'active' | 'revoked' | 'used';
};

type TokenStore = Record<string, TokenRecord>;

function sha256(input: string) {
  return createHash('sha256').update(input).digest('hex');
}

async function readStore(): Promise<TokenStore> {
  try {
    const raw = await readFile(TOKENS_FILE, 'utf8');
    return JSON.parse(raw) as TokenStore;
  } catch {
    return {};
  }
}

async function writeStore(store: TokenStore) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(TOKENS_FILE, JSON.stringify(store, null, 2), 'utf8');
}

export async function issueAccessToken(params: { email: string; contactId?: string }) {
  const rawToken = randomBytes(32).toString('base64url');
  const tokenHash = sha256(rawToken);
  const issuedAt = new Date();
  const expiresAt = new Date(issuedAt.getTime() + DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000);

  const store = await readStore();
  store[tokenHash] = {
    tokenHash,
    email: params.email,
    contactId: params.contactId,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    status: 'active',
  };
  await writeStore(store);

  return {
    rawToken,
    expiresAt: expiresAt.toISOString(),
  };
}

export async function verifyAccessToken(rawToken: string) {
  if (!rawToken) return { ok: false as const, code: 'MISSING_TOKEN' as const };

  const tokenHash = sha256(rawToken);
  const store = await readStore();
  const record = store[tokenHash];

  if (!record) return { ok: false as const, code: 'NOT_FOUND' as const };
  if (record.status !== 'active') return { ok: false as const, code: 'INACTIVE' as const };
  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return { ok: false as const, code: 'EXPIRED' as const };
  }

  return {
    ok: true as const,
    record,
  };
}
