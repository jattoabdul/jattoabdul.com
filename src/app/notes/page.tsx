import type { Metadata } from 'next';

import { Container } from '@/components/site/Container';
import { PageHeader } from '@/components/site/PageHeader';
import { NotesIndex } from '@/components/site/NotesIndex';

export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Field notes from Jatto Abdul: short observations, build notes, and engineering lessons.',
};

export default function NotesPage() {
  return (
    <main id="main-content" className="pb-16">
      <PageHeader
        eyebrow="Field notes"
        title={
          <>
            Notes <span className="italic text-fg-2">in progress.</span>
          </>
        }
        intro="Short observations, build notes, and engineering lessons. Less polished than essays — an active thinking archive."
      />
      <Container width="text">
        <NotesIndex />
      </Container>
    </main>
  );
}
