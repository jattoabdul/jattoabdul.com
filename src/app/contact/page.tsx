import type { Metadata } from 'next';
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Rss,
  Twitter,
  Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { SectionLabel } from '@/components/site/SectionHeader';
import { TrackedLink } from '@/components/site/TrackedLink';
import { socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Jatto Abdul — email, LinkedIn, GitHub, X, and elsewhere.',
};

const channels: { icon: LucideIcon; label: string; href: string; handle?: string }[] = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: socials.linkedin.href,
    handle: socials.linkedin.handle,
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: socials.youtube.href,
    handle: socials.youtube.handle,
  },
  { icon: Twitter, label: 'X / Twitter', href: socials.x.href, handle: socials.x.handle },
  { icon: Github, label: 'GitHub', href: socials.github.href, handle: socials.github.handle },
  {
    icon: Instagram,
    label: 'Instagram',
    href: socials.instagram.href,
    handle: socials.instagram.handle,
  },
  { icon: Rss, label: 'Medium', href: socials.medium.href, handle: socials.medium.handle },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Say hi. <span className="italic text-fg-2">I read everything.</span>
          </>
        }
        intro="The fastest way to reach me is email. I usually reply within a few days. For everything else, I'm reachable on the platforms below."
      />
      <Container width="text">
        <TrackedLink
          href={socials.email.href}
          label="Email"
          className="mb-7 flex items-center gap-3.5 rounded-md border border-accent-mid bg-bg-accent p-5 text-fg no-underline transition-colors hover:border-accent"
        >
          <Mail className="size-5 text-accent" />
          <div className="flex-1">
            <div className="mb-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
              Email
            </div>
            <div className="font-mono text-[16px] font-medium text-fg">{socials.email.handle}</div>
          </div>
          <ArrowUpRight className="size-4 text-accent" />
        </TrackedLink>

        <SectionLabel className="mb-3.5 block">Elsewhere</SectionLabel>
        <div className="overflow-hidden rounded-md border border-border">
          {channels.map(({ icon: Icon, label, href, handle }, i) => (
            <TrackedLink
              key={label}
              href={href}
              label={label}
              target="_blank"
              rel="noopener noreferrer"
              className={`grid grid-cols-[28px_1fr_auto_auto] items-center gap-3.5 bg-bg-surface px-4 py-3.5 text-fg no-underline transition-colors hover:bg-bg-raised ${
                i !== channels.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <Icon className="size-4 text-fg-3" />
              <span className="text-[14.5px] font-medium text-fg">{label}</span>
              <span className="font-mono text-[12.5px] text-fg-3">{handle}</span>
              <ArrowUpRight className="size-3.5 text-fg-3" />
            </TrackedLink>
          ))}
        </div>
      </Container>
    </main>
  );
}
