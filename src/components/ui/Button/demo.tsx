import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';

export function ButtonDemo() {
  return (
    <div className="p-16 space-y-14">
      <h2 className="text-2xl font-heading mb-4">Button System</h2>

      {/* Brand Color Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Brand Colors</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Icon name="Github" />
            Default
          </Button>
          <Button variant="cinnabar">
            <Icon name="SiGithub" />
            Cinnabar
          </Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Icon name="Plus" />
          </Button>
        </div>
      </div>

      {/* Gradient */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Gradient</h3>
        <div className="flex flex-wrap gap-4">
          <Button gradient size="lg">
            Gradient Button
          </Button>
        </div>
      </div>

      {/* Other Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Other Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  );
}
