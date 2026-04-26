import type { Metadata } from 'next';
import { Github, Linkedin, Mail, Rss } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { socials } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Jatto Abdul — senior software engineer building backend, platform, and applied-AI systems.',
};

const operatingStyle = [
  'I write down assumptions before writing code. Most bugs are assumption bugs.',
  'I prefer boring, durable architecture and reach for novelty only when boring genuinely doesn’t fit.',
  'I instrument early. If I can’t see what the system is doing, I haven’t finished building it.',
  'I review my own PRs first. The fastest way to get useful feedback is to delete my own weak ideas before someone else has to.',
  'I explain the tradeoff, not just the decision. Good engineering is usually a record of what we chose, what we rejected, and why.',
  'I build in public where it makes sense. Thinking out loud helps me find the parts of an idea that don’t actually work.',
];

const links: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Mail, label: 'Email', href: socials.email.href },
  { icon: Linkedin, label: 'LinkedIn', href: socials.linkedin.href },
  { icon: Github, label: 'GitHub', href: socials.github.href },
  { icon: Rss, label: 'RSS', href: '/rss.xml' },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        eyebrow="About"
        title={
          <>
            How I think, build, <span className="italic text-fg-2">and write.</span>
          </>
        }
      />
      <Container width="text">
        <p className="mb-5 text-[17px] leading-[1.85] text-fg">
          I&apos;m Jatto Abdul, a senior software engineer building backend, platform, product,
          and applied-AI systems.
        </p>
        <p className="mb-5 text-[17px] leading-[1.85] text-fg-2">
          My work sits in the messy middle where product ideas become real software: APIs, data
          flows, search and reporting workflows, integrations, caching, deployment, and the
          judgment calls that keep systems understandable as they grow.
        </p>
        <p className="mb-5 text-[17px] leading-[1.85] text-fg-2">
          I think in systems: boundaries, contracts, observability, blast radius, and the people
          who have to operate the thing after it ships. I care about communication as much as code
          because most technical problems get easier when the assumptions are visible.
        </p>
        <p className="mb-5 text-[17px] leading-[1.85] text-fg-2">
          That is also why I write and create. Writing, videos, and public notes help me turn real
          engineering work into clearer lessons: what I tried, what broke, what worked, and what I
          would do differently next time.
        </p>

        <h2 className="mt-9 mb-3.5 font-serif text-[22px] font-normal tracking-tight text-fg">
          Operating style
        </h2>
        <ul className="mb-7 flex flex-col gap-3 pl-5 [&>li]:list-disc">
          {operatingStyle.map((line) => (
            <li key={line} className="text-[16px] leading-[1.75] text-fg-2">
              {line}
            </li>
          ))}
        </ul>

        <h2 className="mt-7 mb-3.5 font-serif text-[22px] font-normal tracking-tight text-fg">
          Open to
        </h2>
        <p className="mb-9 text-[16px] leading-[1.75] text-fg-2">
          Senior and staff-level engineering roles, advisory work with engineering-led teams, and
          collaborations around backend, platform, product, and applied-AI systems. I&apos;m
          especially interested in teams that value clear thinking, durable software, and
          products that respect users.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-surface px-3.5 py-2.5 text-[14px] font-medium text-fg-2 transition-colors hover:border-border-mid hover:text-fg"
            >
              <Icon className="size-3.5 text-fg-3" /> {label}
            </a>
          ))}
        </div>
      </Container>
    </main>
  );
}
