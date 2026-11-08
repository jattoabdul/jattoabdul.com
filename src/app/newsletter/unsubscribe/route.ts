export function GET() {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe | Jatto Abdul</title><link rel="stylesheet" href="/newsletter-confirm.css"><script src="/newsletter-unsubscribe.js" defer></script></head><body><header><a href="/">Jatto Abdul</a></header><main><h1 id="heading" tabindex="-1">Your email,<br><span>your choice.</span></h1><p id="message" role="status">Unsubscribe from Notes from Jatto Abdul. Your preferences for other topics will stay as they are.</p><form id="unsubscribe" method="post" hidden><button type="submit">Unsubscribe</button></form><noscript><p>Please enable JavaScript and reopen the link in your email, or use your email app’s unsubscribe option.</p></noscript><p class="small">Need a hand? <a href="mailto:me@jattoabdul.com">Write to me</a>. <a href="/newsletter/privacy">How your email is used</a>.</p><p><a href="/writing">Read my writing ↗</a></p></main></body></html>`,
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
