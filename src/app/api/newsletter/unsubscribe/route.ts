import { newsletterRequest } from '@/lib/subscribe';
export const dynamic = 'force-dynamic';
export const POST = (request: Request) => newsletterRequest(request, 'unsubscribe');
// Email security scanners and link previews must never change preferences.
export const GET = () =>
  new Response(null, {
    status: 405,
    headers: { Allow: 'POST', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' },
  });
