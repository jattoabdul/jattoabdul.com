# Current Website Review

Prepared: 2026-04-25 19:52 EDT

Target project: this repository

## Scope

This review covers:

- the live site at [jattoabdul.com](https://jattoabdul.com)
- the local rebuild repo at [jattoabdul/jattoabdul.com](https://github.com/jattoabdul/jattoabdul.com)
- private resume, LinkedIn, and content-planning notes used only to infer public positioning

The deeper resume/content source files are not copied into this repo because this website repo is public-facing.

## Positioning To Design For

The site should position Jatto Abdul as:

- a senior engineer moving toward staff-level signal
- a backend/platform/product engineer with frontend fluency
- a practical applied-AI systems builder, not an AI hype account
- a technical communicator and content creator who writes, records, and teaches from real product work

Recommended one-sentence promise:

> I share practical software engineering lessons from building real products: backend and platform systems, AI-assisted
> workflows, and communication habits for engineers.

## Live Site Snapshot

Captured screenshots:

- [current-jattoabdul-live-home.png](../../output/playwright/personal-site-research-2026-04-25/current-jattoabdul-live-home.png)
- [current-jattoabdul-live-full.png](../../output/playwright/personal-site-research-2026-04-25/current-jattoabdul-live-full.png)

What is working:

- The hero now says `Jatto Abdul` and `Senior Software Engineer @ Minerva`, which is closer to the current positioning.
- The portrait gives the page a real human signal immediately.
- The resume CTA is obvious.
- The site already has raw proof points: Fera, Heroshe, Andela, Iris Nova, project work, and a broad technical stack.

Main issues:

- The site still behaves like a visual resume, not a creator/home-base site.
- The source export is Canva-heavy, not easy to maintain in code, version, review, or extend into a blog.
- The page title is still `About | Abdulqahhar Aminujatto`; the public brand decision points toward `Jatto Abdul`.
- Metadata is generic and does not mention platform engineering, applied AI, writing, or content.
- The rendered hero is updated, but older resume-era sections still dominate the experience.
- The About copy has a typo in the export: `II'm`.
- The experience section still centers Fera first, which weakens the current Minerva-forward story.
- The navigation says `Projects`, but there is no writing, notes, videos, or content hub.
- The primary CTA is only `Resume`; there is no clear `Read`, `Watch`, `Subscribe`, or `Work with me` path.
- The project bullets are useful but too dense for a homepage. They should become short proof cards that link to deeper
  case studies.
- Visual structure depends heavily on large full-bleed sections and repeated portrait imagery; it does not yet create a
  reusable publishing system.

## Local Rebuild State

Relevant local files:

- [src/app/page.tsx](../../src/app/page.tsx)
- [src/components/sections/Hero/index.tsx](../../src/components/sections/Hero/index.tsx)
- [src/app/layout.tsx](../../src/app/layout.tsx)
- [IMPLEMENTATION_PLAN.md](../../IMPLEMENTATION_PLAN.md)

Current repo shape:

- Next.js 15.1.6, React 19, npm, Tailwind.
- Custom Avant Garde font is installed.
- Theme tokens exist for smoky black, wheat, and cinnabar.
- Navigation, command menu, theme provider, button, icon, layout, and hero foundations exist.
- The homepage currently renders only a placeholder hero: `Main Site Original Content` and `Main Site Mask Content`.
- Metadata still says `Jatto Abdul | Building Digital Experiences`, which is softer than the target positioning.
- The implementation plan leans toward an expressive crystal/interactive-tech-stack idea.

Local repo opportunity:

- Keep the design-system work, but reset the content model before building more visuals.
- Use data-driven sections for experience, projects, writing, links, and social channels.
- Add a blog/content layer early, likely MDX or a simple markdown-backed content collection or a medium subdomain.
- Treat the homepage as a publishing and credibility hub, not a static portfolio.

## Recommended Information Architecture

Homepage:

1. Hero: `Jatto Abdul`, crisp positioning, short proof paragraph, portrait or editorial visual, and CTAs for `Read`,
   `Watch`, `Resume`, and `Contact`.
2. Proof strip: years of experience, current focus, key domains, and strongest technologies.
3. Latest writing and videos: 3 to 6 recent pieces, even if the first version uses planned posts.
4. Selected work: Minerva, Fera, Heroshe, Discova, TrustKarry, and public-safe applied-AI experiments.
5. Staff engineer signal: principles, operating style, leadership/communication strengths.
6. Subscribe/follow/contact: one simple end section.

Top nav:

- Home
- Writing
- Work
- Projects
- About
- Contact

Future content types:

- `Writing`: essays, technical posts, career/communication posts
- `Notes`: shorter build notes, learnings, references
- `Videos`: YouTube embeds or links
- `Projects`: polished case studies and build logs

## Copy Direction

Homepage hero should avoid generic lines like:

- `Building Digital Experiences`
- `Fullstack Engineer crafting delightful digital experiences`
- `What I can use and do`

Stronger phrasing:

- `Senior Software Engineer building backend, platform, and applied-AI systems.`
-
`I write about practical software engineering, AI-assisted product building, and the communication habits that make engineers more effective.`
- `Currently focused on data modernization, search/reporting workflows, and AI-adjacent infrastructure.`

## Design Direction

Good fit:

- technical editorial layout
- clean typography
- warm but restrained palette
- a small number of strong visual motifs
- screenshots, diagrams, and writing cards
- visible personality through voice and selected personal details, not decorative clutter

Use carefully:

- dark premium sections
- animated masks
- crystal/tech-stack visuals
- heavy geometric effects

Avoid:

- portfolio-template density
- overlong resume bullets on the homepage
- decorative visuals that compete with the writing/content hub
- many unrelated creator identities on one page

## Near-Term Rebuild Plan

1. Freeze the public positioning and homepage section order.
2. Replace placeholder hero content with the chosen positioning.
3. Add a structured data file for experience, projects, links, and featured content.
4. Add a writing/content route before polishing visual effects.
5. Update metadata to match the new positioning.
6. Build the homepage around publishable, easy-to-update sections.

## Decision Questions

- Should the public name be `Jatto Abdul` everywhere, with `Abdulqahhar Aminujatto` kept only in resume/legal contexts?
- Should the first rebuild lean more minimalist like Lee Robinson/Hamel Husain, or more visual/editorial like Josh
  Comeau/Kent C. Dodds?
- Should the homepage mention Minerva directly, or use a broader current-focus line while the resume handles formal
  employment detail?
- Which projects are public-safe enough to feature as case studies?
- Should the blog launch as `Writing`, `Notes`, or both?
