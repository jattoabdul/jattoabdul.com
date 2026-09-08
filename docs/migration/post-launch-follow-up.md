# Post-launch follow-up

September 8, 2026, America/Toronto.

## Continuous deployment

CI now includes a production job gated on the successful `Lint + build` job, restricted to main-branch pushes. PRs cannot deploy. Main workflows are serialized without cancellation during deployment. The production wrapper supports CI environment variables and retains optional local-file support.

GitHub variables `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (public ingestion token, personal-site project 398470) and `CLOUDFLARE_ACCOUNT_ID` were configured. A dedicated `CLOUDFLARE_API_TOKEN` Actions secret is required. The local Wrangler OAuth session must not be copied into GitHub. Resend stays in runtime Worker secrets; CI does not update it.

## Search Console

The existing `sc-domain:jattoabdul.com` property is accessible under jattoade@gmail.com. Ownership is verified, robots.txt is reported valid, and the existing sitemap previously had Success with 52 discovered pages (last read August 31). The updated https://jattoabdul.com/sitemap.xml was resubmitted successfully on September 8.

The indexing report is dated September 3, before the migration: 46 indexed; 17 excluded (4 duplicate without user-selected canonical, 2 redirects, 6 crawled but not indexed, 5 discovered but not indexed). These are historical findings, not evidence of a new migration failure. No Core Web Vitals field data yet. HTTPS report shows 19 HTTPS and 0 non-HTTPS URLs.

## BIMI

DNS publishes `v=BIMI1; l=https://jattoabdul.com/brand/jatto-abdul-portrait-bimi.svg;`. DMARC publishes `p=reject` (default 100% enforcement). The hosted vector was previously validated against the BIMI Group Tiny-PS schema. There is no `a=` certificate URL in the published BIMI record. Gmail requires a VMC or CMC; mailbox logo display is not guaranteed by the SVG or DNS record alone. Certificate availability is awaiting owner input; no certificate purchase or mail policy change was made.

References: https://support.google.com/a/answer/10911320 and https://bimigroup.org/implementation-guide/

## Railway retirement

One-time Codex heartbeat `retire-website-railway-fallback` is scheduled for Wednesday September 9 at 09:00 America/Toronto. It must confirm live site, migration checks, deployment health and absence of regressions before stopping the matching Railway service and disconnecting its GitHub auto-deploys. Preserve configuration; do not delete a project, database, DNS or Cloudflare route. If access or identity is unclear, leave the service running and report the blocker.

Railway CLI authentication was expired at setup time and this checkout has no linked Railway project. The exact service must be identified after reauthentication before retirement. Existing Cloudflare routes remain the live serving path.

The four historical duplicate examples were checked live: www homepage, two `/writing?tag=` variants, and www `/videos`. All return explicit apex canonical URLs; Google validation was requested for this issue on September 8.
