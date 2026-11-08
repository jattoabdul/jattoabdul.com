// Standalone document: no analytics, session replay, router or third-party scripts.
export function GET() {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Confirm your subscription | Jatto Abdul</title><link rel="stylesheet" href="/newsletter-confirm.css"><script src="/newsletter-confirm.js" defer></script></head><body><header><a href="/">Jatto Abdul</a></header><main><h1 id="heading" tabindex="-1">A note from me,<br><span>now and then.</span></h1><p id="message" role="status">Confirm that you’d like occasional emails about work, faith, and life, including new writing and things I’m building. You can unsubscribe whenever you like.</p><button id="confirm" type="button" hidden>Confirm my subscription ↗</button><p><a id="next" href="/writing#newsletter">Request a new link</a></p><noscript><p>Please enable JavaScript and reopen the link in your email to confirm. Nothing has been subscribed by opening this page.</p></noscript><p class="small">Questions? <a href="mailto:me@jattoabdul.com">Write to me</a>. <a href="/newsletter/privacy">How your email is used</a>.</p></main></body></html>`,
    {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
      },
    }
  );
}
