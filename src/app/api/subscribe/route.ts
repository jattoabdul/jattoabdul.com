import { NextResponse } from 'next/server';

/**
 * Newsletter subscribe stub.
 *
 * Wire this to your actual provider (Buttondown / ConvertKit / Resend Audiences, etc.)
 * by reading from `process.env.NEWSLETTER_PROVIDER_*` and forwarding the email.
 *
 * Until then, this returns 200 so the UI flow works end-to-end without leaking emails.
 */

export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = (await req.json()) as { email?: string };
    email = body.email?.trim();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  // TODO: forward to newsletter provider here
  return NextResponse.json({ ok: true });
}
