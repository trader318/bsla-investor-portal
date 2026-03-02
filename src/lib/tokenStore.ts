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
  try {
    await kv.set(`token:${token}`, JSON.stringify(data));
    await kv.set(`email:${data.email}`, token);
    
    // Verification step: read back and confirm the data persists
    const verifyData = await kv.get(`token:${token}`);
    if (!verifyData) {
      console.error('storeToken: Verification failed - token data not found after write:', token);
      throw new Error('Token verification failed - data not found after write');
    }
    
    // Parse and validate if it's a string
    let parsed = verifyData;
    if (typeof verifyData === 'string') {
      try {
        parsed = JSON.parse(verifyData);
      } catch (parseError) {
        console.error('storeToken: Verification failed - cannot parse retrieved data:', token, parseError);
        throw new Error('Token verification failed - cannot parse retrieved data');
      }
    }
    
    // Basic validation
    if (typeof parsed === 'object' && parsed.email !== data.email) {
      console.error('storeToken: Verification failed - retrieved data mismatch:', token, { expected: data.email, got: parsed.email });
      throw new Error('Token verification failed - data mismatch');
    }
    
    console.log('storeToken: Verification successful for token:', token);
  } catch (error) {
    console.error('storeToken: Failed to store/verify token:', token, error);
    throw error;
  }
}

export async function lookupToken(token: string): Promise<TokenData | null> {
  try {
    console.log('lookupToken: Fetching token from KV:', token);
    const raw = await kv.get(`token:${token}`);
    
    if (!raw) {
      console.log('lookupToken: No data found in KV for token:', token);
      // Try fallback to raw Upstash REST API
      return await lookupTokenFallback(token);
    }
    
    // @vercel/kv may return already-parsed object or a string
    if (typeof raw === 'object') {
      console.log('lookupToken: Found object data for token:', token, raw);
      return raw as TokenData;
    }
    
    try { 
      const parsed = JSON.parse(raw as string) as TokenData;
      console.log('lookupToken: Found string data for token:', token, parsed);
      return parsed;
    } catch (parseError) { 
      console.error('lookupToken: Failed to parse token data:', token, parseError, 'raw:', raw);
      return null; 
    }
  } catch (error) {
    console.error('lookupToken: KV get failed for token:', token, error);
    // Try fallback to raw Upstash REST API
    return await lookupTokenFallback(token);
  }
}

async function lookupTokenFallback(token: string): Promise<TokenData | null> {
  try {
    console.log('lookupTokenFallback: Attempting REST API fallback for token:', token);
    
    const response = await fetch(`https://together-donkey-59820.upstash.io/get/token:${token}`, {
      headers: {
        'Authorization': `Bearer [REDACTED_UPSTASH_TOKEN]`
      }
    });
    
    if (!response.ok) {
      console.error('lookupTokenFallback: REST API failed:', response.status, await response.text());
      return null;
    }
    
    const data = await response.json();
    
    if (!data.result) {
      console.log('lookupTokenFallback: No result from REST API for token:', token);
      return null;
    }
    
    const parsed = JSON.parse(data.result) as TokenData;
    console.log('lookupTokenFallback: Successfully retrieved via REST API:', token, parsed);
    return parsed;
  } catch (error) {
    console.error('lookupTokenFallback: REST API fallback failed for token:', token, error);
    return null;
  }
}

export async function revokeToken(token: string) {
  const data = await lookupToken(token);
  if (data) {
    await kv.del(`email:${data.email}`);
  }
  await kv.del(`token:${token}`);
}
