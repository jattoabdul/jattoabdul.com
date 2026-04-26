# Design System Review And Improvement Prompt

Prepared: 2026-04-25 23:25 EDT

Reviewed artifacts:

- [docs/design_system.zip](../design_system.zip)
- [docs/design_system](../design_system)
- [Claude design-system preview screenshot](../../output/playwright/personal-site-research-2026-04-25-addendum/claude-design-system.png)

## Short Review

The Claude-generated design system is a strong first pass. It correctly moves the site away from a static resume and toward a writing-first senior engineer home base. The best parts are:

- clear positioning around backend, platform, applied AI, and engineering communication
- calm editorial direction instead of generic portfolio flash
- component coverage for hero, writing list, notes index, project cards, article page, CTA, nav, and footer
- good reading defaults: generous line height, strict text measure, restrained shadows, small-radius cards
- a practical light/dark token system and a prototype that makes the direction visible

The main improvement needed is not "make it prettier." It needs sharper alignment with the newest research:

- include Asiful Alam's Medium-plus-personal-site blog model
- add a controlled "simple with complexity" layer inspired by Asiful, Paco Coursey, Emil Kowalski, Rauno Freiberg, Braydon Coyer, Max Boeck, Max Leiter, Brittany Chiang, and Chanh Dai
- make the design system more implementation-ready for the actual Next.js/Tailwind repo
- remove ambiguity and contradictions in fonts, content model, and dark mode

## What Needs Improvement

1. Font direction is inconsistent.

The README mentions Instrument Serif, Inter, and Geist. The CSS uses Fraunces, Plus Jakarta Sans, and JetBrains Mono. The actual repo currently has Avant Garde and Nunito Sans. The next pass should choose one coherent font stack and explain why.

2. The palette may be too quiet.

Warm paper plus forest green is credible, but it risks feeling generic editorial/Substack-adjacent. The new Asiful/Max/Brittany references suggest a stronger dark-mode identity or a sharper developer-craft accent could help.

3. The design is writing-first, but not blog-system-first.

The current design system has article and notes components, but it does not specify the actual publishing architecture: Medium feed ingestion, first-party posts, external posts, tags, source labels, canonical URLs, SEO, empty/loading/error states, and migration from Medium to MDX over time.

4. The prototype uses fake content.

Sample posts like data pipelines and fake projects are fine for layout testing, but the next pass should make all placeholders explicitly public-safe and replaceable with real content categories: Minerva-safe current focus, Fera, Heroshe, Discova, TrustKarry, AI-assisted workflows, communication, and career lessons.

5. The site needs a little more personality.

The system is tasteful but maybe too neutral. Jatto's site should feel like a serious engineer who also builds, experiments, records, and writes. Borrow small details: command menu, changelog, link previews, status/currently block, reading/watching/working-on module, dark-mode craft, and tasteful code/diagram moments.

6. Implementation guidance is not specific enough.

It should produce Tailwind tokens, component names, route/page map, content schema, MDX/RSS ingestion strategy, and state specs. The current UI kit is helpful but still feels like a standalone prototype rather than a direct handoff to the local Next.js repo.

7. Accessibility and responsive behavior need a deeper pass.

The system should explicitly define keyboard navigation, focus styles, motion reduction, color contrast targets, mobile nav behavior, article readability, and code block overflow behavior.

## Recommended Prompt For Claude Design

```text
I have a first-pass design system for my personal site, jattoabdul.com, but I want you to revise and strengthen it using new research.

Context:
I am Jatto Abdul, a senior software engineer positioning toward staff-level engineering. My strongest lane is backend, platform, product engineering, and applied-AI systems, with frontend/product fluency. I also want the site to support my growth as a technical content creator through blog posts, notes, videos, and project writeups.

The site should feel like the home base of a serious engineer who writes, builds, teaches, and experiments. It should not feel like a generic portfolio, resume template, SaaS landing page, or AI-bro brand.

Existing direction:
- technical editorial
- systems blueprint
- warm product educator
- senior engineering credibility
- writing-first homepage
- Next.js + Tailwind implementation

New research to include:
- Asiful Alam: https://asifulalam.me/
- Asiful's Medium integration article: https://javascript.plainenglish.io/how-i-successfully-added-medium-blogs-to-my-website-abafd76c4182
- Medium RSS help: https://help.medium.com/hc/en-us/articles/214874118-Using-RSS-feeds-of-profiles-publications-and-topics
- Paco Coursey: https://paco.me/
- Emil Kowalski: https://emilkowal.ski/
- Rauno Freiberg: https://rauno.me/
- Braydon Coyer: https://www.braydoncoyer.dev/
- Max Boeck: https://mxb.dev/
- Max Leiter: https://maxleiter.com/
- Brittany Chiang: https://brittanychiang.com/
- Chanh Dai: https://chanhdai.com/

Updated aesthetic target:
- 45% technical editorial
- 25% systems blueprint
- 15% simple-with-complexity developer craft
- 10% warm product educator
- 5% premium engineering leader

I want the design to look simple at first glance but reveal craft in the details: strong typography, calm layout, subtle interaction, excellent article pages, useful tags/filters, a command-menu option, readable code blocks, elegant dark mode, and a blog system that can grow.

Important blog requirement:
I like Asiful Alam's idea of combining Medium and a personal website. Please design a writing system that supports:
1. first-party posts on my personal site
2. Medium-synced posts via Medium RSS
3. external article cards labeled clearly as "Published on Medium"
4. optional full-article pages only when content/canonical/SEO handling is safe
5. server-side fetching/caching, not fragile client-only fetching
6. empty/loading/error states for feed failures
7. tags, filters, source labels, read time, published date, and canonical/source URL
8. a migration path from "latest Medium cards" to a durable first-party MDX archive

Please also account for Medium RSS constraints:
- Medium provides RSS feeds for profiles and publications.
- Medium paywalled stories are not available as full stories in RSS feeds.
- Practical implementations often only expose a limited number of recent items, so the personal site needs its own durable archive over time.

The current first-pass design system has these issues I want you to fix:
1. Font inconsistency: it mentions Instrument Serif/Inter/Geist, but the CSS uses Fraunces/Plus Jakarta/JetBrains Mono. Choose one coherent type system and explain it.
2. Palette may be too generic: warm paper + forest green is good, but consider a stronger dark-mode/developer-craft identity inspired by Asiful, Brittany, Max Leiter, and Chanh Dai.
3. The design needs more personality without becoming playful/noisy.
4. It needs implementation-ready Tailwind tokens, component specs, and content schemas.
5. It needs stronger accessibility and responsive guidance.
6. It must avoid fake project specificity unless clearly marked as placeholder content.

Please produce an improved design-system spec with:
- revised brand principles
- visual mood and art direction
- light and dark color palettes with semantic tokens
- final typography recommendation and fallback stack
- spacing/layout/grid rules
- component specs for header, hero, writing list, Medium post card, article card, project card, notes index, source badge, tag filters, code block, diagram block, CTA, footer, command menu, and newsletter/signup area
- homepage layout concepts
- blog/writing IA
- article page design
- Medium integration UI states
- project/case-study page guidance
- rules for diagrams, screenshots, code snippets, and technical visuals
- accessibility requirements
- motion/interaction rules
- Tailwind implementation notes for a Next.js app

Please be concrete. Include example tokens, component anatomy, route map, content schemas, and design rules that keep the site manageable over time.
```

## My Recommendation

Use this prompt as a second Claude Design pass rather than replacing the first design system manually. The current system is a good foundation; the next pass should sharpen it around Asiful-style Medium integration and the "simple shell, rich details" developer aesthetic.
