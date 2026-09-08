# Historical local migration review

Provider and staging checks below describe the earlier local checkpoint. See [Cloudflare staging verification](cloudflare-staging-review.md) for the subsequent real-provider results and corrected subscription behavior.

# Cinematic Next.js / Workers migration

Reviewed 2026-09-07, 22:35 EDT (America/Toronto).

## Checkpoints and scope

- Prototype checkpoint: `d202ec6` on `experiment/jattoabdul`.
- Original site snapshot: `a556e21` on `checkpoint/pre-cinematic-migration`.
- Migration: `migration/cinematic-next` in an isolated worktree of the actual site repository.
- Original open-door checkout and its dirty work remain intact. No push, deployment, domain change, secret copy, subscription, or analytics event was performed.
- Owner confirmed TrustKarry closed beta, Pinnr awaiting Shopify approval, RuleNorth in development, and availability for full-time work alongside occasional Fera consulting.

## Implementation

Next.js 16.3.4, React 19.2.8, Node 24.20.0 / npm 11.19.0. Versions were checked against the package registry. GSAP, Lenis and Three.js retain the approved prototype animation runtime and assets. The custom CSS and PP Neue Montreal typography carry over.

App Router renders the homepage story and reading bodies as Server Components. Interactive pages and the shared shell are client components that Next also prerenders into HTML; browser-only effects start after hydration. Homepage motion is dynamically loaded. The no-JavaScript fallback hides the loader and exposes content. Native document navigation preserves the approved loader and cleanup behavior.

Markdown is the migrated publishing source. Build-generated full content is server-only; the archive browser index excludes article bodies. The curated Medium snapshot keeps its original links. Existing MDX and feed helpers remain available, but the migrated archive uses the approved Markdown versions. No live feed refresh is implied.

PostHog instrumentation, ingest proxy and Resend endpoint remain. Provider credentials were not configured in this worktree. The inherited subscribe endpoint still returns its existing stub response when provider configuration is absent; do not interpret that as a successful real subscription. Live integration verification remains a launch check.

Metadata, sitemap, RSS, 404s and legacy project redirects use Next routes. Explicit relative redirects retain query parameters before section anchors and avoid local bind-address leakage. Preview responses and metadata remain noindex.

Workers uses OpenNext 1.20.6 and Wrangler 4.129.1, Node compatibility, and the read-only Static Assets incremental cache. The cache is necessary for generated article routes; without it, those routes returned 404 in workerd. It requires no R2, D1 or queue for this fixed publication snapshot. Revisit caching before enabling ISR/live feed updates. Railway remains available as a fallback.

## Verification

- Production Next build and OpenNext build passed. A clean build resolved stale dependency-trace warnings after the package audit fix.
- Type-check and lint passed without warnings.
- Six content and motion tests passed.
- Four HTTP migration groups passed on Next and again on local workerd: all 56 public routes return initial headings/content and a single canonical, all 52 live sitemap URLs are preserved or mapped, all seven redirects retain query/hash correctly, unknown and unpublished routes return 404, and sitemap/RSS/robots/health/invalid subscription input behave correctly.
- JavaScript-disabled Chromium: homepage, About, essay and note headings and paragraphs were visible at mobile width.
- Browser checks: signature loader completes; portrait/formation renders and moves with scroll; contact opens/closes; mobile Menu/Close target is about 64 × 44 px; legacy `?tag=backend` initializes archive search; reduced-motion arrival unlocks content and ambient video remains paused. No horizontal overflow on the tested mobile routes.
- Desktop route smoke checks include About, Writing, Speaking, Mentoring, Building and Discova, Press, Contact and the working-title book.
- `npm audit`: zero reported vulnerabilities after compatible fixes.
- Wrangler dry run passed. Final worker size: 2,329.23 KiB gzip, with 285 bundled assets. Dry run uploads nothing.

Local throttled Chromium spot check, 390 × 844, DPR 3, 4× CPU, 150 ms latency, 200,000 bytes/sec download, fresh browser context/cache disabled:

| Route | Observed LCP | Script encoded bytes |
| --- | ---: | ---: |
| Latest note | 700 ms | 250,510 |
| Homepage | 8,496 ms | 490,609 |

These are single local measurements, not field metrics or a production Lighthouse score. The homepage remains expensive under throttling because its approved loader and WebGL arrival are retained. PostHog credentials were absent. Production CDN behavior and configured integrations still need verification. The owner subsequently verified the migrated experience on physical iPhone Safari with no issues.

Screenshots are local review artifacts under ignored `output/playwright/`. Owner confirmed physical iPhone Safari verification of this migrated build: everything looks good, with no issues reported.

## Before launch

Owner iPhone Safari review is complete. Configure/test production provider credentials without stub success, review the final Workers domain/deployment and any desired live feeds, and run the migration checks against the actual staging host. Enable indexing only in the approved production build. No framework fallback is needed based on the current rendering and browser results.

## References

- https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/
- https://opennext.js.org/cloudflare/get-started
- https://opennext.js.org/cloudflare/caching
- https://nextjs.org/docs/app/guides/upgrading/version-16
