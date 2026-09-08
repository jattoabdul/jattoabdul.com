# Production cutover

Owner approved and deployed September 8, 2026, approximately 00:24 EDT (America/Toronto; 04:24 UTC).

## Deployment

- Live: https://jattoabdul.com and https://www.jattoabdul.com
- Cloudflare account: Jatto IT Solutions Inc (`a14d42c54e515a9303bf97c69053a20b`).
- Zone: `ad3961ea9aeffc0b75f9aa0fa8baf189`.
- Worker: `jattoabdul-production`.
- Cutover version: `043ca7f2-63e2-4855-b101-1e27a8f64bf1`.
- Existing DNS and Railway deployment retained. No email DNS changes, domain transfer, Git push, or merge.
- Both hostnames continue serving pages; canonical URLs use the apex origin.

The new production Worker was first deployed and checked on its workers.dev address without live routes. After the checks passed and Resend runtime secrets were installed, the two existing proxied hostnames were routed to the Worker. Staging remains separate and noindex.

## Validation

Lint, TypeScript, six content/motion tests, six subscription tests, and the production OpenNext build passed. No private credentials were found in the build output.

All four HTTP migration test groups passed on both the production workers.dev address and the live apex domain with `EXPECT_INDEXABLE=true`. They cover 56 prerendered content routes, all 52 recorded published URLs, seven redirects, canonical metadata, indexing enabled, 404 behavior, RSS, sitemap and API validation. The www hostname returns 200 from Cloudflare without the previous Railway response headers. The live signature SVG returns 200 with `image/svg+xml`.

The live browser displayed the approved signature loader and cinematic homepage with the portrait and particle formation.

The approved temporary address was confirmed absent before the live subscription test, successfully subscribed through `/api/subscribe`, verified in the existing Resend segment, deleted, and confirmed absent again. PostHog received `newsletter_subscribed_server` at `2026-09-08T04:24:10.816Z`, tagged `site_environment=production`, in project 398470 (Jatto Abdul Personal Site).

PostHog also confirmed the real browser `$pageview` at `2026-09-08T04:24:10.987Z` and `$web_vitals` at `2026-09-08T04:24:16.127Z`, both tagged production and carrying the live-domain verification URL.

## Rollback

The Railway origin and proxied DNS records remain intact. Before the cutover the zone had no Worker routes. To restore the old site, remove only these routes and remove the corresponding entries from `env.production.routes` in `wrangler.jsonc` before any subsequent deploy:

- Apex route `7cd5bf6599e642e1b7dcd8aa0fc7242d`, pattern `jattoabdul.com/*`.
- www route `701d99c0957e474e9f381c9eca8047ce`, pattern `www.jattoabdul.com/*`.

Verify the old homepage and its Railway headers after rollback. Do not delete the Worker, DNS records, or Railway project. For later Worker-only regressions, roll back to the verified version instead of switching origins.

## Logo and BIMI

Current signature asset: https://jattoabdul.com/assets/personal/signature.svg

Next.js currently advertises `/icon` as a generated PNG “j” favicon, and `/apple-icon` as a PNG. There is no portrait SVG favicon in the active metadata.

The signature SVG is a website asset, not a BIMI-ready file: it lacks the required Tiny-PS profile/version/title, uses a wide canvas and animation-oriented styling, and is approximately 39 kB. A separate static, square, solid-background Tiny-PS export and validation are needed before using it for BIMI. No BIMI record or email authentication setting was changed.

Reference: https://bimigroup.org/creating-bimi-svg-logo-files/
