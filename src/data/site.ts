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
  // SEO description — kept in the 110–160 char sweet spot so social previews
  // don't truncate. Update both this and siteConfig.titleSuffix together.
  description:
    'Senior Software Engineer building backend, platform, and applied-AI systems. Writing about practical engineering and AI-assisted product building.',
  // Title suffix — combined with siteConfig.name in the layout, this keeps
  // the rendered <title> in the 50–60 char range that opengraph.xyz prefers.
  titleSuffix: 'Senior Engineer · Backend, Platform, Applied-AI',
  copyrightYear: 2026,
  newsletterEnabled: true,
  /**
   * Public resume.
   *
   * - `url`: drop the PDF at /public/resume.pdf and the link below resolves
   *   to /resume.pdf. To host externally (Read.cv, Notion, Google Drive),
   *   replace with the absolute URL.
   * - Set to `null` to hide the Resume CTA everywhere.
   */
  resumeUrl: '/resume.pdf' as string | null,
} as const;

export const socials: Record<SocialKey, SocialEntry> = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jattoade',
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
