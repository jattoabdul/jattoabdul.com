import type { Metadata } from 'next';

import { Container } from '@/components/site/Container';

export const metadata: Metadata = {
  title: 'Mentoring',
  description: 'Guidance pieces, the limited free 1:1, and audience questions answered in public.',
  robots: { index: false, follow: false },
};

/** Room stub for the redesign branch. The room is designed in a later round. */
export default function MentoringPage() {
  return (
    <main id="main-content" className="py-20">
      <Container width="text">
        <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.08] tracking-tight">
          Mentoring
        </h1>
        <p className="mt-6 text-[18px] leading-[1.65] text-fg-2">
          Guidance pieces, the limited free 1:1, and questions answered in public: the people side.
          This room is designed in a later round.
        </p>
      </Container>
    </main>
  );
}
