# Codex review prompt: redesign branch, round 1 (header, arrival, the door)

Copy everything below the line into Codex.

---

Review round 1 of the jattoabdul.com redesign on branch `redesign/open-door` in `/Users/jatto/Workspaces/personal-projects/jatto-brand/jattoabdul.com`. Scope is the header, the arrival (hero), the door, the mobile menu, and the theme switch. Sections below the hero do not exist yet; do not review them.

Read first, in this order:
1. `/Users/jatto/Workspaces/command-center/notes/content/brand/website.md` (header lock, arrival copy, hero treatment, door behaviour, reference sites).
2. `/Users/jatto/Workspaces/command-center/notes/content/brand/visual-identity.md` (tokens, the never list, the door gesture, wardrobe rule).
3. `/Users/jatto/Workspaces/command-center/notes/content/brand/positioning.md`, sections "How to describe Jatto" and "Front-door rule".
4. `/Users/jatto/Workspaces/command-center/notes/projects/personal-brand-system/reviews/P6C-011-codex-open-door-review-and-handoff.md`, finding 2 (your own request for this prototype).
5. `docs/redesign/README.md` in the repository, then the round 1 files it lists.

Run:
- `npm run type-check && npm run lint`
- `npm run dev -- -p 3005`, then open http://localhost:3005 in a browser. Try the prototype controls, the door, the theme switch, the mobile width, and keyboard-only navigation. If you have a headless browser available, capture desktop and mobile in both themes and both treatments.
- The static reference of the same design, with its behaviour test harness, is in `/Users/jatto/Media-Work/jatto-abdul/brand/prototype/homepage-v2/` (`zsh tools/test.sh`, `zsh tools/render.sh`). Use it to compare, not as the thing under review.

Answer with evidence (file and line, screenshot filename, or observed behaviour):
1. Can a first-time visitor find videos under Speaking and contact through the door, on desktop, on mobile, and by keyboard only?
2. Does the arrival match website.md: copy exact, identity line with the multiplication sign and the plain accessible form, two actions, portrait clear of the text, lower edge feathered into the page, no hard shelves?
3. Do the tokens in `src/styles/globals.css` match visual-identity.md, with nothing from the never list (maroon on navy, Lamplight as text on light surfaces, rose, hairlines, eyebrows, em dashes)? Check the contrast of every text and surface pair you can see, in both themes and both treatments.
4. Does the door behave as specified: rest, hover, open, the room, Escape, focus return, inert background, reduced motion? Does `/contact` still work as the no-JavaScript fallback?
5. Is the theme switch three-state with icons, and does "system" follow the OS through next-themes?
6. Is the implementation sound for this repository: server and client component boundaries, hydration (the prototype store uses skipHydration and rehydrates on mount), the sticky header's on-dark logic, `next/image` use, Tailwind conventions? Name anything that would not survive the lock or the later rounds.
7. Anything that reads as a template, an AI tell, or a stranger's website rather than Jatto's.

Write `docs/redesign/reviews/codex-round-1.md` with: outcome in two sentences; findings ordered P1 to P3, each with evidence and a recommendation; what works; what you did not test. Do not edit source on the branch, the canonical brand files, or `main`. Nothing goes live.
