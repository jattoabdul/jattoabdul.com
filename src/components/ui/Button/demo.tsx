import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';

export function ButtonDemo() {
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-heading mb-4">Button System</h2>

      {/* Gem Color Variants */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Gem Colors</h3>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Icon name="Github" />
            Default (Ruby)
          </Button>
          <Button variant="ruby">
            <Icon name="SiGithub" />
            Ruby
          </Button>
          <Button variant="sapphire">
            <Icon name="SiX" />
            Sapphire
          </Button>
          <Button variant="jade">
            <Icon name="Mail" />
            Jade
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

      {/* Glass Effect */}
      <div className="space-y-4">
        <h3 className="text-xl font-heading">Glass Effect</h3>
        <div className="flex flex-wrap gap-4 bg-gradient-to-r from-ruby/30 to-sapphire/30 p-8 rounded-lg">
          <Button glass>Ruby Glass</Button>
          <Button glass variant="sapphire">
            Sapphire Glass
          </Button>
          <Button glass variant="jade">
            Jade Glass
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
