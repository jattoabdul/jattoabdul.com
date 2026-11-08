# Newsletter implementation and release checkpoint

**Superseded operational design, September 13:** the owner approved and requested implementation of [welcome revision v2](welcome-revision-v2.md). That document is the current source for website-controlled welcome delivery, signed topic-only unsubscribe and release status. Native automation instructions below are historical evidence, not instructions to re-enable it.

2026-09-13, 11:44 America/Toronto — P6C-025-BUILD1. **Restricted staging now passes real-browser signup, scanner-safe landing, explicit confirmation, one welcome, sequential confirmation replay prevention, actual unsubscribe and subsequent provider suppression.** One controlled reply was sent; arrival in the reply mailbox remains unverified. The owner-approved single-seed archival/reset is complete and recoverable in private staging D1. Seed is opted out again; its test automation is disabled with no running runs. Resend remains the subscriber and campaign dashboard. No production change, public activation, commit, push, broadcast or schedule occurred. Exact evidence and outstanding security/release checks: [restricted staging verification](staging-test-report.md).

Owner follow-up, September 13: the reply address forwards back to the same test inbox; the owner received a forwarding/deduplication alert and accepts the sent reply as sufficient. Preserve the limitation rather than labeling it independent delivery proof. Production setup/deployment is now owner-authorized, but has not been performed. Exact production Turnstile hostname/secret mapping confirmation is required before the security writes; see [production manifest](production-security-manifest.md).

## Where state lives

| Store | Responsibility | Current state |
| --- | --- | --- |
| Cloudflare D1, `NEWSLETTER_DB` | Pending requests, token hashes and expiry, consent version/timestamps, single-use confirmation claim, welcome event dispatch outcome, hashed rate-limit buckets | Local emulator plus isolated `jattoabdul-newsletter-staging`, ID `66f56375-735f-40fd-8429-760e735ba454`; no production database provisioned |
| Resend | Contacts, the existing Notes from Jatto Abdul segment, topic preferences, global suppression, published templates, automation runs and delivery | Real approved-inbox test completed; seed now unsubscribed; test automation disabled |
| Worker secrets | Resend key, hash secret, challenge secret, private test controls | Staging bindings provisioned and read back; ignored local test configuration retained with owner-only permissions; production setup pending |

The approved rerun additionally retains one prior suppressed seed receipt and its one associated hourly email counter in private, staging-only `newsletter_test_receipt_archive` and `newsletter_test_limit_archive`. These archives preserve the narrowly reset test evidence; they are not a production schema change or a completed backup/retention policy. The new active receipt remains `confirmed` after unsubscribe as historical evidence; it must not be treated as permission to send.

The Worker is request-processing code, not the persistent store. Isolate memory, browser storage and the deployed filesystem are not subscription databases. D1's `confirmed` row records the historical consent/event-dispatch receipt; it is **not** current permission to send after an unsubscribe. Resend preferences are rechecked before dispatch. Broadcast eligibility must come from Resend plus the applicable consent evidence.

The root Wrangler binding uses the deliberate local-only placeholder ID `00000000-0000-0000-0000-000000000025`. Do not deploy that root configuration. Staging has its explicit isolated D1 binding and applied migration; production provisioning requires separate release approval.

## Implemented journey

1. The optional Writing-page form states the work/faith/life purpose and links to `/newsletter/privacy`. Clicking Subscribe is affirmative consent; the form has no preselected marketing checkbox. The public feature flag defaults off.
2. `POST /api/subscribe` validates origin, JSON size, email, consent version, honeypot, rate limits and environment gates. Live mode and deployed staging require a verified Turnstile token and Cloudflare network identity. Test mode additionally requires both the exact approved inbox and a private bearer gate. The staging entry point authenticates all pages/assets/APIs; browser Basic authentication becomes the existing bearer gate only server-side for signup.
3. D1 stores a 24-hour pending request with a SHA-256 token hash and HMAC identifiers. Signup does not create or enroll a Resend contact.
4. The published transactional confirmation template receives a mandatory, unique `CONFIRM_URL`. A fragment keeps the bearer token out of HTTP request URLs. The confirmation page immediately clears the fragment and has no analytics, third-party scripts or cacheable response.
5. Merely opening `/newsletter/confirm` has no subscription side effect. The explicit Confirm button POST atomically claims the token. Expired, malformed and reused links cannot enroll a contact.
6. Existing global or Jatto-topic opt-outs are preserved. A new contact gets only the existing Jatto segment; other current topics are explicitly opted out. Existing contacts' unrelated preferences are not reset.
7. After a fresh provider preference check, one confirmation event triggers the native Resend welcome. A concurrent/replayed confirmation cannot dispatch again. Ambiguous provider failures are held as `needs_review`, not retried blindly.

