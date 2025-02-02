import type { Metadata } from 'next';
import { ThemeContent } from './theme-content';

export const metadata: Metadata = {
  title: 'Jatto Abdul | Site Component Library',
  description: 'A showcase of our design system and component library',
};

export default function ThemePage() {
  return <ThemeContent />;
}
