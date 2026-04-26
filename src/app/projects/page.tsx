import type { Metadata } from 'next';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects by Jatto Abdul — backend, platform, and applied-AI systems shipped or in flight.',
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        width="wide"
        eyebrow="Projects"
        title={
          <>
            Selected work <span className="italic text-fg-2">and ongoing builds.</span>
          </>
        }
        intro="A handful of products and platforms I've built or contributed to. Most are commercial; the experiments are public-safe."
      />
      <Container width="wide">
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </main>
  );
}
