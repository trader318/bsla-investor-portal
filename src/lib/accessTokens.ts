import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = '/tmp/bsla-access';
const TOKENS_FILE = path.join(DATA_DIR, 'access-tokens.json');

type TokenStore = Record<string, { email: string; createdAt: string }>;

async function readStore(): Promise<TokenStore> {
  try {
    const raw = await readFile(TOKENS_FILE, 'utf8');
    return JSON.parse(raw) as TokenStore;
  } catch {
    return {};
  }
}

export async function saveAccessToken(token: string, email: string): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const store = await readStore();
  store[token] = { email, createdAt: new Date().toISOString() };
  await writeFile(TOKENS_FILE, JSON.stringify(store, null, 2), 'utf8');
}
