import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/site/Container';

export const metadata: Metadata = {
  title: 'Building',
  description: 'Ventures, engineering, projects, and what Jatto Abdul is building now.',
  robots: { index: false, follow: false },
};

/** Room stub for the redesign branch. The room is designed in a later round. */
export default function BuildingPage() {
  return (
    <main id="main-content" className="py-20">
      <Container width="text">
        <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.08] tracking-tight">
          Building
        </h1>
        <p className="mt-6 text-[18px] leading-[1.65] text-fg-2">
          Ventures, engineering, and projects: the built side. This room is designed in a later
          round. For now the archive lives at{' '}
          <Link href="/projects" className="font-semibold text-accent">
            /projects
          </Link>{' '}
          and{' '}
          <Link href="/notes" className="font-semibold text-accent">
            /notes
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
