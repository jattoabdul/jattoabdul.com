import type { Metadata } from 'next';
import { CinematicPrototype } from './prototype';

export const metadata: Metadata = {
  title: 'The Open Door · Motion study',
  robots: { index: false, follow: false },
};

export default function CinematicPage() {
  return <CinematicPrototype />;
}
