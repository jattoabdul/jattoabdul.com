# Website-controlled welcome revision v2

Owner instruction: prepare and implement, 2026-09-13 (America/Toronto).

**Live as of September 13, 12:46 America/Toronto (16:46 UTC).** Public signup is enabled at https://jattoabdul.com/writing#newsletter. Production version `e7a85a81-b04f-47ed-aca8-d9a4e995c8b5`; restricted staging version `46260440-89da-41d4-8702-b321c80a2e78`. Resend remains the subscriber, editable-template and broadcast dashboard. The native welcome automation stays disabled. No newsletter broadcast, commit or push was performed.

## Change and boundaries

The native Resend welcome test sent to a contact whose Notes topic was opted out.
Keep that automation disabled. Keep the existing Notes segment and topic, the
editable email design, sender, reply address and approved footer. Newsletter
broadcasts remain in Resend and require separate exact-content/audience/timing
approval. No broadcast, bulk resubscription, new segment or Git push is included.

1. Explicit confirmation atomically consumes the D1 receipt. Before welcome,
   check local suppression and Resend global/Notes-topic preferences. Record one
   dispatch authorization per receipt, send the published welcome template through
   the email API with a receipt-specific idempotency key, and retain its email ID.
   Ambiguous delivery remains held for review, with no automatic welcome retry.
2. Replace only the welcome footer link with a required signed UNSUBSCRIBE_URL.
   Keep its TipTap document visually editable. Add List-Unsubscribe and
   List-Unsubscribe-Post headers to each welcome. Broadcast templates continue to
   use Resend's own preference link and must select the Notes topic.
3. Human links use a fragment token on an analytics-free, scanner-safe GET page.
   An explicit button submits an opt-out. The header URL accepts RFC 8058 POST
   without login, cookies or CAPTCHA. GET never changes consent. Tokens contain
   an opaque receipt ID, a version and purpose-separated HMAC, never an email.
4. Persist local suppression before calling Resend. Change only the Notes topic
   to opt_out. Failed sync is retained in D1 and retried by the existing Worker's
   scheduled handler with bounded batches and backoff. Never reset global or
   other-topic preferences. Pause broadcast preparation if any sync is pending.
5. Unsubscribe remains available when signup is off. Existing receipts remain
   intact. Additive migration only. Production initially stays off; a seed-only
   deployment allows only the approved inbox before public activation.

## Concurrency and recovery boundary

D1 arbitrates duplicate confirmation and dispatch authorization. A final local
suppression check follows the provider preference lookup. Resend and D1 cannot
share a transaction: a preference change after this final check may race an
already-in-flight request. No claim of recalling provider-accepted mail is made.
The provider idempotency window is 24 hours; the D1 terminal receipt prevents
later automatic retries beyond that window. Review ambiguous sends by email ID
or provider logs rather than issuing a new receipt or changing an idempotency key.

## Verification required

Local: concurrent confirmation, global and topic-only suppression, local opt-out
races, malformed/forged tokens, scanner GET safety, RFC 8058 POST, replay,
provider-sync failure/retry, other-topic preservation, apex/www origin and
Turnstile host restrictions, off/seed/live gates, lint/types/Workers build.

Deployed, approved inbox only: real Turnstile, confirmation, one welcome with
required URL and headers, reply route, actual unsubscribe and Resend readback,
duplicate prevention, private staging, static route/SEO checks. Retain dated
evidence and restore the seed's original suppression preferences. Activate public
signup only after these checks pass. No production data restore is performed.

References: https://resend.com/docs/dashboard/emails/idempotency-keys and
https://developers.cloudflare.com/workers/best-practices/workers-best-practices/.

## Implementation evidence, September 13

