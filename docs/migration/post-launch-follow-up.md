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


## Retirement completed — September 9, 2026, 09:03 EDT (America/Toronto)

- Latest main CI/deployment run 34189019280 succeeded for commit 667289bf4a619f08f0e287d1a715b7f784579df0. Cloudflare production version 62d85681-7e8e-40b8-bd0b-0a2225b59aa5 receives 100% of traffic.
- Both apex and www passed all four live migration test groups before retirement; both health endpoints returned OK. Cloudflare analytics for September 8 13:00 UTC through September 9 13:00 UTC reported 3,408 successful requests and two client disconnects, with zero Worker errors. No owner-reported regressions remained.
- Verified Railway project jattoabdul-prod (8d7cdc3f-1eab-4867-b6d6-5cd720f035e1), production environment c9d71ba7-7f9e-4dc4-ac1d-265083ec9211, single service jattoabdul-com (375480d3-4329-4d55-b110-0bcc717d4ac3). Its source was jattoabdul/jattoabdul.com on main; its custom domains matched both live hostnames. No volumes existed in this environment.
- Disconnected only that service's GitHub source using Railway CLI source disconnect, then ran railway down against the explicit service/environment. Verification shows repo/image null, no active deployments, and stopped=true. The Railway-only origin now returns HTTP 404. The latest Railway record is FAILED (cb597117-3bc0-4f40-8d59-cbd2b8b59431), not a live-site failure; the pre-retirement successful deployment was ee953aa6-1d59-4709-926b-274bfdf6b948.
- After retirement, the apex passed all four migration test groups again and www health remained OK. Project/service configuration, domain assignments, DNS, mail records, and Cloudflare routes were preserved. No other Railway projects/services were changed.
- Current Cloudflare route IDs are b3fba5d942c54ec7af3d27e9fc2894a3 (apex) and 96b6606c76ae4bf987c2554e4d0b6052 (www), both pointing to jattoabdul-production with fail-open disabled. IDs in the original cutover note are historical.
- Rollback now means a Cloudflare version rollback. Removing Worker routes alone will NOT restore a running Railway origin. To restore Railway intentionally, reconnect the recorded GitHub repository/branch and deploy a suitable known-good version, verify it directly, then consider routing changes. Retained DNS/domain assignments are not evidence that Railway is still running.
- The one-time retirement task is complete. CMC/VMC remains deferred by the owner. No new application build, push, or production deployment was needed for this retirement.
