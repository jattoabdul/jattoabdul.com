# Three-P companion article

Prepared 2026-10-14 at 10:45 EDT (America/Toronto). The owner approved publishing the reviewed
article and checklist on October 14. Release preflight began at 10:49 EDT. This approval covers
the site deployment only. No commit, push, YouTube upload or newsletter broadcast is included.

**Published October 14, 2026 at 10:51 EDT; live verification completed at 10:52 EDT.**
The article and approved checklist are public. The resource link is ready for the video description.

## Artifacts

- Article: `src/cinematic/content/essays/people-problem-pay.md`, with `published: true` following approval.
- Download: `public/downloads/three-p-decision-check-v2.pdf`.
- Live article route: `/writing/people-problem-pay`.
- Verified video-description link: `https://jattoabdul.com/writing/people-problem-pay`.
- Direct download: `https://jattoabdul.com/downloads/three-p-decision-check-v2.pdf`.
- PDF SHA-256: `44ba35d16ed547dde321416d6b7b673fb9fd604f26a34ab4f19f8c170776adb6`.

The PDF is a byte-identical copy of the approved Video Studio companion v2 for the Three-P video.
Its three pages and 16 form fields were validated in the production project. This article uses
the owner's People, Problem, Pay framework and revised employer question. The tutor scenario
is explicitly illustrative. No project revenue, customer, employer or creator-comparison claims
were added. The article uses the existing reading layout without shared component or style edits.

The companion video's public URL has not been supplied. The post stands on its own and contains
no broken embed or video placeholder. Add a verified video link later if the owner wants one.

## Release gate

1. Owner reviews the article and approves publication. Confirm its date for the actual release.
2. Set `published: true` only after that approval, then regenerate content and validate.
3. Review the existing dirty checkout and use the repository's guarded production workflow only
   with explicit deployment approval. Do not bundle unrelated changes without review.
4. Verify the public article, PDF response, exact downloaded hash, three pages and fillable fields.
5. Check the public writing archive, RSS and sitemap, plus desktop/mobile access while signed out.
6. Only after live verification, replace the video description's resource placeholder with the
   article URL. YouTube description editing and video upload/publication remain separate actions.

## Production preflight

- Target: existing Cloudflare Worker `jattoabdul-production`, environment `production`, serving
  `jattoabdul.com/*` and `www.jattoabdul.com/*`. Newsletter mode remains `live`.
- Read-only deployment inventory confirmed the prior version
  `8cf9c95d-d89c-4762-9c13-35a858e56276` receives 100% of traffic, deployed October 3.
- The retained production build stamp is dated October 3 at 23:36:53 UTC. Its configuration
  hash matches the unchanged current `wrangler.jsonc`. All non-ignored tracked/untracked files
  newer than that build are the four Three-P article/resource/test/release-record files.
  The pre-existing newsletter changes and birthday note are preserved as the deployed baseline.
- The temporary local preview was stopped and restored the normal published-only indexes before
  the publication flag was changed. No shared rendering, configuration or newsletter code was edited.
- Validation: lint, types, content/resource tests, existing newsletter/access tests, then the guarded
  production build and private-value scan. Deployment must use the exact approved isolated Wrangler.
- Recovery baseline: the prior October 3 Worker version above retains the current newsletter
  unsubscribe and retry behavior. If recovery becomes necessary, preserve D1 consent/suppression
  state and secrets. Do not use an older pre-newsletter rollback, reset data or send mail.

## Local validation and review

- `npm run lint`: passed.
- `npm run test:content`: 6/6 passed.
- `node --test tests/three-p-resource.test.mjs`: 2/2 passed. The focused article/resource and
  writing-content tests were rerun after moving the download link to the start of the body, 4/4.
- Normal `scripts/prepare-content.mjs` output excludes the draft from both generated indexes.
- Local article: HTTP 200 with `X-Robots-Tag: noindex, nofollow` and matching robots metadata.
- PDF: HTTP 200, `application/pdf`, 21,577 bytes, exact approved SHA-256 verified over HTTP.
- Chromium desktop (1440 x 1000) and mobile (390 x 844) reviewed; no horizontal overflow.
  Reduced-motion emulation checked. The focused link activated with Enter and opened the PDF.
- Browser console had no application errors or warnings during the initial review.
- Shared rendering, styles, routes, build configuration and newsletter changes were untouched.
  A Workers/production build was not needed for this content-only draft and was not run.

The initial local review ran at `http://127.0.0.1:3037/writing/people-problem-pay`. The ignored
helper `output/three-p-preview/preview.mjs` temporarily inserted only this draft into the ignored
generated indexes and started Next on loopback with noindex and tracking disabled. The canonical
source stayed `published: false` during review. The helper was stopped for release and restored the
normal published-only indexes. It is local review tooling and is not a deployed route.

Screenshots: `output/playwright/three-p-desktop.png` and `output/playwright/three-p-mobile-top.png`.
These ignored review artifacts are distinct from the article and PDF release assets.

## Completed release and live verification

- `npm run lint` and `npm run type-check`: passed.
- Content, Three-P resource, newsletter, staging-access and production-seed tests: 38/38 passed.
  Provider calls in these tests are mocked. Existing Node module-type warnings are non-blocking.
- `npm run build:production -- live`: passed, including exact-target checks, static-cache validation
  and the private-value output scan.
- `npm run deploy:production -- live`: succeeded. Cloudflare version
  `d127b9d9-7286-4115-82a1-afca91cdfd2f` was deployed at 14:51:14 UTC / 10:51:14 EDT.
  A fresh deployment inventory confirms it receives 100% of traffic.
- `EXPECT_INDEXABLE=true MIGRATION_URL=https://jattoabdul.com npm run test:migration`: 4/4 passed.
  This covers all published routes, prior redirects, missing/draft routes, canonical/indexing
  behavior, sitemap, robots, RSS, health and rejection of an invalid unauthenticated signup.
- Article and download returned HTTP 200 on both apex and www. PDF responses are `application/pdf`,
  21,577 bytes, and match the approved SHA-256 above on both hosts. The unchanged source PDF has
  three pages, 16 canonical form fields and 16 page widgets.
- The writing archive, RSS and sitemap all contain the new article URL.
- Signed-out Chromium review passed at 1440 x 1000 and 390 x 844. Mobile document width equals
  viewport width, with no horizontal overflow. Both article links point to the verified PDF.
  Clicking the top download link opened the public PDF successfully; the current browser console
  reported zero errors or warnings. This is browser viewport testing, not physical-device testing.
- Live screenshots: `output/playwright/three-p-live-desktop.png` and
  `output/playwright/three-p-live-mobile.png`.
- Shared application/configuration files, existing dirty work, D1 schema/data, credentials and
  newsletter audience/settings were preserved. No commit, push, email or YouTube mutation occurred.

Suggested description line:

> Download the free Three-P Decision Check: https://jattoabdul.com/writing/people-problem-pay
