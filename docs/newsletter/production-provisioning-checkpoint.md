# Production provisioning checkpoint

**Later owner-authorized revision:** see [welcome revision v2](welcome-revision-v2.md) for the replacement delivery design and current implementation evidence. The approval blocker and proposed-only wording below describe the 12:10 checkpoint, before the owner said to prepare and implement the revision. Do not reactivate the native welcome automation.

September 13, 2026, 12:10 America/Toronto (16:10 UTC).

**Current state:** off-mode production deployment `c9072fb9-d2d9-4a2d-9469-ba945e749b42` is live. Signup and confirmation POSTs fail closed, and the signup UI remains hidden. Public newsletter activation is still paused on the welcome topic-suppression issue below.

## Applied under owner approval

- Reused Turnstile sitekey `0x4AAAAAAEyqJp23yy3ZD5mF`. Added only `jattoabdul.com` and `www.jattoabdul.com`; retained `localhost`, `127.0.0.1` and the exact staging hostname. Readback confirms the exact five-host set, managed mode and `no_clearance`. No widget replacement, rotation, DNS or clearance changes.
- Verified the canonical isolated Wrangler executable and exact version 4.125.0. Pinned the approved Cloudflare account. Retrieved the matching secret privately, passed the dummy-token secret-validity probe, checked the exact production Worker's secret inventory immediately before storing it through stdin, and verified `TURNSTILE_SECRET_KEY` by name afterward. No secret value was printed, exported into a build, or saved locally.
- Generated a separate production `NEWSLETTER_HASH_SECRET` and stored it through the same isolated CLI/stdin path. Existing Resend secret bindings were retained. This is secret provisioning on the existing production Worker, not a newsletter application deployment or end-to-end production validation.
- Created D1 `jattoabdul-newsletter-production`, ID `ec2e0e20-45f4-4db9-92ac-86523278eb3f`, in ENAM. Applied `0001_confirmation.sql`; verified its migration receipt and zero request/rate-limit rows. Bound it explicitly as production-only `NEWSLETTER_DB`, with `NEWSLETTER_MODE=off`. Post-deployment verification still found zero request/rate-limit rows. No staging records were copied.
- Production event name `jatto.newsletter.confirmed.v1` is reserved in the local off-mode configuration only; no production event definition or automation has been created or enabled.

## Verified release blocker: native topic-only opt-out

The website provider checks both global and Jatto-topic suppression before dispatching a welcome event. That is not proof that Resend's native automation checks the Jatto topic when its email step executes.

The bounded test used only the approved seed contact. Both existing topics stayed `opt_out` throughout; no unrelated brand enrollment was added. Temporarily set only the seed's global unsubscribe flag to false, then enabled the existing exact-seed-and-consent-gated test automation and dispatched one deliberate negative test event. This simulated global eligibility with Notes opted out; it did not fabricate a new website consent receipt or exercise another brand's subscription flow.

- Event request reference: `negative-topic-optout-20260913-production-readiness`.
- Run `01a09b80-1d0b-72fc-a398-5682a3d18a65`, started 16:00:59 UTC, completed 16:01:00 UTC.
- Seed condition passed. The welcome step **completed**, rather than skipping the opted-out Notes topic.
- Resend email `b117daea-c3c4-4268-a534-ddc9458d2c4c`; Gmail message `1a09b802593d63ec`, subject “Glad you're here”, arrived in Inbox/Updates at 16:01:00 UTC.
- Disabled the test automation immediately after observing the completed run and restored the seed's global unsubscribe flag to true. Both topics remained opted out. No other recipient received test mail; no broadcast was created or sent.

This directly demonstrates that the current native welcome workflow does not independently enforce Notes topic suppression at send time. It does not prove every possible Resend workflow lacks such a capability. Current documented Send Email configuration exposes template, sender, subject and reply-to, with no topic selector; the earlier global-unsubscribe test passed but does not cover this case. Sources: [Send Email](https://resend.com/docs/dashboard/automations/send-email), [Topics](https://resend.com/docs/dashboard/topics/introduction).

## Off-mode deployment and verification

Read-only comparison found the previous production application still had the legacy direct-to-segment signup handler; inert empty-body requests on both domains returned its old `invalid email` response. No real email was submitted to that legacy handler. Under the existing production authorization, deployed the reviewed newsletter implementation in its disabled state to close that path while preserving the public website.

- Hardened `scripts/production.mjs`: only the two intended public analytics fields are shared with staging; the sitekey comes from ignored `.env.production.local`; private values are blanked during builds and scanned afterward. The script validates both exact production routes, account at deploy, D1 ID, off-mode gate, indexability and hidden signup UI. It packages and byte-checks the existing static OpenNext cache, validates a configuration-hashed build stamp and uses the exact isolated Wrangler path/version. Package-based secret provisioning is disabled. No production secret was put in the local public-sitekey file.
- `npm run lint`, `npm run type-check`, the 20 newsletter/access tests, the guarded OpenNext build, private-value scan, bundle/target check and `git diff --check` passed.
- The isolated CLI's local workerd binary could not start with the production compatibility date, reporting support only through 2026-08-27. Initial local HTTP tests therefore failed with connection refused. A local-only CLI date override to 2026-08-27 allowed four HTTP migration suites and disabled-endpoint checks to pass. This is compatibility-limited local evidence, not proof at the production date; no production config date was changed or tool upgrade installed.
- The actual Cloudflare deployment retained compatibility date 2026-09-07. Four HTTP migration suites passed independently on **both** apex and www: published routes/headings/canonicals/indexing, redirects/query preservation, 404 behavior, sitemap/robots/RSS and health.
- Direct verification on apex, www and the existing production workers.dev URL: signup and confirmation POSTs return `503`, `code=unavailable`, `Cache-Control: no-store`. Writing is 200 with signup section/CTA absent. Confirmation landing, privacy page and JS/CSS assets are 200; the landing retains no-store, no-referrer and noindex.
- Pre-change application version: `62d85681-7e8e-40b8-bd0b-0a2225b59aa5`. Secret provisioning created versions `4b761aa2-5e5e-4252-8b95-0c65199c7b4e` and `e9d8cae9-6bdd-4f87-ad9f-702841623e1e` without a source upload. Current off-mode application version: **`c9072fb9-d2d9-4a2d-9469-ba945e749b42`**. Prefer this contained state while resolving newsletter delivery. Rolling back to the older versions can reopen the legacy signup handler; verify endpoint containment before such a rollback. Preserve D1 and suppression state independently.

## Safe pause and next decision

Do not activate public signup or broaden/enable the welcome automation. A change to the approved welcome-delivery/unsubscribe architecture must be reviewed with the owner; do not silently replace native Resend preferences, use a marketing unsubscribe token transactionally, or suppress unrelated brands globally as a workaround.

Resend can remain the subscriber, draft, template and broadcast dashboard. Evaluate a narrowly scoped website-managed welcome dispatch and signed topic-only unsubscribe flow before proposing implementation. A pre-send preference lookup alone does not guarantee cancellation of provider-accepted/in-flight mail; the revised design must state that boundary, distinguish consent confirmation from dispatch, and test topic-only opt-out before dispatch. No new segment is needed.

Exact apex/www live-mode origin handling, real-token replay, remote confirmation concurrency, backup/restore rehearsal, remaining email rendering checks and final live-mode production smoke/activation are still pending. The off-mode deployment deliberately does not claim these gates are complete. No commit or push occurred. No existing D1 receipt or provider contact was deleted/reset. Preserve the staging archives and suppression state.