Consent contract: `notes-work-faith-life-2026-09-13-v1`. The form wording is: “By choosing Subscribe, you agree to occasional emails from Jatto Abdul about work, faith, and life, including new writing and things I’m building. Unsubscribe whenever you like.” Preserve this version-to-wording record when changing future copy.

### Email configuration

- Sender: `Jatto Abdul <notes@letters.jattoabdul.com>`.
- Reply-To: `me@jattoabdul.com`.
- Segment: `b580d491-080b-442c-9e5d-0d05b2a294ab`, Notes from Jatto Abdul.
- Jatto topic: `0ef338be-87f7-4904-a045-e4d704e1410f`, **Notes from Jatto Abdul**. Owner-approved description saved and read back on September 13: “Occasional notes about work, faith, and life, including new writing and things I’m building.” ID, private visibility, opt-in default and all contact preferences were preserved. Metadata changes do not expand historical consent.
- Confirmation template: `c3891066-5087-4a38-a201-51e23ed9c955`, “Confirm you'd like to hear from me”. Required `CONFIRM_URL` deliberately has **no fallback**; a generic fallback could never prove the recipient's consent.
- Welcome template: `604035a8-419a-4489-8ee5-36c2284f3e68`, “Glad you're here”. The reserved unsubscribe variable belongs in this automation template, not the transactional confirmation.
- Reusable letter: `aeade060-cc53-4f27-b140-b63ea1db73e0`, for Broadcasts. Each real broadcast must select both the exact Jatto segment and the appropriate topic, with verified consent/exclusions.
- Approved footer address is preserved privately in the provider templates. Do not commit a home address, recipient email, token, private test gate or raw email body to this repository.

