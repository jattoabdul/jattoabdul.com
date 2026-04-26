# Jatto Abdul — Personal Site Design System
## Revised v2 — Research-informed

---

## Identity

**Owner:** Jatto Abdul  
**URL:** jattoabdul.com  
**Stack:** Next.js (App Router), Tailwind CSS v4, MDX, TypeScript  
**Last revised:** Apr 2025

**Positioning:**
> Senior Software Engineer building backend, platform, and applied-AI systems. I write about practical engineering, AI-assisted product building, and communication for engineers.

**Audience:** Engineering peers, recruiters/hiring managers, engineering leaders, content consumers in the technical space.

**Persona blend (updated):**
- 45% technical editorial
- 25% systems blueprint
- 15% developer craft (simple surface, complex details)
- 10% warm product educator
- 5% premium engineering leader

---

## Brand Principles

1. **Earned simplicity.** The design looks minimal at first glance. Craft lives in the details: tight spacing rhythm, precise type sizing, subtle hover states, smooth dark mode transitions. Not sparse because it's lazy — sparse because every pixel serves a purpose.

2. **Writing-first.** The homepage is a curated reading list with an introduction, not a resume. The best thing on the page is always the latest post, not the navigation or the hero.

3. **Developer credibility.** Code blocks are beautiful. The design can hold a 500-line technical post without breaking. Technical diagrams and screenshots look intentional, not pasted in.

4. **Dark mode as a first-class experience.** Not an afterthought. Dark mode has its own personality: deeper contrast, a more vibrant green accent, a slightly different type rhythm. It should feel like a deliberate design decision, not a CSS inversion.

5. **Growth-friendly.** The site can hold 3 posts or 300. The Medium feed degrades gracefully. The design doesn't depend on content density to look good.

6. **No hype.** No gradient blobs, no AI-bro visuals, no SaaS landing page conventions. Nothing purple or teal. Nothing that says "I made this with a template."

---

## CONTENT FUNDAMENTALS

### Tone
- **First-person, direct.** "I built…", "I think…", "Here's what happened."
- **Practical over theoretical.** Grounded in real builds, real tradeoffs, real timelines.
- **Confident without posturing.** State opinions. Don't hedge.
- **Warm but credible.** Senior engineer you respect, writing clearly for peers.

### Casing
- Navigation: Title case ("Writing", "Notes", "Projects", "About")
- Article titles: Sentence case ("Designing data pipelines that don't lie to you")
- Section headers: Sentence case
- CTAs: Action-oriented ("Read the post", "Subscribe", "Browse notes")

### Emoji: Never used in the site UI. Very rarely in social/newsletter.

### Copy vibe
Short paragraphs (3–4 lines max). Active voice. Technical terms used naturally. Feels like a thoughtful Slack message from a senior engineer, not a LinkedIn post.

---

## VISUAL FOUNDATIONS

### Design character
Clean, editorial, high-density but not cramped. Typography hierarchy carries the layout. The strongest reference blend: Paco Coursey's simplicity × Emil Kowalski's writing focus × Brittany Chiang's dark mode confidence × a warmer, more editorial serif personality.

Not: SaaS, portfolio template, dark "hacker" aesthetic, loud AI branding.

### Type System (CANONICAL — use this everywhere)

**Serif (display + headings):** `Fraunces` (Google Fonts)
- Optical sizing: 9–144px range, auto-adjusts letterform at small and large sizes
- Weights: 300 (light/italic pullquotes), 400 (regular headings), 500 (emphasized headings)
- Italic: distinctly different, beautiful — use for hero second line, pullquotes
- Why: editorial, warm, distinctive, memorable. Not overused in dev portfolios. Optical sizing makes it work perfectly from article titles down to inline text.

**Sans (body + UI):** `Plus Jakarta Sans` (Google Fonts)
- Weights: 400, 500, 600, 700
- Why: slightly geometric, more character than Inter/Geist, still highly readable at small sizes. Clean enough for UI, warm enough for body copy.

