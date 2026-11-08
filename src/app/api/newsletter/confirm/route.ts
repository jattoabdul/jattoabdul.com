import { newsletterRequest } from '@/lib/subscribe';
export const runtime = 'nodejs';
export const POST = (request: Request) => newsletterRequest(request, 'confirm');
