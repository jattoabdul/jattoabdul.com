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

PostHog instrumentation and `/ingest` proxy remain. Configure the existing `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and optional host at build time. Resend remains behind `/api/subscribe`, using `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` at runtime. No credentials were copied into this worktree. No test subscribes an address or sends an analytics event.

## Cloudflare

`open-next.config.ts` and `wrangler.jsonc` build and preview the Next.js app through OpenNext on Workers. The preview has no production domain. The read-only Workers Static Assets cache serves prerendered routes. No R2 bucket is needed for the current fixed publication snapshot; revisit incremental caching if enabling live feed fetching or ISR. Railway configuration remains as a fallback.

Ordinary builds are **noindex**. `SEO_INDEXABLE=true` is reserved for an approved production build. Configure production secrets, domain, caching and deployment separately after final review.

## Validation

```sh
npm run lint
npm run type-check
npm run build:worker
npm run test:migration
MIGRATION_URL=http://localhost:3016 npm run test:migration
```

HTTP checks require the corresponding local server. See `docs/migration/next-workers-review.md` for coverage and remaining launch checks.
