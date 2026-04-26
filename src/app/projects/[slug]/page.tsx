import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Container } from '@/components/site/Container';
import { SectionLabel } from '@/components/site/SectionHeader';
import { getProject, projects } from '@/data/projects';

type RouteParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: RouteParams) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const Icon = p.icon;
  const meta: [string, string][] = [
    ['Role', p.role],
    ['Year', p.year],
    ['Status', p.status],
  ];

  return (
    <main id="main-content" className="pb-16 pt-12 sm:pt-14">
      <Container width="text">
        <Link
          href="/projects"
          className="mb-9 inline-flex items-center gap-1.5 font-mono text-[13.5px] text-fg-3 transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" /> projects
        </Link>

        <div className="mb-5 flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-md border border-accent-mid bg-accent-light">
            <Icon className="size-[22px] text-accent" />
          </div>
          <span className="rounded-full border border-border bg-bg-raised px-2.5 py-0.5 font-mono text-[11px] font-medium text-fg-3">
            {p.status}
          </span>
        </div>

        <h1 className="mb-3 font-serif text-[clamp(2rem,4.6vw,2.6rem)] font-normal leading-[1.1] tracking-[-0.024em] text-fg">
          {p.title}
        </h1>
        <p className="mb-7 font-serif text-[20px] font-light italic leading-[1.45] text-fg-2">
          {p.tagline}
        </p>

        <div className="mb-9 grid gap-px overflow-hidden rounded-md border border-border bg-border [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
          {meta.map(([k, v]) => (
            <div key={k} className="bg-bg-surface p-4">
              <div className="mb-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-fg-3">
                {k}
              </div>
              <div className="text-[14px] font-medium text-fg">{v}</div>
            </div>
          ))}
        </div>

        <hr className="mb-8 border-t border-border" />

        <p className="mb-5 text-[17px] leading-[1.85] text-fg">{p.description}</p>
        <p className="mb-9 text-[17px] leading-[1.85] text-fg-2">
          A longer case study lives behind this page — what we built, the tradeoffs, what I&apos;d
          do differently. Coming soon.
        </p>

        <SectionLabel className="mb-3 block">Stack</SectionLabel>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-border bg-bg-raised px-2.5 py-1 font-mono text-[12px] text-fg-2"
            >
              {s}
            </span>
          ))}
        </div>
      </Container>
    </main>
  );
}