- Additive production migration `0002_welcome_unsubscribe.sql` applied while signup was off. Existing receipts were not reset or deleted. The pre-migration production database had zero requests and rate-limit rows.
- Published editable welcome v2: `70b6d0ab-c836-46de-ba07-82197c025842`, with required `UNSUBSCRIBE_URL`, the separate preview text, approved sender/reply/footer and no reserved marketing unsubscribe variable. The original template remains intact.
- Thirty focused tests pass; type-check and lint pass. The off-mode Workers build passed. Provider requests have bounded timeouts and ambiguous sends are not retried automatically.
- The native test automation remains disabled. No production automation, broadcast or new segment was created.

## Data retention and recovery operations

D1 holds email, HMAC email key, hashed confirmation token, consent version and times, dispatch outcomes and suppression state. It does not hold a raw confirmation token, Turnstile token or raw IP address. Resend holds subscriber preferences, template content and delivery records. Credentials remain in Worker secrets and ignored private local files, not the build or repository.

- Pending requests expire after 24 hours. Expired pending requests and rate-limit buckets are removed in bounded batches on requests and every five-minute maintenance run. The batch size means removal may take additional cycles during a backlog.
- Confirmed/terminal consent and suppression records are currently retained while the newsletter operates. They are not a fresh permission to send. Review retained data quarterly and handle individual deletion requests manually; do not promise an automatic terminal-record deletion schedule that is not implemented. Preserve the minimum suppression identifier and provider preference needed to prevent accidental re-enrollment. Deletion must account for receipt-linked unsubscribe URLs.
- Before a schema change or recovery, close signup, capture a D1 Time Travel bookmark and export to a private owner-only directory outside the repository. Exports contain personal data once subscribers exist; never place them in public artifacts or Git. Keep change-checkpoint exports for 30 days, then remove only the specifically reviewed expired backup. No unattended filesystem deletion is configured.
- D1 returned pre-migration bookmark `00000003-00000000-000050e5-222ba4c19da8bcfa3eaf49c86c5912e8`. A real SQL export was restored into an isolated in-memory SQLite database: integrity `ok`, request count zero, limit count zero. No live database was restored and no mail code ran during this rehearsal. This proves the empty-database snapshot is restorable, not a subscriber-scale recovery test. Do not assume a paid-plan Time Travel duration; use the actual available bookmark/window when recovering.
- Recovery is a separately reviewed action: restore into isolation first, reconcile every newer opt-out with Resend and the current suppression ledger, and verify held/sent records before switching a binding. Do not replay welcomes or restore a database over newer suppression state.
- Emergency containment: set production mode to `off`, rebuild and deploy revised code with public signup hidden. Keep unsubscribe, its signing secret, D1 binding and five-minute sync job operational. Keep the native welcome automation disabled. Earlier off-mode code without the new unsubscribe endpoint is not a safe rollback after v2 emails have been sent.
- Before every separately approved broadcast, require zero pending opt-out syncs and select the existing Notes segment **and Notes topic**. If sync is pending or suppressed records were manually changed in Resend, stop and reconcile first. There is no automatic broadcast sender in this implementation.

## Production journey and final release evidence

The positive journey ran on the actual production Worker/domain/D1, in protected test mode version `cd452463-f8b9-4a24-9c02-c6332c63a745`, with only the approved seed permitted. Public activation followed the checks below.

