export type SocialKey =
  | 'linkedin'
  | 'medium'
  | 'github'
  | 'x'
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'email'
  | 'rss';

export type SocialEntry = {
  label: string;
  href: string;
  handle?: string;
};

/**
 * Site copy and configuration. Public copy follows the front door
 * (command-center/notes/content/brand/positioning.md, v2.0): the label lives in metadata
 * keywords, About, Press, and the footer descriptor, never in the first sentence.
 */
export const siteConfig = {
  name: 'Jatto Abdul',
  shortName: 'Jatto',
  url: 'https://jattoabdul.com',
  positioning:
    'An engineer and entrepreneur who mentors young people on career, character, and faith, so they can grow without losing themselves.',
  // SEO description. Front-door wording (owner ruling 2026-09-05).
  description:
    'An engineer and entrepreneur writing, speaking, and making videos for young people carrying ambition and faith at the same time.',
  // Combined with siteConfig.name in the layout as "Jatto Abdul · <suffix>".
  titleSuffix: 'Engineer. Entrepreneur. Mentor. Author.',
  copyrightYear: 2026,
  newsletterEnabled: true,
  resumeUrl: '/resume.pdf' as string | null,
} as const;

/** Arrival copy, locked in website.md (2026-09-05). */
export const arrival = {
  headlineLead: 'Grow without',
  headlineEmphasis: 'losing yourself.',
  supporting:
    'An engineer and entrepreneur writing, speaking, and making videos for young people carrying ambition and faith at the same time.',
  identity: 'Engineer × Entrepreneur × Mentor × Author',
  identityPlain: 'Engineer. Entrepreneur. Mentor. Author.',
  startLabel: 'Start here',
  // The latest video on the Jatto Abdul channel (feed replaces this in a later round).
  startHref: 'https://www.youtube.com/watch?v=3laKATXgM08',
  comeInLabel: 'Come on in',
} as const;

/** The room behind the door. */
export const door = {
  body: "Whether it's faith, career, building, or a question you've been sitting on, my door is open. Write to me and I'll reply myself.",
  secondYouTube: { label: 'YouTube', href: 'https://www.youtube.com/@jatto_abdul' },
  secondInstagram: { label: '@jatto_abdul', href: 'https://www.instagram.com/jatto_abdul/' },
} as const;

export const socials: Record<SocialKey, SocialEntry> = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jattoade/',
    handle: '@jattoade',
  },
  medium: {
    label: 'Medium',
    href: 'https://medium.com/@jattoabdul',
    handle: '@jattoabdul',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/jattoabdul',
    handle: '@jattoabdul',
  },
  x: {
    label: 'X',
    href: 'https://x.com/Jattorize',
    handle: '@Jattorize',
  },
  youtube: {
    label: 'YouTube',
    href: 'https://www.youtube.com/@jatto_abdul',
    handle: '@jatto_abdul',
  },
  instagram: {
    label: 'Instagram',
    href: 'https://www.instagram.com/jatto_abdul/',
    handle: '@jatto_abdul',
  },
  tiktok: {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@jatto_abdul',
    handle: '@jatto_abdul',
  },
  email: {
    label: 'Email',
    href: 'mailto:me@jattoabdul.com',
    handle: 'me@jattoabdul.com',
  },
  rss: {
    label: 'RSS',
    href: '/rss.xml',
  },
};

export type NavItem = { label: string; href: string };

/** Header rooms, locked order (website.md, 2026-09-05). */
export const rooms: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Writing', href: '/writing' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Building', href: '/building' },
  { label: 'Mentoring', href: '/mentoring' },
];

/** @deprecated The header uses `rooms`. Kept until the footer and pages are redesigned. */
export const primaryNav: NavItem[] = rooms;
