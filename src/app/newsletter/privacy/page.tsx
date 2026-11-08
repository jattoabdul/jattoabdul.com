/* Native navigation is deliberate in the cinematic site. */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your email and these notes | Jatto Abdul',
  robots: { index: false, follow: false },
};
export default function NewsletterPrivacy() {
  return (
    <article className="w-page w-notes-page">
      <h1>
        Your email
        <br />
        and these notes.
      </h1>
      <p>
        I use your email address to send the notes you ask for, confirm your subscription, and keep
        track of your preferences. Resend handles email delivery and subscriber management.
      </p>
      <p>
        You’ll receive occasional notes about work, faith, and life, including new writing and
        things I’m building. Choosing Subscribe requests a confirmation email. You join only after
        confirming.
      </p>
      <p>
        Confirmation links expire after 24 hours and can be used once. I keep a record of the
        consent wording and when you confirmed. Pending requests expire and are removed as the
        signup service processes requests. Hashed email and network identifiers help limit abuse.
      </p>
      <p>
        Every welcome note and newsletter includes an unsubscribe link. The welcome note’s link
        stops Notes from Jatto Abdul and leaves other topics unchanged. Newsletter broadcasts use
        Resend’s preference page, which explains the preferences you’re changing. An unsubscribe is
        recorded immediately and synced with Resend. If the connection fails, the service keeps
        retrying. An email already being delivered may still arrive. Requesting or reopening a
        confirmation link does not reset an unsubscribe.
      </p>
      <p>
        To ask about your email data or request its removal, write to{' '}
        <a href="mailto:me@jattoabdul.com">me@jattoabdul.com</a>. A minimal suppression record may
        need to remain so an unsubscribe is respected.
      </p>
      <a className="p-text-link" href="/writing#newsletter">
        Back to the writing ↗
      </a>
    </article>
  );
}
