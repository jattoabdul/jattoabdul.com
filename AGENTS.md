# AGENTS.md

## Scope

Applies only to `/jattoabdul.com`.

## First-Step Protocol

1. Confirm scope for this repo only.
2. Read `README.md`, then inspect `package.json`.
3. Check runtime pins before running commands.
4. Use the package manager implied by lockfiles.

## Runtime And Toolchain

- Stack: Next.js.
- Runtime pin: `.nvmrc` present.
- JS package manager: `npm` (`package-lock.json` present).
- No project-local compose workflow.

## Dependencies

- No required local sibling dependency for baseline startup.
- Keep changes local to this repo unless explicitly requested.

## Preferred Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Start production build: `npm run start`

## Quick Checks

- Content/UI updates: `npm run lint`
- Build/system changes: `npm run build`

## Safety Constraints

- Ask before destructive actions: mass deletes, git history rewrites, env/secret rewrites, deploys.
- Do not modify sibling repos unless explicitly requested.

## Output Requirements

- Report changed files and behavior impact.
- Report validation commands run (or why skipped).
- Include explicit local date/time and timezone for time-sensitive notes.

## Cinematic migration (owner approved 2026-09-07, America/Toronto)

Branch `migration/cinematic-next` carries prototype checkpoint d202ec6. `checkpoint/pre-cinematic-migration` preserves the earlier dirty open-door work; its original checkout remains untouched. Use Node 24.20.0 and npm 11.19.0. Run lint, type-check, Workers build, and HTTP migration checks when changing rendering/routing. Preserve approved typography, palette, animation timing, content, published URLs and privacy of the number of children. Homepage story and reading bodies render on the server; client animation components may prerender but must never access browser globals during rendering. Native document navigation is deliberate to preserve animation lifecycle. Keep previews noindex, and do not push or deploy without owner instruction.

Confirmed current statuses (owner, 2026-11-07): TrustKarry closed beta; Pinnr positioned as a standalone Pinterest studio in private pilot (do not mention Shopify review); RuleNorth in development; Deendemy in development, not deployed (coming soon). Audience copy is broadened beyond "young people" per the 2026-10-24 niche. Mentoring offers free calls. Owner open to full-time engineering alongside occasional Fera consulting (reconfirm).

Owner confirmed physical iPhone Safari verification of the migrated build, with no issues. Continue migration work from the original jattoabdul.com checkout after switching it to migration/cinematic-next.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