**Mono (code + technical labels):** `JetBrains Mono` (Google Fonts)
- Weights: 400, 500
- Why: Best-in-class legibility for code, ligatures optional, consistent stroke weight at all sizes.

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

**Next.js font config:**
```ts
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

export const serif = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})
export const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})
export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

**Tailwind config (tailwind.config.ts):**
```ts
fontFamily: {
  serif: ['var(--font-serif)', 'Georgia', 'serif'],
  sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
  mono:  ['var(--font-mono)', 'Fira Code', 'monospace'],
}
```

**Type scale:**

| Token      | Size (rem) | px  | Font      | Weight | Leading | Usage |
|------------|-----------|-----|-----------|--------|---------|-------|
| display    | 3.25rem   | 52px | serif    | 400    | 1.08    | Hero headline only |
| h1         | 2.25rem   | 36px | serif    | 400    | 1.12    | Article titles, page titles |
| h2         | 1.625rem  | 26px | serif    | 400    | 1.25    | Section headers, article H2 |
| h3         | 1.125rem  | 18px | sans     | 600    | 1.3     | Card titles, article H3 |
| h4         | 1.0rem    | 16px | sans     | 600    | 1.4     | Sub-section labels |
| body-lg    | 1.0625rem | 17px | sans     | 400    | 1.8     | Article body text |
| body       | 1.0rem    | 16px | sans     | 400    | 1.75    | Default body |
| body-sm    | 0.9375rem | 15px | sans     | 400    | 1.65    | Card excerpts |
| small      | 0.875rem  | 14px | sans     | 400    | 1.5     | Meta, captions |
| xs         | 0.75rem   | 12px | sans     | 500    | 1.4     | Labels, tags |
| mono       | 0.875rem  | 14px | mono     | 400    | 1.65    | Code, technical labels |
| mono-sm    | 0.8125rem | 13px | mono     | 400    | 1.65    | Inline code in body |

**Measure (max line width):**
- Body articles: 68ch
- Narrow (hero sub): 52ch
- Wide (projects grid): unconstrained

---

## Color System

### Palette — Raw Tokens

```css
/* Green accent scale */
--green-50:  #ECFDF5
--green-100: #D1FAE5
--green-200: #A7F3D0
--green-300: #6EE7B7
--green-400: #34D399   /* dark mode accent */
--green-500: #10B981   /* dark mode accent hover */
--green-600: #059669   /* light mode accent */
--green-700: #047857   /* light mode accent hover */
--green-800: #065F46
--green-900: #064E3B

/* Warm neutrals */
--stone-50:  #FAFAF9
--stone-100: #F5F5F4
--stone-200: #E7E5E4
--stone-300: #D6D3D1
--stone-400: #A8A29E
--stone-500: #78716C
--stone-600: #57534E
--stone-700: #44403C
--stone-800: #292524
--stone-900: #1C1917
--stone-950: #0C0A09

/* Ink */
--ink: #18181B    /* slightly cool, high-contrast */
```

### Semantic Tokens — Light Mode

```css
--bg:           #FAFAF9    /* warm paper */
--bg-surface:   #FFFFFF    /* card / elevated */
--bg-raised:    #F5F5F4    /* subtle hover bg */
--bg-sunken:    #EFEFED    /* inputs, code inline */
--bg-accent:    #ECFDF5    /* green tint panel */
--bg-code:      #F4F2EC    /* warm code block */

--fg:           #18181B    /* primary text */
--fg-2:         #57534E    /* secondary text */
--fg-3:         #A8A29E    /* muted / meta */
--fg-on-accent: #FFFFFF    /* text on green bg */

--border:       #E7E5E4    /* default border */
--border-mid:   #D6D3D1    /* stronger border */

