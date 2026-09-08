# Redesign branch: The Open Door (brand v2.0)

Branch `redesign/open-door`. The homepage is rebuilt one section per round, reviewed by the owner and Codex, then locked. Canonical copy and tokens come from Command Center `notes/content/brand/` (`website.md`, `visual-identity.md`, `positioning.md`). Nothing on this branch deploys until the owner says so.

## Run it

```bash
nvm use
npm install
npm run dev -- -p 3005
```

Open http://localhost:3005. The bottom-right "Prototype controls" panel flips the decisions still open. A state can be shared as a link, for example `http://localhost:3005/?treatment=light&side=right&photo=plain&door2=instagram`.

Checks: `npm run type-check` and `npm run lint`.

## Rounds

| Round | Scope | Status | Files |
|---|---|---|---|
| 1 | Header, arrival (hero), the door, mobile menu, three-state theme switch | in review | `src/components/site/Header.tsx`, `ThemeSwitch.tsx`, `Door.tsx`, `DoorRoom.tsx`, `Wordmark.tsx`, `src/components/sections/Arrival.tsx`, `src/components/site/PrototypeControls.tsx`, `src/lib/door-store.ts`, `src/lib/prototype-store.ts`, `src/data/site.ts`, `src/styles/globals.css`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, room stubs `src/app/{speaking,building,mentoring}/page.tsx` |
| 2 | Three entry points | next | |
| 3 | Featured piece | | |
| 4 | Channels row (LAWJA as "learning a language in public") | | |
| 5 | Building now (one block, under a fifth of the page) | | |
| 6 | The letter | | |
| 7 | About block, footer, metadata and Open Graph, favicon | | |
| Lock | Remove `PrototypeControls`, the prototype store, the losing variants, the "Round ends here" note, and the unused v1 sections and command menu; redirect inventory; route table confirmed | | |

## Decisions open in round 1

Flip them in the controls panel:

1. Hero treatment: dark, full bleed (owner direction 2026-09-05) or light, on paper.
2. Portrait side: left or right.
3. Photo slot behind the dark hero: the light study, or plain navy until the shoot.
4. The door's second action: YouTube or the Instagram handle.

Not in the panel: whether the header stays sticky, and the mobile menu's wording.

## What the rest of the site looks like meanwhile

The tokens changed site-wide on this branch (navy, maroon, warm white, Lamplight in dark mode), so existing pages already wear the new colours. Their copy and layout are unchanged until their rounds. The footer still carries the previous description; it is redesigned in round 7.

## Verification, round 1 (2026-09-05)

- `npm run type-check` and `npm run lint` pass.
- `docs/redesign/test-round-1.sh` runs `public/__tests/round-1.html` against the dev server in headless Chrome: 40 of 40 checks pass (door opens from the header, from "Come on in", and from the mobile menu; focus moves in, Tab wraps, Escape closes, focus returns; background inert while open; closed room not displayed; theme switch light, system, dark; canonical headline and identity line; rooms order; no em dashes; no label on the front door; metadata description; `/contact` 200; `/start` 404; mobile menu closed by default and works; no horizontal overflow at 390 px).
- Captures in `docs/redesign/screens/round-1/`: desktop 1440 for both treatments and both portrait sides, the plain photo slot, reduced motion, the Speaking stub, and 500 px (the narrowest headless Chrome opens) for both treatments. Dark theme was verified in the static reference renders and by the theme-switch test.

## How to give feedback

Write numbered notes in `docs/redesign/FEEDBACK.md` under the round heading, or say them in the chat. Include the device, the theme, and the panel state (or the link with parameters). Screenshots go in `docs/redesign/feedback/`.

## How Codex reviews

Paste `docs/redesign/CODEX-REVIEW-ROUND-1.md` into Codex. Codex writes `docs/redesign/reviews/codex-round-1.md`. It does not edit source on this branch.

## Reference

The static reference build of round 1 (same design, plain HTML with a behaviour test harness and headless renders) is in Media-Work `jatto-abdul/brand/prototype/homepage-v2/`. It is the design record, not a second codebase.
