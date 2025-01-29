import { TestComponent } from '@components/test/component';
import { IconDemo } from '@components/ui/Icons/icon-demo';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section goes in here */}
      <TestComponent />
      <IconDemo />
    </main>
  );
}
