import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { getPostHogClient } from '@/lib/posthog-server';

export const runtime = 'nodejs';

/**
 * Newsletter subscribe.
 *
 * - When RESEND_API_KEY and RESEND_AUDIENCE_ID are set, the email is added to
 *   the Resend Audience as an unconfirmed contact (no double opt-in here yet).
 * - Otherwise, the route returns 200 so the UI flow works in dev without a
 *   provider configured.
 *
 * Resend reference: https://resend.com/docs/api-reference/contacts/create-contact
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email: string | undefined;
  try {
    const body = (await req.json()) as { email?: string };
    email = body.email?.trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    // Stub mode — no provider configured. Keep the form flow working.
    return NextResponse.json({ ok: true, mode: 'stub' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (error) {
      // Resend treats duplicates as a 422 with a recognisable error name.
      const isDuplicate =
        error.name === 'validation_error' && /already exists/i.test(error.message ?? '');
      if (isDuplicate) {
        return NextResponse.json({ ok: true, mode: 'duplicate' });
      }
      return NextResponse.json({ error: 'subscribe failed' }, { status: 502 });
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: 'newsletter-subscriber',
      event: 'newsletter_subscribed_server',
      properties: { mode: 'resend' },
    });

    return NextResponse.json({ ok: true, mode: 'resend' });
  } catch {
    return NextResponse.json({ error: 'subscribe failed' }, { status: 502 });
  }
}
