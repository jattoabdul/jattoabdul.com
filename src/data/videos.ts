/**
 * Local video data — used when the YouTube channel feed is disabled or fails.
 * When NEXT_PUBLIC_ENABLE_YOUTUBE_FEED=true and YOUTUBE_CHANNEL_ID is set,
 * `getVideoFeed()` (in src/lib/videos.ts) replaces this with the live feed.
 *
 * Shorts have no clean public feed across LinkedIn / X / Instagram /
 * YouTube Shorts, so we keep them as a manually curated array. Add new
 * entries below — newest first.
 */

export type VideoKind = 'Long-form' | 'Talk' | 'Tutorial';

export type Video = {
  id: string;
  title: string;
  /** Display string, e.g. "18:24". Optional when sourced from YouTube RSS (no duration in feed). */
  duration?: string;
  /** ISO date or YYYY-MM */
  date: string;
  kind: VideoKind;
  platform: 'YouTube';
  href?: string;
  thumbnail?: string;
};

export type ShortPlatform = 'Shorts' | 'LinkedIn' | 'X' | 'Instagram' | 'YouTube';
export type ShortKind = 'video' | 'image' | 'audio' | 'text';

/**
 * Short-form social content. Single canonical type covers video shorts,
 * image posts, audio clips, and text posts (X / LinkedIn) — the original
 * formats people actually publish on social.
 *
 * - `href` (recommended): direct link to the post on its platform.
 * - `media` (optional): URL to the underlying media (video file, image,
 *   audio). Used as the thumbnail / poster. For platforms that block hotlinks
 *   to social media (LinkedIn, X), prefer self-hosting the thumbnail under
 *   /public and pointing `media` at it.
 * - `excerpt` (optional): for `kind: 'text'`, the post text. For others,
 *   a short caption shown under the title.
 * - `duration` (optional): only meaningful for video / audio.
 */
export type Short = {
  id: string;
  kind: ShortKind;
  title: string;
  platform: ShortPlatform;
  href?: string;
  media?: string;
  excerpt?: string;
  duration?: string;
  publishedAt?: string;
};

export const videos: Video[] = [
  {
    id: 'placeholder-1',
    title: 'Designing for partial connectivity: an African engineering perspective',
    duration: '18:24',
    date: '2026-04',
    kind: 'Long-form',
    platform: 'YouTube',
    href: 'https://www.youtube.com/@jatto_abdul',
  },
  {
    id: 'placeholder-2',
    title: 'How I structure prompts for production LLM features',
    duration: '11:02',
    date: '2026-03',
    kind: 'Long-form',
    platform: 'YouTube',
    href: 'https://www.youtube.com/@jatto_abdul',
  },
  {
    id: 'placeholder-3',
    title: 'Reading a senior-engineer job description like a staff engineer',
    duration: '07:48',
    date: '2026-02',
    kind: 'Long-form',
    platform: 'YouTube',
    href: 'https://www.youtube.com/@jatto_abdul',
  },
];

export const shorts: Short[] = [
  {
    id: 's1',
    kind: 'video',
    title: 'One question that filters bad architecture decisions',
    platform: 'YouTube',
    duration: '0:48',
    href: 'https://www.youtube.com/@jatto_abdul',
  },
  {
    id: 's2',
    kind: 'text',
    title: 'The invariant rule I write at the top of every service',
    platform: 'LinkedIn',
    excerpt:
      'Every service starts with a comment block listing the invariants it must hold. If a PR breaks one, the comment forces the conversation early.',
    href: 'https://linkedin.com/in/jattoade',
  },
  {
    id: 's3',
    kind: 'text',
    title: 'Why I review my own PRs before requesting reviews',
    platform: 'X',
    excerpt:
      'Open the PR, walk away ten minutes, then read it like a stranger. Half the comments your reviewer would leave, you catch yourself.',
    href: 'https://x.com/Jattorize',
  },
  {
    id: 's4',
    kind: 'video',
    title: 'A small habit that makes pairing 2× more useful',
    platform: 'Instagram',
    duration: '0:38',
    href: 'https://www.instagram.com/jatto_abdul/',
  },
];
