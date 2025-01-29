import { Typography } from '@components/ui/Typography/demo';
import { IconDemo } from '@components/ui/Icons/demo';
import { ButtonDemo } from '@components/ui/Button/demo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jatto Abdul | Site Component Library',
};

export default function Theme() {
  return (
    <main className="min-h-screen">
      <Typography />
      <IconDemo />
      <ButtonDemo />
    </main>
  );
}
