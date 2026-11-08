# Restricted staging verification

September 13, 2026, 11:44 America/Toronto (15:44 UTC). The owner-approved isolated reset and deployed positive confirmation → welcome → reply-send → unsubscribe rerun are complete. Reply-mailbox receipt and the release checks below remain unverified. **Not public activation approval.**

## Current isolated rerun evidence

**Later production-readiness result, September 13 at 12:10 America/Toronto:** the positive rerun below remains valid, but a separate native topic-only negative test failed. The approved inbox received a welcome when Notes was opted out and global email was enabled. The test automation is disabled again and seed opt-outs restored. Production security/database provisioning and an off-mode application deployment are complete; public activation remains paused. See [current production checkpoint](production-provisioning-checkpoint.md) for exact evidence and remaining gates. Earlier references below to production approval being absent are historical, not the current authorization state.

Only the approved seed was used. No production deployment, public signup activation, broadcast, commit or push occurred; the deployed Worker version remains `430037fd-74e0-485c-8ad5-a2dc4f64a7fa`.

Owner follow-up on September 13: the reply mailbox forwards to the same approved Gmail seed. The owner reports a forwarding/deduplication alert explaining why it did not return to that same inbox and accepts the reply check as sufficient. Record this as **reply sent, same-inbox delivery suppressed, owner accepted**. It is not proof of independent recipient-mailbox delivery. The owner subsequently approved production setup/deployment; that authorization does not mean the deployment has occurred. See [production security and rollout manifest](production-security-manifest.md).

### Recoverable reset

- The owner explicitly authorized archiving the single consumed staging receipt and resetting only that test entry. Copied request `a37059cc-314b-4388-949e-aaeb4379393b` into staging-only `newsletter_test_receipt_archive`, including its original fields, archive timestamp and reason. Deleted the active copy only after checking the exact request ID, `suppressed` state, null provider marker and equality with the archived fields. Readback: one archived receipt and zero active requests before the rerun. The archive stays in private staging D1; no raw receipt, address, hash or bearer link was exported into this repository.
- A fresh real-browser retry encountered the existing two-requests-per-hour email limit and sent nothing. As associated metadata for the approved single-seed reset, preserved its one current-hour email bucket in staging-only `newsletter_test_limit_archive`, then reset only that bucket from count 3 to 0 after matching the archived value. The bucket was derived from the exact archived receipt, not a broad prefix update. IP and confirmation counters, other records and rate-limit code were unchanged. Final readback: exactly one archived limit bucket.
- Temporarily resubscribed only the approved seed globally and to Notes from Jatto Abdul; the existing other topic stayed opted out. Enabled only the exact seed-and-confirmed-consent test automation. Both were returned to their safe end states after the test.

### Deployed journey

| Check | Observed result |
| --- | --- |
| Real managed challenge and signup | Native Chrome showed Success; the accepted Writing form submitted through the protected HTTPS endpoint. No dummy key, fabricated token or security bypass. New D1 request `5b788238-58b4-4486-ae99-9c7a18fbe561`, requested at 15:31:45 UTC, initially `pending` |
| Confirmation arrival | Gmail `1a09b655eddfd12d` at 15:31:46 UTC, Inbox/Personal. Approved sender and Reply-To, native preview, SPF/DKIM/DMARC pass |
| Scanner-safe landing | Opened the actual received confirmation link. Before explicit Confirm, D1 remained `pending`, no confirmation timestamp/provider marker and no additional automation run |
| Explicit confirmation | Native Confirm displayed “You’re in.” D1 became `confirmed` at 15:34:02 UTC. The `provider_id` field holds the accepted event name `jatto.newsletter.confirmed.test.v1`, not a unique provider event ID |
| One welcome | Run `01a09b67-7cf9-7135-aac1-4a4a803e71cf` completed its seed condition and welcome step. Resend email `48ac53f0-0160-44d4-980c-64efa06fb628`; Gmail `1a09b67831e1a981` at 15:34:07 UTC, Inbox/Updates. Sender, Reply-To, preview and SPF/DKIM/DMARC pass; List-Unsubscribe and one-click headers present |
| Reused confirmation | Opened the same received link again and clicked Confirm. UI: “This link has already been used.” No second positive welcome run. This is sequential replay evidence, not a remote concurrency test |
| Actual Reply | Native Gmail Reply targeted the approved reply mailbox. Sent one controlled reply, reference `staging-5b788238`; Sent message `1a09b69d7084a0d9` at 15:36:39 UTC, no CC/BCC. Recipient-mailbox arrival is awaiting owner confirmation |
| Actual unsubscribe | Used the received welcome's preference link, unchecked only Notes from Jatto Abdul and saved. UI confirmed success. Provider readback: Jatto `opt_out`, global unsubscribe true, existing other topic still `opt_out` |
| Post-unsubscribe suppression | Sent one explicit negative seed-only test event with historical consent confirmed. Run `01a09b6b-a210-739b-b2a8-b05f9f1692bd` passed the seed condition but **skipped** welcome with reason `contact_unsubscribed`. This was a deliberate provider-suppression test, not a second website confirmation |
| Repeat signup after unsubscribe | Fresh real managed challenge and native form submission returned 202 at 15:43:01 UTC. The original confirmed receipt stayed unchanged; no new confirmation or welcome arrived and provider opt-out remained intact |
| Final containment | Test automation disabled and running-run query empty. Seed globally unsubscribed; both topic preferences opted out. Final Gmail search after 15:30 UTC returned exactly the confirmation and welcome above. D1 has one active confirmed receipt plus the one archived prior suppressed receipt |