--accent:       #059669    /* links, CTAs */
--accent-h:     #047857    /* hover */
--accent-light: #ECFDF5    /* accent panel bg */
--accent-mid:   #A7F3D0    /* accent border */
```

### Semantic Tokens — Dark Mode (STRONG identity)

```css
--bg:           #0C0A09    /* near-black, warm */
--bg-surface:   #161412    /* card surface */
--bg-raised:    #1E1B18    /* elevated surface */
--bg-sunken:    #0A0908    /* deeper than bg */
--bg-accent:    #022C22    /* deep green panel */
--bg-code:      #111008    /* dark warm code bg */

--fg:           #FAFAF9    /* primary text */
--fg-2:         #A8A29E    /* secondary */
--fg-3:         #78716C    /* muted */
--fg-on-accent: #FFFFFF

--border:       #292524    /* default border */
--border-mid:   #3C3834    /* stronger border */

--accent:       #34D399    /* bright green — pops on dark */
--accent-h:     #6EE7B7    /* hover */
--accent-light: #022C22    /* accent panel */
--accent-mid:   #065F46    /* accent border */
```

**Why this dark palette?**
- `#0C0A09` is darker and warmer than the original `#111110` — closer to what Brittany Chiang / Chanh Dai use. Feels premium, not washed out.
- Accent shifts from `#1A6B4A` (muted forest) to `#34D399` (vibrant emerald) in dark mode — high contrast, unmistakably green, distinctive in the dev portfolio space.
- NOT teal. NOT blue-purple. Consistently green across both modes.

### Tailwind tokens (tailwind.config.ts extend):

```ts
colors: {
  stone: { /* full Tailwind stone scale */ },
  accent: {
    DEFAULT: 'var(--accent)',
    light:   'var(--accent-light)',
    mid:     'var(--accent-mid)',
  },
  bg: {
    DEFAULT:  'var(--bg)',
    surface:  'var(--bg-surface)',
    raised:   'var(--bg-raised)',
    sunken:   'var(--bg-sunken)',
    accent:   'var(--bg-accent)',
    code:     'var(--bg-code)',
  },
  fg: {
    DEFAULT: 'var(--fg)',
    2:       'var(--fg-2)',
    3:       'var(--fg-3)',
  },
  border: {
    DEFAULT: 'var(--border)',
    mid:     'var(--border-mid)',
  },
}
```

---

## Spacing, Layout, Grid

**Base unit:** 4px (Tailwind default)

**Container widths:**
- `--container-text: 680px` — articles, narrow content
- `--container-wide: 960px` — homepage sections with project grids
- `--container-max:  1120px` — outer shell max
- `--container-nav:  1024px` — nav inner

**Section vertical spacing:** `py-16 md:py-24` (64px / 96px)

**Grid:**
- Mobile: 1 column, `px-5`
- Tablet (md): 2 columns where needed, `px-8`
- Desktop (lg+): 12-col, most content in 8-col centered column

**Responsive padding:** `px-5 sm:px-8 lg:px-10` on page shell

---

## Border Radius

| Token        | Value    | Usage |
|---|---|---|
| `--radius-sm`  | 4px    | tags, inline code, inputs |
| `--radius-md`  | 8px    | cards, code blocks |
| `--radius-lg`  | 12px   | large cards, modal |
| `--radius-xl`  | 16px   | command menu |
| `--radius-full`| 9999px | pill badges |

---

