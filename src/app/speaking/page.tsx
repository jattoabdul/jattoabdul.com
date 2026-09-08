import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/site/Container';

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Videos, talks, panels, and podcast appearances by Jatto Abdul.',
  robots: { index: false, follow: false },
};

/** Room stub for the redesign branch. The room is designed in a later round. */
export default function SpeakingPage() {
  return (
    <main id="main-content" className="py-20">
      <Container width="text">
        <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.08] tracking-tight">
          Speaking
        </h1>
        <p className="mt-6 text-[18px] leading-[1.65] text-fg-2">
          Videos, talks, panels, and podcast appearances: the spoken side. This room is designed in
          a later round. The current video library is at{' '}
          <Link href="/videos" className="font-semibold text-accent">
            /videos
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
