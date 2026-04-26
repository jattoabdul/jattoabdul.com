import Link from 'next/link';
import { Github, Linkedin, Rss, Twitter, Youtube } from 'lucide-react';

import { siteConfig, socials } from '@/data/site';
import { Wordmark } from './Wordmark';

const socialLinks = [
  { key: 'github', icon: Github, href: socials.github.href, label: socials.github.label },
  { key: 'x', icon: Twitter, href: socials.x.href, label: socials.x.label },
  {
    key: 'linkedin',
    icon: Linkedin,
    href: socials.linkedin.href,
    label: socials.linkedin.label,
  },
  { key: 'youtube', icon: Youtube, href: socials.youtube.href, label: socials.youtube.label },
  { key: 'rss', icon: Rss, href: '/rss.xml', label: 'RSS feed' },
] as const;

const linkGroups: { label: string; links: { label: string; href: string }[] }[] = [
  {
    label: 'Site',
    links: [
      { label: 'Writing', href: '/writing' },
      { label: 'Notes', href: '/notes' },
      { label: 'Projects', href: '/projects' },
      { label: 'Videos', href: '/videos' },
    ],
  },
  {
    label: 'More',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Newsletter', href: '/contact' },
      { label: 'Medium', href: socials.medium.href },
    ],
  },
  {
    label: 'Topics',
    links: [
      { label: 'Backend', href: '/writing?tag=backend' },
      { label: 'Applied AI', href: '/writing?tag=applied-ai' },
      { label: 'Platform', href: '/writing?tag=platform' },
      { label: 'Career', href: '/writing?tag=career' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-bg-raised">
      <div className="mx-auto max-w-wide px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[280px]">
            <Wordmark size="sm" className="mb-3" />
            <p className="mb-4 text-[13.5px] leading-[1.7] text-fg-2">
              Senior software engineer. Writing about backend, platform, and applied-AI systems —
              and the engineering judgment around them.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ key, icon: Icon, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="text-fg-3 transition-colors hover:text-fg"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-12">
            {linkGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-2.5">
                <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-3">
                  {group.label}
                </div>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13.5px] text-fg-2 transition-colors hover:text-fg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
          <span className="font-mono text-[12px] text-fg-3">
            © {siteConfig.copyrightYear} {siteConfig.name} · jattoabdul.com
          </span>
          <span className="font-mono text-[12px] text-fg-3">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