The owner published the templates and added native preview-text fields. Existing visual-editor content was preserved. The unsubscribe warning is expected for a template that is intended for automations/broadcasts; it is not permission to send that template transactionally. See [Resend automation email configuration](https://resend.com/docs/dashboard/automations/send-email).

## Earlier actual local-runtime controlled-test evidence

All real sends and preference changes below were restricted to the owner's approved seed and predate the restricted-staging deployment. They are not evidence of the deployed journey. Identifiers below are operational evidence, not bearer links.

| Check | Result |
| --- | --- |
| Native transactional confirmation | Gmail message `1a09b0053ef36ae1`, 2026-09-13 13:41:24 UTC, Inbox/Updates. From, Reply-To, SPF/DKIM/DMARC passed; preview present; unique link resolved |
| Scanner-safe GET | Opening the actual email link left the seed absent from Resend and started no automation |
| Explicit confirmation | Browser button POST succeeded; one D1 receipt confirmed; one contact joined only Notes from Jatto Abdul |
| Native welcome | Automation run `01a09b01-2efa-718b-b9dd-c9f45ebaa532` completed; Resend email `5d6c4c67-ea20-4c43-87dc-a575e9f99743`; Gmail `1a09b01341e42309` at 13:42:22 UTC. Inbox/Updates, sender/reply/authentication passed, native preview and unsubscribe headers present |
| Actual unsubscribe | Used the received welcome footer link, unchecked the sole visible Jatto topic and pressed Update. Provider showed success. Jatto topic became `opt_out`; the other topic remained `opt_out`; global unsubscribe became true |
| Negative send after unsubscribe | Run `01a09b05-1f86-775f-9760-9e93da0e27e9` completed with welcome step **skipped**, reason `contact_unsubscribed` |
| Website suppression and replay | Provider rejected a further welcome dispatch; reusing the original confirmation returned `409 already_used`; no resubscription |
| End state | Test automation `01a09af8-2f37-73b8-abbd-8499ad131ff7` disabled; no running runs. Seed remains unsubscribed. No existing subscriber was modified |

The test seed had no other active topic. Therefore this proves actual unsubscribe/global suppression, **not** independent preservation of another actively subscribed brand in the native preference UI. Code tests cover global-false/Jatto-topic-out suppression without writes. Before multi-brand audience sending, complete a separately approved shared-topic test or obtain the missing provider behavior proof. Do not opt the seed into an unrelated brand just to test it.

Reply-To is verified in both real emails. A previous controlled reply was sent to the approved reply mailbox; receipt in that mailbox remains unverified. Actual Gmail arrival is verified; a complete native Gmail desktop/mobile visual rendering review remains owner QA.

## Local verification

- `node --test tests/subscribe.test.mjs tests/staging-gate.test.mjs`: 20 passing tests using Miniflare D1 and provider mocks, including atomic concurrency, replay, expiry, opt-out preservation, ambiguous dispatch handling, challenge enforcement and the staging perimeter.
- `npm run lint` and `npm run type-check`: passed.
- Worker build passed, including Next compilation/type checking and OpenNext bundling. A plain local build inherits `.env.local` and embedded its Resend key in an ignored server artifact; no deployment occurred. The final local bundle was rebuilt with private variables explicitly blank, following the existing guarded production-build approach. A scan of 1,736 generated files found no Resend key, hash secret or private test gate. The seed email also appears in the pre-existing public résumé, which was not modified or classified as a credential. Never deploy an unguarded development bundle.
- Migration regression checks passed (four tests, all published routes/redirects/SEO/feed checks). Local Workers logged a read-only static-cache write warning for `/writing` while still serving HTTP 200; this is separate from the D1 checks and remains a cache-configuration review item before release. Its prior-history status was not established.
- Actual local Workers runtime: safe confirmation GET and privacy/cache headers; both mutation routes return 503 with newsletter off; Writing signup absent with feature flag off.
- Website desktop and 390px mobile form reviewed; no horizontal overflow; website PP Neue Montreal font with Arial fallback, 17px email input/button and keyboard focus verified.
- Pending-state mobile screenshot uses an explicitly mocked 202 response; this is visual/focus evidence, not an additional real email send.
- Screenshots are ignored local artifacts under `output/playwright/newsletter-*`.

## Earlier restricted staging authorization checkpoints

September 13, 2026, 10:08 America/Toronto (14:08 UTC). The owner authorized restricted staging D1, secure configuration, Turnstile, and an actual deployed confirmation/welcome/reply/unsubscribe test, including temporary resubscription of only the approved seed. Production provisioning, public signup activation, broadcasts, commits and pushes are excluded.

The topic description update is complete and verified. The existing `jattoabdul-staging.jatto-it-solutions-inc.workers.dev` responds HTTP 200 with `noindex, nofollow`. This verifies reachability only, not an authenticated staging perimeter or the new newsletter implementation.

Update September 13, 2026, 10:37 America/Toronto (14:37 UTC): the owner approved isolated Wrangler installation, creation and private storage of the account-scoped Turnstile Edit API token, and the exact local/staging hostname and newsletter action mapping. The token is active and its Edit-scope probe passes for Jatto IT Solutions Inc. Isolated Wrangler 4.125.0 is installed outside this repository. No global install was performed.

Created `Jatto Abdul newsletter staging`, public sitekey `0x4AAAAAAEyqJp23yy3ZD5mF`, managed mode with `no_clearance`. Verified that the widget has exactly `localhost`, `127.0.0.1`, and `jattoabdul-staging.jatto-it-solutions-inc.workers.dev`; production hosts are excluded. The skill validator confirmed matching widget credentials and the expected dummy-token rejection. The widget secret was discarded from memory after validation and has not been bound to the Worker or local website environment.

The next Turnstile skill gate is confirmation of the exact credential-write and wiring manifest in [Turnstile staging wiring approval](turnstile-staging-wiring.md). It preserves the existing `TURNSTILE_SECRET_KEY` binding, uses only the existing staging Worker and ignored local test environment, and requires the deployed backend's own hostname plus action `newsletter`. A fresh protected-backend token success and replay rejection remain pending. The existing 15 mocked newsletter tests passed again; this is not deployed journey evidence. No D1 database, Worker deployment or website secret binding changed, and no seed resubscription or email send occurred during this step.

Before deploying, require Turnstile in deployed test mode as well as live mode, retain exact seed allowlisting, and implement a private browser access gate without embedding its secret in client assets. The existing local test-mode bypass and bearer-only API setup are not sufficient evidence of restricted, spam-protected staging. Use isolated staging D1 and leave the production environment unchanged. Do not reactivate the test automation or resubscribe the seed until staging is ready for the bounded test.

The preceding 10:08 and 10:37 records are historical. Following explicit owner approval of storage and wiring, isolated staging D1, secret bindings, authenticated staging and challenge enforcement were implemented and deployed. The actual automated-browser Turnstile challenge failed; no seed resubscription or real emails occurred during this deployment step. See the current [staging test report](staging-test-report.md) rather than treating the earlier unprovisioned state as current.

The deployed positive and unsubscribe rerun above supersedes the earlier pending-email checkpoint. The go-live package still requires reply-mailbox receipt, same-token Turnstile replay, remote concurrency evidence, final email visual QA, shared-active-topic behavior, a retention decision and a backup/restore rehearsal. No release approval is implied by this checkpoint.

## Production preflight — not yet executed

1. Topic metadata approval and update are complete; preserve the existing ID/default/visibility and all preferences. Separately review older engineering-only consent before any broader audience send.
2. Staging D1 is provisioned and migrated. Under separate release approval, provision production D1 and bind it as `NEWSLETTER_DB` in its explicit environment. Apply `migrations/newsletter/0001_confirmation.sql` only to the verified target. Choose retention, access and backup/recovery policy; rehearse restoring state without replaying mail events.
3. Configure private runtime variables listed in `env.example`; provision Turnstile keys for the approved hostnames and test a real challenge. Never expose keys/test controls via `NEXT_PUBLIC_*`. Hash-secret rotation requires a migration plan because it changes ledger identities.
4. Extend the existing production/staging secret-provisioning and bundle-leak checks for the new newsletter variables. The old `secrets:*` helpers alone do not configure this journey. Continue enforcing Node 24 and the existing destination/indexing guards.
5. Use a separate production event/automation under explicit release approval. Do not simply remove the seed condition from the test workflow. No delay is implemented; preference checks occur immediately before the event. Native global unsubscribe suppression is verified; topic-only changes between event dispatch and automation execution remain a provider-specific release review item.
6. Re-test confirmation, welcome, replay, expiry, unsubscribe and reply receipt against the actual HTTPS staging deployment, only with approved seed controls. Review email and website desktop/mobile appearance. Do not resubscribe a suppressed seed without explicit test authorization.
7. After the exact production configuration/release approval, deploy with the feature off, verify health and bindings, then enable the approved form/automation. Build-time public flags require rebuilding. No audience broadcast is included in public signup activation.
8. Every future newsletter send needs exact email, segment, topic, consent exclusions, eligible count and timing approval. The introductory Broadcast remains an unsent draft.

## Operations and recovery

- D1 state transitions: `pending → processing → confirmed | suppressed | needs_review`. `confirmed` means event accepted, not delivered; use Resend runs/delivery evidence to reconcile.
- A process interruption can leave `processing`; an uncertain provider response produces `needs_review`. Inspect the request ID and Resend run before any manual retry. Events do not have a documented idempotency guarantee; do not reset a receipt or replay a welcome automatically.
- Expired pending requests and expired rate-limit buckets are pruned in bounded batches as requests arrive. Confirmed/suppressed consent records currently have no automatic deletion. Select a documented retention policy before launch; provider suppression must not be lost when removing personal data.
- Emergency containment: turn off `NEWSLETTER_MODE` and disable the welcome automation; rebuild with the public form flag off as needed. Already running automation runs may continue; inspect them. A sent email cannot be recalled.
- Roll back application code/configuration independently of the additive D1 schema. Preserve consent/suppression state and provider unsubscribe settings; do not drop tables or delete/recreate contacts as rollback.
- No raw token, inbox address, confirmation URL or email body belongs in application logs, analytics, public issues or this report.
