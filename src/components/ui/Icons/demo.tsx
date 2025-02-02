import {
  Icon,
  LucideIconName,
  IconSizes,
  BrandIcons,
  ReactSimpleIconName,
} from '@components/ui/Icons';
import * as LucideIcons from 'lucide-react';
import * as ReactSimpleIcons from '@icons-pack/react-simple-icons';

export function IconDemo() {
  // Get first 12 icons from each library
  const lucideIconNames = Object.keys(LucideIcons).slice(0, 12) as LucideIconName[];
  const reactSimpleIconNames = Object.keys(ReactSimpleIcons)
    .filter(name => name.startsWith('si'))
    .slice(0, 12) as ReactSimpleIconName[];

  return (
    <div className="space-y-16">
      {/* Heading */}
      <div className="space-y-4">
        <h2 className="text-2xl font-heading">Icon System</h2>
        <p className="text-muted-foreground">A showcase of our icon system with different sizes and variations.</p>
      </div>

      {/* Icon sizes demo */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Icon Sizes</h3>
          <p className="text-muted-foreground">Available icon sizes for consistent scaling.</p>
        </div>
        <div className="flex items-center gap-8">
          {Object.entries(IconSizes).map(([size, value]) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icon name="Github" size={value} />
              <span className="text-sm text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lucide icons demo */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Lucide Icons</h3>
          <p className="text-muted-foreground">A collection of beautifully crafted open source icons.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {lucideIconNames.map(name => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon name={name} size={IconSizes.md} />
              <span className="text-xs text-center text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple icons demo */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Brand Icons</h3>
          <p className="text-muted-foreground">Popular brand and logo icons from Simple Icons.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {reactSimpleIconNames.map(name => (
            <div
              key={name}
              className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon name={name} size={IconSizes.md} />
              <span className="text-xs text-center text-muted-foreground">{name.replace('si', '')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
