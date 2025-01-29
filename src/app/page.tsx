import { TestComponent } from '@components/test/component';
import { IconDemo } from '@components/ui/Icons/demo';
import { ButtonDemo } from '@components/ui/Button/demo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section goes in here */}
      <TestComponent />
      <IconDemo />
      <ButtonDemo />
    </main>
  );
}