Native Gmail confirmation, welcome, reply and preference-link interactions were exercised. This is not a completed desktop/mobile email visual QA signoff. No raw mail body, authentication header, recipient address or bearer URL belongs in repository evidence.

### Remaining release gates

- Reply check accepted by the owner with the same-inbox forwarding limitation above. Independent-inbox reply delivery remains untested but is no longer an owner-blocking staging item.
- Complete actual same-Turnstile-token replay rejection. Native DevTools captured a fresh accepted request, but its replay action was not executed; no token was exported or validation bypass used. Invalid-token rejection and real valid-token acceptance are verified separately, not substituted for same-token replay.
- Remote-D1 concurrent confirmation is not yet exercised. Sequential link replay passed; the existing local Miniflare/mock concurrency test is a different evidence level.
- Complete email desktop/mobile rendering signoff, retention decision and an isolated backup/restore rehearsal that cannot replay mail events. The two private staging-only archive tables are test evidence, not a production migration or completed backup policy.
- The seed has no other active topic. Preservation of its other **opted-out** topic is verified, but a shared-active-topic native preference/automation check remains a separate release item. Do not enroll it in an unrelated brand to manufacture evidence.
- Production D1/configuration, production-host Turnstile and public signup activation still require separate release approval. No audience broadcast is included.

## Earlier real-browser checkpoint — 11:20 America/Toronto

- The owner reported successful managed Turnstile checks in ordinary Chrome and Arc. Native Arc computer use then observed the successful challenge and submitted the Writing form using only the approved seed. The actual page displayed “Check your inbox. Confirm your email address to receive my notes.” No dummy key, fabricated token or validation bypass was used.
- One deployed confirmation arrived at 15:15:09 UTC: Resend email `bd8ae406-3ed5-46e0-a92c-64fe365e0fd1`, Gmail message `1a09b562703e627e`. Resend reports delivered; Gmail shows Inbox/Personal. Sender and Reply-To match the approved configuration; SPF, DKIM and DMARC pass. The preview is present, the resolved confirmation link targets restricted staging, and no unresolved `CONFIRM_URL` or reserved unsubscribe variable appears. Raw bodies and bearer links were not written to repository evidence.
- Remote D1 request `a37059cc-314b-4388-949e-aaeb4379393b` was issued at 15:15:07 UTC. Read-only inspection found it claimed at 15:17:00 UTC and finalized as `suppressed`, with no provider event ID. The agent did not submit the confirmation button; the evidence establishes the transition but not which browser/client submitted it. The current code claims a request only on explicit confirmation POST, not GET.
- The approved seed remained globally unsubscribed, with both Notes from Jatto Abdul and the existing other topic opted out. The welcome test automation remained disabled. Its latest runs were still the two earlier local-runtime runs; no deployed welcome was dispatched. This verifies deployed suppression preservation, not a successful deployed welcome.
- The consumed suppressed receipt cannot be rotated by signup: the store only rotates sufficiently old `pending` requests and preserves terminal receipts. Do not silently reset this receipt or pretend a further signup can finish the positive test. A narrowly approved archival/reset of only this staging seed record is needed before a fresh full run. Preserve the suppressed-attempt evidence and unrelated provider preferences; do not modify production or broaden the seed allowlist.
- Arc's foreground page changed during control attempts; actions were stopped and state re-read. Native Gmail visual review was not completed. Confirmation delivery/header checks used the approved Gmail connector.
- Remaining: fresh positive confirmation and welcome, confirmation replay/concurrency on remote D1, same-Turnstile-token replay rejection, native email rendering, reply-mailbox receipt, actual deployed welcome unsubscribe and subsequent suppression. The previous local tests do not close these deployed checks.

The sections below retain the earlier deployment checkpoint and its pending-test inventory. The current isolated rerun section at the top supersedes both this 11:20 checkpoint and the earlier pending inventory.

## QA inventory

- Anonymous HTML, confirmation pages, API and static-asset requests must be denied; missing configuration or wrong host must fail closed. Confirm authenticated desktop navigation and 390px form layout separately.
- The unchanged Writing signup must show the accepted consent, privacy link and real managed challenge. Email input, Subscribe disabled/ready state, submission, pending feedback and expired/error challenge recovery need checks.
- A valid real challenge plus the approved inbox may send exactly one confirmation; the same token replay and malformed/oversized/wrong-host/wrong-action challenges must not store or send.
- Wrong inbox, wrong origin, absent authentication and duplicate submission must not broaden recipients or trigger duplicate emails.
- Confirmation GET remains safe for scanners; explicit confirmation creates one historical D1 receipt and one welcome event; concurrent or repeated confirmation must not dispatch again.
- Inbox proof: confirmation and welcome arrival, sender/authentication/preview, actual link behavior, reply receipt, footer unsubscribe and subsequent suppression. Restore the approved seed to opt-out and disable the test automation afterward.
- Exploratory checks: direct static-asset access and missing configuration; navigation/refresh and challenge expiry/error states. No unrelated brand subscription or audience broadcast.

