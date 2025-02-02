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
    .filter(name => name.startsWith('Si') && !name.endsWith('Hex'))
    .slice(0, 12) as ReactSimpleIconName[];

  return (
    <div className="space-y-16">
      {/* Heading */}
      <div className="space-y-4">
        <h2 className="text-2xl font-heading">Icon System</h2>
        <p className="text-muted-foreground">
          A showcase of our icon system with different sizes and variations.
        </p>
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
          <p className="text-muted-foreground">
            A collection of beautifully crafted open source icons.
          </p>
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
              <Icon name={name} size={IconSizes.md} source="simple" />
              <span className="text-xs text-center text-muted-foreground">
                {name.replace('Si', '')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-configured brand icons demo */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Pre-configured Brand Icons</h3>
          <p className="text-muted-foreground">Common brand icons with pre-configured styles.</p>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {Object.entries(BrandIcons).map(([name, BrandIcon]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <BrandIcon name={name as ReactSimpleIconName} size={IconSizes.md} />
              <span className="text-xs text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon colors demo */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading">Icon Colors</h3>
          <p className="text-muted-foreground">
            Icons inherit text colors and can use any color from our theme.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Icon name="Github" size={IconSizes.lg} className="text-primary" />
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Github" size={IconSizes.lg} className="text-secondary" />
            <span className="text-xs text-muted-foreground">Secondary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Github" size={IconSizes.lg} className="text-accent" />
            <span className="text-xs text-muted-foreground">Accent</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Github" size={IconSizes.lg} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Muted</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="Github" size={IconSizes.lg} className="text-cinnabar" />
            <span className="text-xs text-muted-foreground">Cinnabar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
