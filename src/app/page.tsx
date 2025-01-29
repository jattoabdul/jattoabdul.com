import { Typography } from '@components/ui/Typography/demo';
import { IconDemo } from '@components/ui/Icons/demo';
import { ButtonDemo } from '@components/ui/Button/demo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section goes in here */}
      <Typography />
      <IconDemo />
      <ButtonDemo />
    </main>
  );
}
