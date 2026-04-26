export type SocialKey =
  | 'linkedin'
  | 'medium'
  | 'github'
  | 'x'
  | 'youtube'
  | 'instagram'
  | 'email'
  | 'rss';

export type SocialEntry = {
  label: string;
  href: string;
  handle?: string;
};

export const siteConfig = {
  name: 'Jatto Abdul',
  shortName: 'Jatto',
  url: 'https://jattoabdul.com',
  positioning:
    'Senior Software Engineer building backend, platform, and applied-AI systems. I write about practical engineering, AI-assisted product building, and communication for engineers.',
  description:
    'Jatto Abdul — Senior Software Engineer building backend, platform, and applied-AI systems. Writing about practical engineering, AI-assisted product building, and communication for engineers.',
  copyrightYear: 2026,
  newsletterEnabled: true,
} as const;

export const socials: Record<SocialKey, SocialEntry> = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jattoade',
    handle: '@jattoade',
  },
  medium: {
    label: 'Medium',
    href: 'https://medium.com/@jattoade',
    handle: '@jattoade',
  },
  github: {
    label: 'GitHub',
    href: 'https://github.com/jattoabdul',
    handle: '@jattoabdul',
  },
  x: {
    label: 'X / Twitter',
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

export const primaryNav: NavItem[] = [
  { label: 'Writing', href: '/writing' },
  { label: 'Notes', href: '/notes' },
  { label: 'Projects', href: '/projects' },
  { label: 'Videos', href: '/videos' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