## Shadows

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);
/* Dark mode: multiply opacity by ~2.5x */
```

---

## Component Specifications

### Header / Nav
- Height: 56px (desktop), 52px (mobile)
- Sticky, `backdrop-blur-md` + `bg-bg/90`
- Left: wordmark (Fraunces, 18px, weight 400)
- Right: nav links + optional "Subscribe" CTA pill
- Nav links: Plus Jakarta Sans, 14px, weight 500, `text-fg-2` → `text-fg` on hover
- Active link: `text-accent`
- Mobile: hamburger (3 lines, 22px) → full-height slide-down menu
- Dark mode toggle: sun/moon icon, 20px, right of nav links

### Hero
- Max-width: 680px centered
- Eyebrow: small pill badge `bg-accent-light border border-accent-mid text-accent text-xs font-semibold rounded-full`
- Headline: Fraunces 52px (display), weight 400, line-height 1.08. Second line italicized.
- Sub: Plus Jakarta Sans 17px, `text-fg-2`, max 52ch, line-height 1.8
- Actions: Primary CTA `bg-accent text-white` + Ghost CTA `border border-border text-fg-2`
- Content pillars: small tags row, `bg-raised border border-border text-fg-3 text-xs`
- **Paco-inspired:** Consider a minimal hero variant — just name + 1-line bio + links, no CTA buttons. Toggle via site tweak.

### Writing List
- Section label: `label` style (uppercase, 12px, `text-fg-3`, letter-spacing)
- Post rows: grid `grid-cols-[1fr_auto]`, `py-5`, `border-b border-border`
- Post title: Fraunces, 17px, weight 400 — NOT bold sans. Serif gives editorial feel.
- Category: 11px, uppercase, `text-accent`, tracking-wide
- Excerpt: optional, 14px, `text-fg-2`, max 3 lines
- Meta (date + read time): 13px, `text-fg-3`, right-aligned, `whitespace-nowrap`
- Source badge: shown inline when post is from Medium

### Medium Post Card (Source Badge System)
Posts may come from two sources: first-party (MDX/local) or Medium RSS.

**Source badge anatomy:**
```
[M] Published on Medium
```
- Pill badge: `bg-raised border border-border rounded-full text-xs text-fg-2 px-2 py-0.5`
- For Medium posts: "Via Medium" with medium.com favicon or "M" icon
- Canonical link opens Medium in new tab with `rel="noopener noreferrer"`
- First-party posts: no badge (default)

**Feed states:**
1. **Loading:** skeleton rows — 3 placeholder `animate-pulse` rows
2. **Success:** normal post list
3. **Empty (0 posts):** "Nothing here yet. Check back soon."
4. **Error (feed failure):** "Couldn't load Medium posts right now." + link to Medium profile directly
5. **Mixed:** first-party posts always show; Medium posts render below with a `--- From Medium ---` divider if desired, or interleaved by date

**Content schema (unified post type):**
```ts
type Post = {
  slug: string
  title: string
  excerpt?: string
  date: string          // ISO 8601
  readTime?: number     // minutes
  tags: string[]
  source: 'local' | 'medium' | 'external'
  url: string           // canonical URL
  canonical?: string    // if different from url
  coverImage?: string
  published: boolean
}
```

**Medium RSS → Post mapping:**
```ts
// Feed: https://medium.com/feed/@jattoabdul
// Fields available in RSS: title, link, pubDate, description (truncated HTML), categories
// NOT available in free RSS: full content for paywalled posts
const fromRSS = (item: RSSItem): Post => ({
  slug: slugify(item.title),
  title: item.title,
  excerpt: stripHTML(item.description).slice(0, 200),
  date: item.pubDate,
  readTime: estimateReadTime(item.description),
  tags: item.categories ?? [],
  source: 'medium',
  url: item.link,
  canonical: item.link,
  published: true,
})
```

**Server-side fetching (Next.js App Router):**
```ts
// app/writing/page.tsx
import { cache } from 'react'
export const revalidate = 3600 // 1-hour ISR cache

