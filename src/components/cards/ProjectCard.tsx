'use client';

import Link from 'next/link';
import posthog from 'posthog-js';

import type { Project } from '@/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon;

  function handleClick() {
    posthog.capture('project_card_clicked', {
      slug: project.slug,
      title: project.title,
      status: project.status,
    });
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-3 rounded-md border border-border bg-bg-surface p-5 shadow-sm transition-all hover:border-border-mid hover:shadow-md"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-md border border-accent-mid bg-accent-light">
          <Icon className="size-[17px] text-accent" />
        </div>
        <span className="rounded-full border border-border bg-bg-raised px-2.5 py-0.5 font-mono text-[11px] font-medium text-fg-3">
          {project.status}
        </span>
      </div>
      <div>
        <h3 className="mb-1 text-[15px] font-semibold leading-snug text-fg">{project.title}</h3>
        <p className="mb-1 text-[13px] leading-[1.55] text-fg-2">{project.tagline}</p>
        <p className="font-mono text-[12.5px] text-fg-3">
          {project.role} · {project.year}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {project.stack.slice(0, 3).map(s => (
          <span
            key={s}
            className="rounded border border-border bg-bg-raised px-1.5 py-0.5 font-mono text-[10.5px] text-fg-3"
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}
