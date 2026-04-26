# jattoabdul.com

Personal website and publishing home for [Jatto Abdul](https://jattoabdul.com)
— senior software engineer, builder, writer, and creator.

> Senior Software Engineer building backend, platform, and applied-AI systems.
> I write about practical engineering, AI-assisted product building, and
> communication for engineers.

Built with Next.js 15 (App Router) + React 19 + TypeScript + Tailwind 3.

---

## Quick start

```bash
nvm use                # picks up .nvmrc / .tool-versions (Node 22.13.0)
cp env.example .env.local
npm install
npm run dev            # http://localhost:3005 (or PORT in .env.local)
```

That's it. The site renders end-to-end with no external services configured —
Medium feed, YouTube feed, and Resend all degrade gracefully when their env
vars are missing.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev with Turbopack. |
| `npm run build` | Production build (used by Railway). |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint via `next lint`. |
| `npm run type-check` | `tsc --noEmit` only — no emit. |

## Project layout

```
src/
├── app/                       # Next.js App Router routes + metadata
│   ├── api/{health,subscribe}/route.ts
│   ├── writing/[slug]/        # First-party article pages
│   ├── notes/[slug]/          # Field-note pages
│   ├── projects/[slug]/       # Project case-study pages
│   ├── opengraph-image.tsx    # Programmatic OG image
│   ├── icon.tsx               # Programmatic favicon
│   ├── rss.xml/route.ts       # RSS 2.0 feed
│   ├── sitemap.ts, robots.ts  # SEO
│   └── layout.tsx, page.tsx
├── components/
│   ├── site/                  # Header, Footer, Container, CommandMenu, ...
│   ├── sections/              # Homepage section blocks
│   └── cards/                 # PostRow, ProjectCard, VideoCard, NoteRow
├── data/                      # Typed content — POSTS, NOTES, PROJECTS, VIDEOS, FOCUS, SOCIAL
├── lib/                       # Server-side fetchers + small utils
└── styles/globals.css         # Tailwind base + design tokens
```

Content lives under `src/data/`. The whole site is driven from those files —
no headless CMS, no DB.

## Setting up integrations

All optional. The site renders without any of them.

### Medium RSS sync

Pulls your published Medium articles into `/writing` and `/rss.xml`.

```bash
NEXT_PUBLIC_ENABLE_MEDIUM_FEED=true
```

The Medium handle is hard-coded in [src/lib/posts.ts](src/lib/posts.ts) — change it
there if your handle differs from `@jattoabdul`. Server-side fetch via
`api.rss2json.com`, ISR-cached for 1h, falls back to local posts on failure.

### YouTube channel feed

Pulls your most recent videos into the homepage and `/videos`.

```bash
NEXT_PUBLIC_ENABLE_YOUTUBE_FEED=true
YOUTUBE_CHANNEL_ID=UC...   # find via youtube.com/@your-handle → view source → "channelId"
```

Atom RSS, no API key needed. Gives title / link / thumbnail / date — but
no duration or view count (those need the YouTube Data API). Falls back to
the curated list in [src/data/videos.ts](src/data/videos.ts).

### Newsletter (Resend Audiences)

Wires `/api/subscribe` to add contacts to a Resend Audience.

```bash
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...     # from Resend → Audiences → New Audience
```

When either is missing, the endpoint stays in stub mode (returns 200) so the
form keeps working in dev.

### Hero variant

Two homepage hero variants ship: `terminal` (default) and `editorial`.

```bash
NEXT_PUBLIC_HERO_VARIANT=terminal   # build-time default
```

Runtime override (no rebuild): visit `/?hero=editorial` or run
`localStorage.setItem('hero', 'editorial'); location.reload();` from the
browser console.

## Common tasks

### Publish an article

1. Open [src/data/posts.ts](src/data/posts.ts).
2. Find a `published: false` draft (or add a new entry).
3. Fill out `body: PostBlock[]` — supports `p`, `h2`, `quote`, `code`.
4. Flip to `published: true`.

The post auto-appears on the homepage, in `/writing`, in `/rss.xml`, in the
sitemap, and at `/writing/<slug>`.

### Add a field note

In [src/data/notes.ts](src/data/notes.ts):

```ts
{
  slug: 'my-note',
  date: '2026-05-01',
  title: 'A short observation',
  tags: ['backend'],
  body: ['Paragraph one.', 'Paragraph two.'],   // omit for an "idea" entry
}
```

Notes with a `body` get their own page at `/notes/<slug>`. Notes without a
body still show in the index marked `IDEA` — useful as a public scratchpad.

### Add a video / short

Edit [src/data/videos.ts](src/data/videos.ts). For long-form videos, prefer
turning on the YouTube feed (above) so updates are automatic. Shorts stay
manually curated — they span LinkedIn, X, Instagram, and YouTube Shorts and
have no unified feed.

### Add a project

Append to `projects` in [src/data/projects.ts](src/data/projects.ts). Set
`status: 'Active' | 'Shipped' | 'Open Source' | 'Archived'`.

### Update social handles or positioning

[src/data/site.ts](src/data/site.ts) — `siteConfig`, `socials`, `primaryNav`.

## Design system

Colors, type scale, spacing, and component specs live in
[tailwind.config.ts](tailwind.config.ts) and
[src/styles/globals.css](src/styles/globals.css). Semantic tokens
(`--bg`, `--fg`, `--accent`, etc.) drive both light and dark modes.

Fonts: Fraunces (serif headings), Plus Jakarta Sans (body / UI), JetBrains
Mono (technical). All loaded via `next/font/google`.

## Deployment

Configured for [Railway](https://railway.app) via [railway.toml](railway.toml):

- Builder: Railpack (auto-detects Next.js)
- Healthcheck: `/api/health`
- Restart: ON_FAILURE, max 10 retries

Set the env vars you want enabled in **Railway → Service → Variables**, then
deploy. Custom domain (jattoabdul.com) is configured in **Settings → Domains**.

## Tech reference

- **Framework:** Next.js 15.5 (App Router, Turbopack dev)
- **UI:** React 19, Tailwind 3.4, lucide-react icons
- **Theme:** next-themes (class strategy, light default with dark toggle)
- **Command menu:** cmdk + @radix-ui/react-dialog (⌘K / Ctrl+K)
- **Newsletter:** resend (Audiences API)
- **Lint:** ESLint 9, eslint-config-next, prettier
- **Node:** 22.x (pinned via `.nvmrc` and `.tool-versions`)
- **Package manager:** npm (single source of truth via `package-lock.json`)

## Future improvements

Living checklist of non-urgent work: [docs/follow-ups.md](docs/follow-ups.md).

## Security

See [SECURITY.md](SECURITY.md). For sensitive reports, email
**me@jattoabdul.com** rather than opening a public issue.

## License

Code: [MIT](LICENSE). Written content (articles, notes, About copy,
positioning) is © Jatto Abdul, all rights reserved.
