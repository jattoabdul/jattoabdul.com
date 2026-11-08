import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CinematicPrototype } from './prototype';

export const metadata: Metadata = {
  title: 'The Open Door · Motion study',
  robots: { index: false, follow: false },
};

// Historical motion study: available in local and staging builds, not in indexable production.
export default function CinematicPage() {
  if (process.env.SEO_INDEXABLE === 'true') notFound();
  return <CinematicPrototype />;
}
