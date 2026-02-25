import { POST as submitPost } from '@/app/api/access/submit/route';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  return submitPost(request);
}