const getMediumPosts = cache(async () => {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@jattoabdul',
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data.items.map(fromRSS)
  } catch {
    return []  // graceful degradation
  }
})
```

**Migration path:**
1. Phase 1: Show Medium RSS cards on /writing, labeled "Via Medium"
2. Phase 2: For evergreen posts, create local MDX copies with `canonical: medium-url`
3. Phase 3: As archive grows, MDX posts take over; Medium cards become optional/secondary
4. Phase 4: Medium posting optional; personal site is primary record

### Article Card (grid variant)
Used in projects section or featured writing:
- `bg-surface border border-border rounded-lg p-5`
- Category label (accent, uppercase, 11px)
- Title: Fraunces, 16–18px
- Excerpt: 3 lines max, `text-fg-2`
- Footer: date · read time · source badge

### Project Card
- Icon slot: 36×36, `bg-accent-light border border-accent-mid rounded-lg`
- Title: Plus Jakarta Sans, 15px, weight 600
- Description: 13px, `text-fg-2`
- Tech tags: small `bg-raised border border-border rounded` pills
- Optional: status badge (Active / Archived / Open Source)

### Notes Index
- Title: Fraunces, 32px
- Filter bar: horizontal scrolling pill buttons `rounded-full border`
- Row: `date (fixed 56px) | title + tags | arrow`
- Rows: `py-3 border-b border-border text-sm`
- Date: `text-fg-3 text-xs font-mono` — using JetBrains Mono for dates gives a subtle developer detail

### Code Block
Light mode:
- `bg-[#F4F2EC] border border-border rounded-lg`
- Header: `bg-[#ECEAE3] border-b border-border px-4 py-2` with language label + copy button
- Body: `px-5 py-4 font-mono text-sm leading-relaxed overflow-x-auto`

Dark mode:
- `bg-[#111008] border border-[#292524] rounded-lg`
- Header: `bg-[#0C0A09] border-b border-[#292524]`
- Syntax: strings `#FCD34D` (amber), keywords `#93C5FD` (blue), types/functions `#34D399` (green), comments `#78716C`, numbers `#FDBA74`

### Command Menu (⌘K)
- Trigger: `⌘K` keyboard shortcut + small button in nav (icon only on mobile)
- Overlay: `fixed inset-0 bg-black/50 backdrop-blur-sm z-50`
- Dialog: `bg-surface border border-border-mid rounded-xl shadow-lg w-full max-w-xl mx-auto mt-[15vh]`
- Input: `border-b border-border px-4 py-3 text-base font-sans placeholder:text-fg-3`
- Results: grouped by category (Navigate, Writing, Projects, Notes)
- Group label: `text-xs uppercase text-fg-3 px-4 py-2`
- Item: `flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-raised cursor-pointer`
- Icon: 16px Lucide icon per result type
- Keyboard hint: `text-xs text-fg-3` right-aligned per item
- Implementation: `cmdk` by Paco Coursey (`@radix-ui/react-dialog` + `cmdk`)

### Tag Filters
- Horizontal scroll on mobile, wrap on desktop
- Active: `bg-accent text-white border-accent`
- Inactive: `bg-raised border-border text-fg-2 hover:border-border-mid`
- Style: `text-xs font-semibold rounded-full px-3 py-1 border`
- Include: All, plus content pillar tags

### CTA / Newsletter
- In-article CTA: `bg-accent-light border border-accent-mid rounded-lg p-6` with title, 1-line copy, email input + button
- Homepage CTA: centered section, Fraunces heading, sub-copy, email input
- Input: `bg-bg border border-border rounded-md text-sm px-3 py-2.5 focus:border-accent focus:ring-1 focus:ring-accent/30`
- Button: `bg-accent text-white font-semibold text-sm px-5 py-2.5 rounded-md`

### Footer
- `border-t border-border bg-raised`
- Left: wordmark + 1-line tagline + social icons
- Right: two link groups (Site, Topics)
- Bottom: copyright + "Built with Next.js" (subtle, `text-fg-3 text-xs`)
- Social icons: SVG brand marks (GitHub, X, LinkedIn) — 18px, `text-fg-3` hover `text-fg`

---

## Homepage Layout

**Recommended structure (writing-first):**
```
[ Nav ]
[ Hero: name + 1–2 line intro + CTAs ]
[ Writing: section label + 4–5 post rows + "See all" ]
[ Projects: 2–3 card grid + "See all" ]
[ Newsletter CTA ]
[ Footer ]
```

**Minimal variant (Paco-inspired):**
```
[ Nav ]
[ Name + 1-line bio ]
[ 3 most recent posts — no excerpt, date only ]
[ Projects (inline list, not cards) ]
[ Connect links ]
[ Footer ]
```

---

## Blog / Writing IA

**Routes:**
```
/writing               → full writing index (local + Medium, filterable)
/writing/[slug]        → local MDX article
/writing/tags/[tag]    → filtered by tag
/notes                 → short-form notes index
/notes/[slug]          → individual note
```

**Writing index page anatomy:**
1. Page title (Fraunces, 32px)
2. Short description (1 line, `text-fg-2`)
3. Tag filter bar (horizontal)
4. Source filter: All / First-party / Via Medium
5. Post list (date-sorted, newest first)
6. Pagination or "Load more" (soft scroll preferred)

**Local MDX frontmatter:**
```yaml
---
title: "Designing data pipelines that don't lie to you"
date: "2025-04-12"
updated: "2025-04-15"           # optional
excerpt: "..."
tags: ["backend", "data engineering"]
published: true
readTime: 8                      # minutes — auto-calculated preferred
canonical: null                  # null = this site is canonical
coverImage: null                 # optional OG image
---
```

---

## Article Page Design

Structure:
```
[ Back link: ← Writing ]
[ Category label (accent, uppercase) ]
[ Title (Fraunces, display scale) ]
[ Meta: date · read time · tags ]
[ Optional: cover image — full-width, 16:9, rounded-lg ]
[ Horizontal rule ]
[ Body: max-w-prose, body-lg, line-height 1.8 ]
[ In-article CTA (after ~60% of content) ]
[ Tags row ]
[ Prev/Next article navigation ]
[ Related posts (optional, 2 cards) ]
```

**Article body element rules:**
- `p`: max-width 68ch, body-lg (17px), leading-[1.8]
- `h2`: Fraunces, 22px, mt-10 mb-4
- `h3`: Plus Jakarta Sans, 18px, semibold, mt-8 mb-3
- `blockquote`: left-border 3px accent, italic Fraunces, pl-5, `text-fg-2`
- `ul/ol`: pl-5, gap-1 between items, body size
- `img`: full-width (100%), rounded-lg, `shadow-sm`
- `code`: inline — `font-mono bg-sunken border border-border rounded text-[0.875em] px-1.5 py-0.5`
- `pre > code`: code block (see component spec above)
- `hr`: `border-t border-border my-10`
- `a`: `text-accent underline underline-offset-2 hover:text-accent-h`
- `strong`: `font-semibold text-fg` (slightly stronger than surrounding text)

---

## Project / Case Study Page

```
[ Back link ]
[ Project title (Fraunces H1) ]
[ Meta: status · stack · role · year ]
[ 1-paragraph summary ]
[ Cover/screenshot — full-width ]
[ Horizontal rule ]
[ Body: same rules as article ]
[ Tech stack section: inline tags ]
[ Links: GitHub / Live / Post-mortem ]
```

---

## Technical Visuals

**Code snippets:** Always in code blocks with language label. Never bare text.

**Diagrams:**
- Preferred: Excalidraw or Mermaid (via `@next/mdx` plugin)
- Style: `bg-raised border border-border rounded-lg p-6` wrapper
- Dark mode: diagram uses light background with `dark:invert` if PNG, or proper dark theme if SVG
- Never: screenshots of Figma diagrams, photos of whiteboards

**Screenshots:**
- Full-width, `rounded-lg border border-border shadow-sm`
- Caption: `text-xs text-fg-3 text-center mt-2 italic`
- Dark mode: native dark screenshots preferred; light screenshots get a subtle bg wrapper

**Terminal / command blocks:**
- Treat as code blocks with `language: bash` or `language: shell`
- Dark background always (even in light mode) — `bg-stone-900 text-stone-100`

---

## Motion / Interaction Rules

**Philosophy:** Animations aid comprehension, not decoration. Every animation has a purpose.

**Rules:**
- Page transitions: `opacity 0→1`, 200ms, ease-out. No slide-ins.
- Hover on rows/links: opacity shift (0.72) or color shift only. 120ms.
- Hover on cards: shadow lift + border-color. 150ms ease-out.
- Button press: `scale(0.97)`, 80ms.
- Command menu: `scale(0.95) opacity(0) → scale(1) opacity(1)`, 150ms.
- Dark mode toggle: no flash. Use `next-themes` with `suppressHydrationWarning`.
- **No:** scroll-triggered animations, typing effects, bouncy springs, parallax.
- **Respect `prefers-reduced-motion`:** wrap all transitions in `@media (prefers-reduced-motion: no-preference)`.

---

## Accessibility Requirements

- **Color contrast:** All text meets WCAG AA (4.5:1 for body, 3:1 for large). Accent green on white: check — use `#047857` (light) not `#059669` if failing. Accent on dark: `#34D399` on `#0C0A09` = ~10:1 ✓
- **Focus rings:** `outline: 2px solid var(--accent)`, `outline-offset: 2px`. Visible on all interactive elements.
- **Keyboard navigation:** Tab order matches visual order. Command menu fully keyboard-navigable.
- **Skip link:** `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to content</a>`
- **Semantic HTML:** `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` used correctly.
- **Alt text:** All images have descriptive alt. Decorative images: `alt=""`.
- **Link text:** Never "click here". Always descriptive.
- **Font size:** Minimum 14px for any rendered text. Never below.
- **Line height:** Minimum 1.5 for body text.
- **Touch targets:** Minimum 44×44px on mobile.

---

## ICONOGRAPHY

**System:** Lucide React (`lucide-react`) — 1.5px stroke, 24px default, consistent with the design's clean lines.

**CDN for prototypes:** `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`

**Social brand icons:** Simple Icons SVGs (github, twitter, linkedin) — self-hosted in `public/icons/` for performance.

**Icon sizes:**
- Navigation / UI: 16–18px
- Card icons: 18–20px
- Section decoration: 24px
- Never: icon fonts, emoji as icons, hand-rolled SVG illustrations

**Usage rules:**
- Icons always accompany text (never icon-only without aria-label)
- `text-fg-3` default, `text-fg-2` on hover
- Never use icon colors that differ from text color (no random colored icons)

---

## File Index

```
README.md                    ← You are here (v2)
SKILL.md                     ← Agent skill definition
colors_and_type.css          ← CSS custom properties (updated v2)

assets/
  icons/                     ← Lucide SVGs + social brand marks

preview/
  colors-brand.html          ← Green scale + warm neutrals
  colors-semantic.html       ← Light mode semantic tokens
  colors-dark.html           ← Dark mode palette (stronger v2)
  type-scale.html            ← Full type scale specimen
  type-specimens.html        ← Article typography in context
  spacing-tokens.html        ← Spacing scale
  shadows-radii.html         ← Shadow system + radii
  components-buttons.html    ← Button states
  components-links-tags.html ← Links, tags, badges
  components-nav.html        ← Navigation bar
  components-cards.html      ← Article + project cards
  components-article.html    ← Article page typography
  components-cta.html        ← CTA + newsletter blocks
  components-code.html       ← Code blocks (light + dark)
  components-medium.html     ← Medium integration UI states (NEW)
  components-command.html    ← Command menu (NEW)

ui_kits/
  website/
    index.html               ← Interactive prototype (v2)
    README.md
    (components inlined in index.html)
```
