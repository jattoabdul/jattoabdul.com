# Cloudflare staging verification

Date: September 7, 2026, Toronto (September 8 UTC).
Branch: `migration/cinematic-next` in the original `jattoabdul.com` repository.

## Destination

- Preview: https://jattoabdul-staging.jatto-it-solutions-inc.workers.dev
- Account: Jatto IT Solutions Inc.
- Worker: `jattoabdul-staging`.
- Final application version: `60600cc0-f6d7-4342-9426-5f846c2166dd`.
- No production routes, custom domains, DNS changes, or Git pushes.

## Results

The real Workers deployment passed all four migration test groups: 56 content routes have prerendered headings, canonical URLs and preview protection; all 52 recorded live URLs remain reachable or deliberately redirected; seven legacy redirects preserve query strings before fragments; unknown/unpublished content returns 404; sitemap, robots, RSS, health and subscription validation pass. The press-kit PDF also returns `X-Robots-Tag: noindex, nofollow`. Canonicals intentionally retain the eventual production origin.

The browser rendered the homepage and mobile About and Writing pages. About and Writing at 390 × 844 had no page errors or horizontal overflow. The owner's earlier physical iPhone Safari verification remains valid; these additional staging checks used desktop Chrome with a mobile viewport.

Six subscription tests, six content/motion tests, lint, TypeScript, and the OpenNext staging build pass. Build output is scanned for private credentials before deployment. Runtime Resend credentials were uploaded through Wrangler stdin; none are committed.

## Resend

The existing audience is available as the segment “Jatto Abdul Practical Engineering Notes.” Runtime configuration uses `RESEND_SEGMENT_ID`, retaining `RESEND_AUDIENCE_ID` as a fallback. Missing configuration now returns 503 instead of simulated success. Existing unsubscribed contacts are not reactivated.

With explicit owner approval, `me+staging-test@jattoabdul.com` was confirmed absent, subscribed through the deployed API, verified in the correct segment, deleted, and confirmed absent again. The test was repeated after correcting server analytics delivery; both temporary records were removed. No separate email-send API was invoked. Provider automations, if configured, may run on contact creation as explained in the approval.

Public subscriptions on staging are disabled. Only the approved test address with the locally stored verification bearer token can exercise the real integration. Do not expose the token or use staging for general newsletter signups.

## PostHog

The connector was switched with explicit owner approval to “Jatto Abdul Personal Site,” project 398470. Actual homepage and About `$pageview` events and browser web-vitals were found in that project with `site_environment=staging`; browser requests through `/ingest` returned 200. Production reports should exclude this environment.

The initial queued server capture could finish after the Worker response. The subscription handler now awaits `captureImmediate`, and a regression test verifies analytics delivery finishes before the subscription response. This follows [PostHog's serverless guidance](https://posthog.com/docs/libraries/node#short-lived-processes-like-serverless-environments).

PostHog query verification confirmed `newsletter_subscribed_server` at `2026-09-08T03:57:00.696Z`, tagged `site_environment=staging`, following the corrected deployment and approved test. Both browser and server delivery are verified in the actual project.

## Before live cutover

Review the staging experience, prepare the production Worker and its real runtime secrets, build with indexing explicitly enabled, and verify production configuration before assigning the live hostname. Recheck redirects, robots, canonical metadata and integrations immediately after the approved cutover. The live domain is unchanged by this staging deployment.

References: [OpenNext environments](https://opennext.js.org/cloudflare/howtos/env-vars), [Resend audience-to-segment migration](https://resend.com/docs/dashboard/segments/migrating-from-audiences-to-segments).
