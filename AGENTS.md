# AGENTS.md

## Scope

Applies only to `/Users/jatto/Documents/workspaces/jattoabdul.com`.

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
