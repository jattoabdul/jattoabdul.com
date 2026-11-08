# Newsletter production security and rollout manifest

**Delivery design superseded:** [welcome revision v2](welcome-revision-v2.md) replaces the native automation steps below with direct, receipt-controlled welcome delivery and a website topic-only unsubscribe endpoint. Security targets remain unchanged. The owner authorized the revision and production implementation; activation still depends on release verification.

Prepared September 13, 2026, 11:52 America/Toronto. Updated 12:10 America/Toronto. Production setup and deployment are owner-authorized. The owner explicitly approved the exact Turnstile mapping below with “apply”. Security provisioning and the off-mode website deployment are applied; public activation is paused on the confirmed native-automation topic-suppression failure. See [production provisioning checkpoint](production-provisioning-checkpoint.md). The original inventory below is the pre-change snapshot, not current infrastructure state.

## Verified production target

- Repository: `/Users/jatto/Workspaces/personal-projects/jatto-brand/jattoabdul.com`.
- Account: Jatto IT Solutions Inc, `a14d42c54e515a9303bf97c69053a20b`.
- Existing Worker: `jattoabdul-production`; config `/Users/jatto/Workspaces/personal-projects/jatto-brand/jattoabdul.com/wrangler.jsonc`; environment `production`.
- Existing routes: `jattoabdul.com/*` and `www.jattoabdul.com/*`, zone `ad3961ea9aeffc0b75f9aa0fa8baf189`. Both currently serve pages; www Writing returns 200, not an apex redirect.
- Latest deployment reported by Cloudflare: version `62d85681-7e8e-40b8-bd0b-0a2225b59aa5`. Recheck immediately before rollout; preserve its identity as the pre-newsletter application rollback checkpoint.
- Production currently has only `RESEND_API_KEY` and `RESEND_SEGMENT_ID` secret bindings. No production newsletter D1 exists in the account inventory; no production D1 binding is configured. Never deploy the root local placeholder or reuse staging D1 for production.
- Existing dirty work belongs to the owner/prior newsletter implementation. Preserve it, including unrelated migration notes. No commit or push is included.
- Baseline revalidation in this preparation step: all 20 newsletter/access tests, lint and TypeScript checks passed. These do not close the outstanding live replay, concurrency, rendering or recovery checks. No production build/deployment was attempted before the security approval boundary.

## Exact Turnstile mapping for confirmation

Reuse widget sitekey `0x4AAAAAAEyqJp23yy3ZD5mF`; do not create a replacement or rotate its secret. Preserve managed mode and `no_clearance`.

Append `jattoabdul.com` and `www.jattoabdul.com` to the existing registered hosts. The resulting exact widget hostname inventory must be:

1. `localhost`
2. `127.0.0.1`
3. `jattoabdul-staging.jatto-it-solutions-inc.workers.dev`
4. `jattoabdul.com`
5. `www.jattoabdul.com`

Only newsletter signup is in scope: `POST /api/subscribe`, action `newsletter`. No contact form, other endpoint, DNS/email routing, WAF or clearance changes.

Production must accept only its two production frontend origins and validate the actual submitted challenge hostname against the corresponding approved frontend host. Staging continues accepting only its exact staging hostname. Registered local hostnames must never be accepted by the production backend. Confirmation links should remain canonical to the apex origin. Because www currently serves the form without redirecting, add exact-host origin handling and tests before enabling signup there; do not ship an apex-only form that fails on www.

Retrieve the matching widget secret privately only after confirmation, validate it before storage, and write it to `TURNSTILE_SECRET_KEY` on the confirmed existing `jattoabdul-production` Worker with the exact config/environment above. No local production Turnstile-secret copy is needed. Preserve the existing staging binding and ignored staging test file.

Use only the already approved isolated executable `/Users/jatto/.local/share/jatto-newsletter-tools/node_modules/wrangler/bin/wrangler.js`, exact version **4.125.0**, with Node **24.20.0**. Verify its canonical path/version and pin the account. Disable disk/debug logs; sanitize output. Run `secret list` against the exact production target immediately before the write and verify the binding name afterward. Values travel only through private process memory and standard input. Never use `npx`, a package script or project-local binary for credential-bearing commands. Use `--env production --config wrangler.jsonc --env-file /dev/null`; do not combine this environment with `--name`.

The public sitekey can be stored in ignored `.env.production.local` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; `git check-ignore` verified that path is ignored. Never put the secret under a `NEXT_PUBLIC_*` name. Show the concrete wiring diff before applying it.

## Remaining implementation and release sequence

1. Harden the existing production build/deploy wrapper for newsletter variables and private-value scanning, using the isolated Wrangler deployment path and verified OpenNext static-cache packaging. The old wrapper imports the entire staging public config and scans only legacy secrets; do not run it unchanged for this release.
2. Provision a separate empty `jattoabdul-newsletter-production` D1 database, bind it explicitly, apply the newsletter migration and generate/check bindings. Do not copy staging recipients or receipts into production.
3. Generate a separate production `NEWSLETTER_HASH_SECRET` and store it only in the production Worker. Preserve existing Resend credentials and sender/template/segment/topic choices. Configure production origin, confirmation template and a separate production event name. Keep newsletter off initially.
4. Create a separate production confirmed-consent welcome automation. Do not broaden the test automation. Recheck global and Jatto-topic suppression, and resolve topic-only suppression during native automation execution before activation. No old-subscriber import, bulk resubscription or newsletter broadcast.
5. Finish real-token replay and remote concurrency checks, final email rendering QA, the retention/access policy and an isolated recovery rehearsal. Cloudflare D1 Time Travel is always enabled for supported databases; verify the account's actual recovery window instead of assuming a plan. Restore rehearsals must not overwrite an active database or replay welcome events. Source: [D1 recovery documentation](https://developers.cloudflare.com/d1/reference/time-travel/).
6. Run lint, type checking, newsletter/access tests, guarded Workers build, destination/bundle scans and HTTP migration tests on the production candidate. Deploy with signup off, verify both domains, static assets, indexing, privacy/confirmation pages and database binding.
7. Run the bounded production smoke test with only the approved inbox, temporarily resubscribing only that seed if required and restoring opt-out afterward. Confirm single welcome and actual unsubscribe, with the owner's accepted same-inbox reply limitation recorded. Keep production automation separated from the seed-only staging automation.
8. Enable the public signup surface and confirmed-consent production automation under the owner's production authorization only after required checks pass. Verify live state; record version, D1 ID, event/automation IDs, results, containment steps and outstanding limitations. Leave staging private and its test automation disabled.

## Containment and rollback

Turn production newsletter mode off and disable the production welcome automation first if a test or release check fails. Verify closed signup and inspect running runs. Preserve D1 consent receipts and Resend suppression; never delete/recreate contacts, reset terminal receipts or drop the schema as rollback. Roll back website code/configuration independently, retaining the new state for reconciliation. A pre-newsletter version does not itself restore lost consent state. Already sent emails/events cannot be recalled. No Railway/DNS changes are part of this rollout.