| Check | Observed result |
| --- | --- |
| Managed Turnstile | Real browser challenge accepted by production signup. Reusing that exact captured token returned 400 `challenge_required`; no second confirmation |
| Confirmation delivery | Gmail `1a09b9ee1d092b26`, September 13 at 16:34:34 UTC; Inbox, correct sender and Reply-To, SPF/DKIM/DMARC pass |
| Scanner-safe landing | Opening the actual confirmation link left D1 pending with no confirmation timestamp and zero welcome rows |
| Concurrent confirmation | A browser button click and concurrent POST produced HTTP 200 and 409. The observer helper timed out, but the browser network log independently recorded both responses; D1 recorded one confirmed receipt and one accepted welcome |
| Welcome delivery | Resend `b12e90a5-1d37-4218-8303-6fb7c0077434`; Gmail `1a09b9fc49e57e0e`, 16:35:33 UTC. Inbox/Updates, correct sender/reply/preview, SPF/DKIM/DMARC pass. Both List-Unsubscribe and List-Unsubscribe-Post are included in the DKIM-signed headers. No unexpanded template variable |
| Actual human unsubscribe | Opened the received welcome's signed link; GET alone left Notes opted in. Explicit Unsubscribe then changed Notes to opt_out. Global unsubscribe stayed false, and the existing other topic stayed opt_out |
| One-click and replay | Header-URL GET returned 405. RFC 8058 POST, sent without authentication, cookies or Origin, returned 200 `unsubscribed`. Repeated opt-out did not duplicate sync work |
| Durable state | Receipt `b74511f0-9783-452f-9c19-54ccec4595f7` retains its original confirmed timestamp and welcome ID, with current state suppressed. Welcome ledger has one accepted row. Suppression synced on attempt one; zero pending syncs |
| Post-opt-out behavior | Reused confirmation returned 409 `already_used`. Fresh real-challenge signup returned generic 202 but sent no further email. Gmail search returned exactly one confirmation and one welcome for this run |
| Final seed state | Restored original global unsubscribe true; Notes and the other existing topic both opt_out. No other contact or topic was changed |
| Public live mode | Visible form and footer link on Writing; real Turnstile enabled the Subscribe button. The already-used seed reached the expected hourly limit and showed the correct error, rather than sending again. This was a live-mode rate-limit check, not a second positive enrollment |
| Public containment | `/newsletter/test` now returns 404 on apex/www. Origin-less signup returns 403; unsubscribe GET remains 405 and the human landing remains 200/no-store |
| Site regression | All four route/content/redirect/sitemap/robots/RSS/integration tests pass independently on apex and www, with indexing preserved |
| Visual checks | Public form and actual received welcome HTML render cleanly at desktop and 390px widths. Mobile unsubscribe page is readable and keyboard focus moves to its result heading. Email checks are browser renders of the received MIME HTML, not an exhaustive native Gmail/Outlook client matrix |

The shared consent module now uses version `notes-work-faith-life-2026-09-13-v2` for the unchanged public form wording. The server and React form import the same version/text. The private positive test's v1 receipt remains historical evidence; it was not relabelled or reset. All 30 focused tests pass after this consolidation, along with lint, types and both Workers builds.

Reply routing is unchanged. This welcome's Reply-To is verified as `me@jattoabdul.com`. The earlier staging reply was actually sent; the owner confirmed the same-inbox forwarding/deduplication alert and accepted that limitation. No new independent-recipient reply receipt is claimed.

The shared-brand safeguard is supported by the actual Notes-only PATCH/readback with global mail enabled, plus provider-call tests that reject global or other-topic mutation. The seed's other topic was already opted out; it was not enrolled in an unrelated brand to manufacture a shared-active-topic test. A provider outage/retry is fault-injected locally, not deliberately caused in production.

## Private staging and handoff

Staging received the same additive migration and revised code. Anonymous requests to pages, scripts, confirmation, unsubscribe and signup all return 401/private/no-store/noindex; all four authenticated migration tests pass. Existing active and archived staging receipts remain one each. The first staging export attempt failed with Cloudflare authentication error 10000; a later post-migration export succeeded and restored in isolation with integrity `ok`, one active receipt and one archived receipt. No existing staging receipt was reset and no staging mail was sent during this revision.

Private backup and visual evidence are stored outside Git in `/Users/jatto/.local/share/jatto-newsletter-revision-aaKTey/`; SQL files are owner-only. The production pre-change recovery proof and staging post-change recovery proof are distinct. Do not describe the failed staging pre-change export as successful.

Both Workers have the five-minute maintenance trigger. Public activation does not enable any Resend automation or broadcast. The next optional content task is drafting the first letter in Resend; sending still requires exact copy, audience and timing approval. Existing unrelated changes, including `docs/migration/post-launch-follow-up.md`, were preserved.
