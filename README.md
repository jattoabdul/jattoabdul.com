# jattoabdul.com

Personal website and publishing home. This migration carries the approved cinematic prototype into the existing Next.js repository.

## Runtime

Node 24.20.0, npm 11.19.0, Next.js 16.3.4, React 19.2.8. App Router prerenders the public pages. GSAP, Lenis and Three.js enhance the HTML in the browser. The original Tailwind and MDX infrastructure remains available for older components; the migrated design uses its approved custom CSS and self-hosted fonts.

## Local review

```sh
nvm use
npm ci
npm run dev -- --port 3015
```

Production review: `npm run build`, then `npm start -- --port 3015`. Workers runtime: `npm run build:worker`, then `npm run preview:worker -- --port 3016`. No deployment is part of these commands.

## Publishing

Canonical source for the migrated archive: `src/cinematic/content/essays/*.md` and `src/cinematic/content/notes/*.md`. Each document has title, slug, date (YYYY-MM-DD), tags and published front matter; essays can include an excerpt. Drafts use `published: false`.

```sh
npm run new:writing -- note my-note 2026-09-07 "My note title"
```

Review the writing and set `published: true` when ready. Build/dev startup generates the published content indexes. Restart the dev server or run `node scripts/prepare-content.mjs` after editing Markdown. Published essays and notes automatically appear in the archive, RSS, sitemap and static routes. The generated JSON is ignored by Git. Article bodies are server-rendered with React Markdown and GFM, and are excluded from archive browser bundles.

`writing.json` holds the curated Medium snapshot and original source links. The legacy MDX files and feed helpers remain in `src/content/writing` and `src/lib`, but do not override the migrated archive. Rich MDX components can be introduced later where useful.

## Integrations

PostHog instrumentation and `/ingest` proxy remain. Configure the existing `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and optional host at build time. Newsletter signup is default-off behind `/api/subscribe`, with D1 consent receipts, Turnstile and explicit confirmation. The website owns welcome dispatch and signed, Notes-only unsubscribe; Resend remains the editable-template, subscriber and broadcast dashboard. The old welcome automation stays disabled. Current architecture and release evidence: `docs/newsletter/welcome-revision-v2.md`. Public activation follows restricted-inbox release checks. There is no legacy direct-to-segment fallback. Unit tests mock provider calls; approved real-inbox tests retain consent evidence and restore opt-outs afterward.

## Cloudflare

`open-next.config.ts` and `wrangler.jsonc` build and preview the Next.js app through OpenNext on Workers. The preview has no production domain. The read-only Workers Static Assets cache serves prerendered routes. No R2 bucket is needed for the current fixed publication snapshot; revisit incremental caching if enabling live feed fetching or ISR. Railway configuration remains as a fallback.

Ordinary builds are **noindex**. `SEO_INDEXABLE=true` is reserved for an approved production build. Configure production secrets, domain, caching and deployment separately after final review.

## Staging

Create ignored `.env.staging.local` with the personal-site public `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`. Keep existing Resend credentials in ignored `.env.local`.

```sh
npm run build:staging
npm run deploy:staging
```

These explicit deployment commands target only `jattoabdul-staging`, with no custom-domain routes. The build forces noindex and checks output for private credentials. Staging is private, with HTTP authentication before pages/assets and an exact-inbox signup gate. Provision secrets separately through the approved isolated Wrangler executable using stdin, never through package scripts. The old `secrets:*` commands deliberately fail closed. See `docs/newsletter/staging-test-report.md`; repeat tests against the real provider require deliberate coordination.

## Validation

```sh
npm run lint
npm run type-check
npm run test:subscribe
node --test tests/staging-gate.test.mjs tests/production-seed.test.mjs
npm run build:worker
npm run test:migration
MIGRATION_URL=http://localhost:3016 npm run test:migration
```

HTTP checks require the corresponding local server. See `docs/migration/next-workers-review.md` for coverage and remaining launch checks.

## Production

The owner approved production cutover on September 8, 2026 (Toronto), and newsletter production implementation on September 13. Production uses the same two public PostHog fields configured in ignored `.env.staging.local`; it does not import that file's other settings. The public Turnstile sitekey belongs in ignored `.env.production.local`. The guarded wrapper forces production labels and indexing, blanks private values during builds, verifies static-cache packaging and scans output before deploying through the approved isolated Wrangler executable. Runtime credentials are provisioned separately through that executable's stdin. Build/deploy mode must exactly match `env.production.vars.NEWSLETTER_MODE`. `off` closes signup; `test` keeps the public form hidden and protects `/newsletter/test` and signup with authentication plus an exact-inbox gate; `live` enables public signup after release checks. Unsubscribe and its retry job remain available in off mode.

```sh
npm run build:production -- live
npm run deploy:production -- live
EXPECT_INDEXABLE=true MIGRATION_URL=https://jattoabdul.com npm run test:migration
```

Production routes are declared in `wrangler.jsonc`. The existing Cloudflare-proxied DNS records and Railway origin are unchanged; do not modify them as part of newsletter rollout. See `docs/migration/production-cutover.md` for the original site cutover and `docs/newsletter/welcome-revision-v2.md` for the current newsletter revision. Preserve D1 consent and suppression data during rollback. Roll back to revised off-mode code that retains the unsubscribe endpoint and retry job; older code can restore the legacy signup handler or break already-issued unsubscribe links.
