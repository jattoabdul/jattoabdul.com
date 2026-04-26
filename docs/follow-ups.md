# Follow-ups

Living list of non-urgent improvements. Cross items off as they land.

## Tooling

- [ ] **Re-audit when `resend` ships a fix for the transitive `uuid <14` advisory.** Currently `resend` → `svix` → `uuid@10` triggers a moderate `npm audit` warning ([GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq)). The vuln only affects calls that pass a `buf` argument to `uuid.v3/v5/v6`, which svix does not. Forcing `uuid@^14` via npm `overrides` breaks svix's ESM/CJS expectations. Revisit after `resend` updates `svix` (track at https://github.com/resend/resend-node/issues).


- [ ] **Migrate from `next lint` to ESLint CLI.** `next lint` is deprecated and will be removed in Next.js 16.
  - Run the codemod when ready:
    ```bash
    npx @next/codemod@canary next-lint-to-eslint-cli .
    ```
  - Update `package.json` `lint` script to `eslint .` (the codemod handles this).
  - Verify `eslint.config.mjs` still extends `next/core-web-vitals` and `next/typescript`.

- [ ] **Bump to Next.js 16.** Wait for at least one patch release (16.0.x) after GA before bumping. Track release notes for App Router / Turbopack changes.
  - Pre-flight: do the `next lint` migration above first; Next 16 removes the legacy command entirely.
  - Re-run `npm audit` after upgrading — it usually clears any remaining transitive issues.

## Content / data

- [ ] **First-party MDX for evergreen Medium posts.** Pick the 2–3 best Medium-syndicated posts (`source: 'medium'` in `src/data/posts.ts`) and copy them to local with `canonical` pointing to the Medium URL. Adds `@next/mdx` if/when needed.
- [ ] **Real article body content.** Several local posts (`ai-workflows`, `staff-judgment`, `writing-as-engineer`) have placeholder bodies — flesh out before sharing widely.

## Newsletter

- [ ] **Double opt-in flow.** Resend Audiences `create-contact` adds the email immediately. If you want confirmation, send a verification email via `resend.emails.send` from the same route and only flip `unsubscribed: false` after the user clicks through.
- [ ] **Welcome email.** Once Resend is wired, send a one-time welcome email on first subscription.
- [ ] **Re-evaluate provider after ~100 subscribers.** If you outgrow Resend Audiences (no segmentation, no rich editor), Buttondown is the natural step up; ConvertKit if you start running launches.

## Site features

- [ ] **Console-triggerable hero — currently shipped via `?hero=editorial` and `localStorage.setItem('hero', 'editorial')`.** Consider a tiny floating tweaks panel (dev-only) if you want to flip variants without typing in the console.
- [ ] **Code-block syntax highlighting.** Article bodies render `pre/code` plain. When MDX lands, add Shiki or `rehype-pretty-code`.
- [ ] **OG image per article.** Currently one site-wide OG. Generate per-post via `app/writing/[slug]/opengraph-image.tsx` if/when articles are shared individually.

## Deploy / ops

- [ ] **Wire Railway env vars** before first deploy: `NEXT_PUBLIC_ENABLE_MEDIUM_FEED`, `NEXT_PUBLIC_HERO_VARIANT`, `RESEND_API_KEY`, `RESEND_AUDIENCE_ID` (when ready).
- [ ] **Custom domain on Railway.** Add `jattoabdul.com` once the deploy is stable.
- [ ] **Analytics.** Pick a privacy-respecting option (Plausible, Vercel Analytics, or self-hosted Umami) and wire it from `app/layout.tsx`.