## Infrastructure checkpoint

- Reused approved Turnstile widget and exact three local/staging hostnames; secret stored in staging Worker and ignored owner-only local test environment.
- Isolated D1 `jattoabdul-newsletter-staging`, ID `66f56375-735f-40fd-8429-760e735ba454`, migration `0001_confirmation.sql` applied.
- Existing staging Worker has a private HTTP-auth gate before all assets and page handlers. The browser authentication is translated server-side to the existing private signup gate; no credential is embedded in client code. Siteverify additionally requires the exact staging hostname and `newsletter` action.
- Runtime newsletter mode is test; public production configuration unchanged. Private controls and hash secret provisioned as Worker secrets; existing Resend bindings preserved.
- Guarded Workers build and credential scan passed. Lint, type checking and 20 automated newsletter/access-gate tests passed.
- First deployed version `3a811115-354d-4658-aad0-7ff456a06b75` exposed an existing-writing-route 404 in HTTP regression checks. The isolated Wrangler deployment path had skipped OpenNext's local static-cache population. Corrected the guarded build to copy `.open-next/cache` into `.open-next/assets/cdn-cgi/_next_cache`, matching installed OpenNext 1.20.6 `populateStaticAssetsIncrementalCache`. The guard checks static-only cache configuration and byte equality of every packaged cache file. No remote cache service or additional Worker was created.
- Corrected deployed version **`430037fd-74e0-485c-8ad5-a2dc4f64a7fa`**. Production deployment/configuration untouched.

## Verified against the corrected HTTPS staging deployment

| Check | Evidence |
| --- | --- |
| Published routes, headings, canonical URLs, noindex | All routes passed the HTTP migration test |
| Legacy redirects/query preservation, missing/unpublished 404s, sitemap/robots/RSS/health | All four HTTP migration tests passed; real requests with exact-origin private HTTP auth, not response mocks |
| Anonymous access | `/writing`, `/newsletter/confirm`, `/newsletter-confirm.js`, `/api/health` return 401 with no-store. Direct reserved `/cdn-cgi/_next_cache/...` request returns 404 and no-store, not cached content |
| Missing, invalid or oversized signup challenge | HTTP 400 `challenge_required`, no enrollment or send |
| Unapproved inbox or wrong origin | HTTP 403 `test_only` / `forbidden` |
| Staging D1 after negative tests | Read-only remote count: zero requests and zero rate-limit buckets |
| Safe confirmation landing | Authenticated GET is 200, no-store/no-referrer, without analytics; no subscription side effect |
| Local build verification | Lint and type-check pass; 20 newsletter/perimeter unit tests pass; secret-free guarded build scan passes |
| Form appearance | Desktop and 390px mobile form inspected, no horizontal overflow. Error/disabled states reviewed; mobile screenshot `output/playwright/newsletter-staging-mobile.png` is an ignored local artifact |

## Earlier pre-owner-browser pending inventory — historical

The real managed Turnstile challenge failed in the automated headed browser. No dummy success key, validation bypass, token fabrication or security downgrade was used. The fresh authenticated Chrome Writing page is left open for the owner to complete the challenge. Reload if it has expired or shows an error; leave Subscribe untouched until the bounded seed test is prepared.

- No deployed confirmation or welcome email was sent in this step, and the seed was not temporarily resubscribed.
- Seed contact remains globally unsubscribed, Jatto and Pinnr topics remain opt-out, the seed-only test automation remains disabled, and its running-run query was empty at verification. Do not opt into an unrelated brand to manufacture a test.
- Pending: successful real challenge through POST `/api/subscribe`, rejected same-token replay, duplicate/concurrent confirmation prevention on remote D1, actual confirmation/welcome delivery, reply-mailbox receipt, footer unsubscribe and post-unsubscribe suppression. Local/mock evidence is not substituted for these.
- Before any real seed run, recheck the exact seed and workflow condition, enable only the approved seed automation, temporarily resubscribe only the approved seed, and restore opt-out/disable automation after the test.
- Retention decision, backup/restore rehearsal and shared-active-topic behavior remain go-live package items. Public signup needs separate approval; no audience broadcast is authorized.

## Safe checkpoint and rollback limits

Keep the staging gate and exact seed allowlist in place while waiting. If containment is needed, set staging `NEWSLETTER_MODE=off` and disable the seed automation, then verify denied signup. Do not roll back to a pre-gate staging version that exposes pages/assets. Preserve D1 consent/receipt records and Resend suppression; a schema drop or contact recreation is not rollback. Sent emails and provider events cannot be recalled. No commit or push was made.

The staging entry point follows the [OpenNext custom Worker pattern](https://opennext.js.org/cloudflare/howtos/custom-worker), with authentication before assets using [Cloudflare worker-first routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).
