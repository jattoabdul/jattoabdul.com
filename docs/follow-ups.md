# Follow-ups

In-repo mirror of the longer list at
`personals/notes/projects/jattoabdul.com/improvements.md`.

This file tracks technical / repo-level follow-ups; the personals doc tracks
content + cadence + business decisions.

## Status

Site is live at https://jattoabdul.com. All pre-launch items are shipped.

---

## Week 1 — instrument

- [ ] **PostHog** — replaces analytics + error tracking. Install
      `posthog-js` + `posthog-node`, init in `app/layout.tsx`, capture
      pageviews + `subscribe_attempt` events + exceptions.
- [ ] **Lighthouse against `https://jattoabdul.com`** — target ≥95 on
      Perf / A11y / Best Practices / SEO (mobile and desktop).
- [ ] **Re-validate OG card** on opengraph.xyz, X composer, LinkedIn
      composer, iMessage preview after the metadata + image fix.

## Month 1

- [ ] **Newsletter welcome email** via `resend.emails.send` from
      `/api/subscribe` after `contacts.create` succeeds.
- [ ] **Set `MEDIUM_FILTER.minDate`** in `src/lib/posts.ts` once first new
      brand-aligned Medium post lands.
- [ ] **Google Search Console** — add property + verify via Cloudflare TXT
      + submit `/sitemap.xml`.

## Quarter 1

- [ ] **MDX migration** — `src/content/writing/*.mdx` once ~5 first-party
      posts exist. Add `@next/mdx` + `rehype-pretty-code` for syntax
      highlighting.
- [ ] **Tag landing pages** at `/writing/tag/[tag]` — when ~20 posts.

## Tooling debt

- [ ] **`next lint` → ESLint CLI.** Deprecated in Next 16.
      `npx @next/codemod@canary next-lint-to-eslint-cli .`
- [ ] **Next.js 16 bump.** Wait for 16.0.x patch.
- [ ] **`resend` → `svix` → `uuid@10`** moderate audit advisory. Track
      resend-node releases.
- [ ] **Bundle audit quarterly.** Target First Load JS < 110 kB on `/`.

## Site features

- [ ] **`next/image`** when real cover images appear.
- [ ] **Self-host short thumbnails** in `public/shorts/` for LinkedIn / X
      where hot-linking is blocked.
- [ ] **Per-article cover images** support in the `Post` type.

## Deferred

- ~~Uptime probe~~ — Railway healthcheck is enough for now.
- ~~Sentry~~ — PostHog covers error tracking.
