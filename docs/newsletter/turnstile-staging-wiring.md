# Turnstile staging wiring approval

Prepared September 13, 2026, 10:37 America/Toronto (14:37 UTC); checkpoint updated 11:44 America/Toronto. The owner approved this exact credential storage, wiring fixes and restricted-staging tests. Implementation and real managed challenge acceptance through the deployed protected signup endpoint are verified. Actual same-token replay rejection remains pending.

## Verified creation

- Account: Jatto IT Solutions Inc, `a14d42c54e515a9303bf97c69053a20b`.
- Widget: Jatto Abdul newsletter staging.
- Public sitekey: `0x4AAAAAAEyqJp23yy3ZD5mF`.
- Mode: `managed`; clearance: `no_clearance`.
- Exact allowed hosts: `localhost`, `127.0.0.1`, `jattoabdul-staging.jatto-it-solutions-inc.workers.dev`. No production hostname was registered.
- Owner-approved surface: newsletter signup form only, `POST /api/subscribe`, action `newsletter`.
- Turnstile Edit authorization, exact host inventory, matching widget secret and dummy-token Siteverify validation passed. Following the explicit storage approval, the secret was written privately to the existing staging Worker and ignored `.env.newsletter-test`; the binding name was read back. Local environment files retain owner-only mode `0600`.
- Newsletter and staging-gate unit suites: 20 passed. These tests use provider mocks; they do not prove a successful real challenge or email journey.

## Approved credential-write manifest

The absolute paths in this section are operational allowlists for this owner's machine. They are not credentials.

- Project root: `/Users/jatto/Workspaces/personal-projects/jatto-brand/jattoabdul.com`.
- Isolated Wrangler: `/Users/jatto/.local/share/jatto-newsletter-tools/node_modules/wrangler/bin/wrangler.js`, version **4.125.0**. Its canonical path and available Turnstile subcommand were verified. Use Node 24.20.0. No project-local, package-script or `npx` credential commands.
- Account ID and sitekey: exactly those above. Reuse this widget; do not create a replacement.
- Existing Worker: `jattoabdul-staging`.
- Canonical config: `/Users/jatto/Workspaces/personal-projects/jatto-brand/jattoabdul.com/wrangler.jsonc`.
- Environment: `staging`; use the config's explicit `env.staging.name`. Do not supply `--name`: Wrangler 4.125.0 appends the environment to an explicit name, which would incorrectly target `jattoabdul-staging-staging`. A read-only check caught this before any write. Supply `--env-file /dev/null` to isolate the command from project environment files.
- Private runtime binding: `TURNSTILE_SECRET_KEY`, preserving the existing backend's binding name.
- Local private destination: the existing ignored `.env.newsletter-test`, the same `TURNSTILE_SECRET_KEY` binding. Preserve unrelated entries and owner-only mode `0600`. Refuse an unexpected existing nonempty Turnstile secret instead of replacing it silently.
- Public build configuration: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the public sitekey in the existing ignored `.env.newsletter-test` and `.env.staging.local`. The private key never uses a `NEXT_PUBLIC_*` variable.

Before retrieval or a write, recheck the account, executable version, Git ignore status and exact target. Use the approved Turnstile-only API token for widget retrieval. Use the existing authorized Workers login for `secret list` and `secret put`; never broaden the Turnstile-only token to Workers permissions. Stop if that login cannot confirm the target.

Run `secret list` with the exact config/environment before retrieving the widget secret and immediately before `secret put`. Validate the retrieved secret and approved widget metadata before storing it. Use standard-input pipes and private process memory only. Disable Wrangler disk logs, use sanitized non-debug output, and never expose the response, secret, email-test gate or recipient in logs, diffs or chat. Verify the binding name afterward; this alone does not prove deployed behavior.

## Implemented wiring changes

Preserve the form's accepted design, copy and consent version, and leave all enrollment, confirmation, welcome and unsubscribe logic unchanged.

1. Retain the form's existing explicit widget rendering, `newsletter` action and per-widget reset after each submission attempt.
2. Require server-side Turnstile verification in deployed staging test mode, as well as live mode. Retain the exact approved-inbox and private-test gates. Local mocked tests may explicitly bypass challenges; deployed staging must not.
3. Require a nonempty token no longer than 2,048 characters, a configured server secret, an HTTP-success Siteverify response, `success === true`, exact action `newsletter`, and the deployment's exact frontend hostname. Fail closed on network errors, invalid JSON, malformed results or timeouts.
4. Staging's expected hostname is only `jattoabdul-staging.jatto-it-solutions-inc.workers.dev`. Local runs validate their own configured hostname. Registering local hosts on the widget does not make them valid for the deployed staging backend. Continue trusting only Cloudflare's network-identity header on the deployed Worker; do not forward the synthetic local fallback as a real IP.
5. Extend tests for deployed test-mode challenge enforcement, malformed/empty/oversized tokens, wrong host/action, non-2xx responses, invalid JSON and transport failures. Assert that rejected requests do not reach email or enrollment logic.

This implements Cloudflare's mandatory [server-side Siteverify contract](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/). Real tokens are single-use, so actual destination validation must include a successful request and a rejected replay.

## Remaining staged rollout

Isolated D1, a private browser access gate before pages/assets/APIs, a guarded secret-free build and explicit staging deployment are complete. Native Chrome accepted real managed challenges for the approved seed's successful signup and later duplicate submission. See [restricted staging verification](staging-test-report.md) for current versions and evidence. Production configuration, public signup activation and broadcasts remain excluded. After the bounded test, the seed-only welcome automation was disabled again, no runs remained active and the seed was verified unsubscribed.

The actual deployed confirmation and welcome arrived, sequential confirmation-link reuse was rejected, the received welcome's unsubscribe succeeded and a subsequent welcome was suppressed. A controlled reply was sent; recipient-mailbox receipt remains pending. Same-Turnstile-token replay has not been executed: the accepted native network request was inspected but not replayed. Keep that check open rather than treating mocked rejection or a fresh-token duplicate signup as equivalent evidence.
