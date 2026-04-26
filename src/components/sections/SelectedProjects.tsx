import { Container } from '@/components/site/Container';
import { SectionHeader } from '@/components/site/SectionHeader';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';

export function SelectedProjects() {
  return (
    <section className="border-b border-border py-16">
      <Container width="wide">
        <SectionHeader
          eyebrow="Selected projects"
          title="Things I've built"
          action={{ label: 'See all', href: '/projects' }}
        />
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
