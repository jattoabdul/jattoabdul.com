import { Github, Instagram, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { SectionLabel } from '@/components/site/SectionHeader';
import { socials } from '@/data/site';

const followLinks: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Linkedin, label: 'LinkedIn', href: socials.linkedin.href },
  { icon: Youtube, label: 'YouTube', href: socials.youtube.href },
  { icon: Twitter, label: 'X / Twitter', href: socials.x.href },
  { icon: Github, label: 'GitHub', href: socials.github.href },
  { icon: Instagram, label: 'Instagram', href: socials.instagram.href },
  { icon: Mail, label: 'Email', href: socials.email.href },
];

export function ConnectSection() {
  return (
    <section className="border-b border-accent-mid bg-bg-accent py-16">
      <Container width="text" className="text-center">
        <SectionLabel className="mb-4 block">Or follow along</SectionLabel>
        <div className="flex flex-wrap justify-center gap-2.5">
          {followLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-surface px-3.5 py-2 text-[13.5px] font-medium text-fg-2 transition-colors hover:border-border-mid hover:text-fg"
            >
              <Icon className="size-3.5 text-fg-3" />
              {label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
