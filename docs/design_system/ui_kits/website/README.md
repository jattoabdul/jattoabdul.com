# Website UI Kit — jattoabdul.com

## Overview
High-fidelity component kit and interactive prototype for Jatto Abdul's personal site. Built with React + Babel (no bundler required), styled with CSS custom properties from `../../colors_and_type.css`.

## Design Width
960px wide container, 1280px outer shell. Readable at any viewport width.

## Components

| File | Description |
|---|---|
| `Header.jsx` | Sticky nav with wordmark, desktop links, mobile hamburger |
| `Hero.jsx` | Homepage hero with headline, sub-copy, CTAs, content pillars |
| `WritingList.jsx` | Horizontal post list with category, title, excerpt, date |
| `ProjectCard.jsx` | Project card with icon, title, desc, tech tags |
| `Footer.jsx` | Two-column footer with nav links, social links, tagline |
| `ArticlePage.jsx` | Full article layout: header, body, blockquote, code block, CTA |
| `NotesIndex.jsx` | Filterable notes/archive index with tag filters |

## Pages in the Prototype
- **Home** — Hero + writing list + projects + newsletter CTA + footer
- **Article** — Full reading page with code blocks and inline CTA
- **Notes** — Filterable notes index

## Usage in Next.js / Tailwind
All components use CSS custom properties matching `tailwind.config.js` entries documented in `../../colors_and_type.css`. To port:
1. Copy token values into your Tailwind config
2. Convert inline styles to Tailwind utility classes
3. Each component maps cleanly to a single React component file

## Font Setup (Next.js)
```js
// app/layout.tsx
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google'
const serif = Instrument_Serif({ subsets: ['latin'], weight: ['400'], style: ['normal','italic'] })
const sans  = Inter({ subsets: ['latin'], weight: ['400','500','600','700'] })
const mono  = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'] })
```
