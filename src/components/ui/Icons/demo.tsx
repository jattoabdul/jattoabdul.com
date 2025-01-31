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
    <div className="p-16 space-y-14">
      <h2 className="text-2xl font-heading mb-4">Icon System Demo</h2>

      {/* Icon sizes demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Icon Sizes</h3>
        <div className="flex items-center gap-4">
          {Object.entries(IconSizes).map(([size, value]) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Icon name="Github" size={value} />
              <span className="text-sm">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lucide icons demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Lucide Icons</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {lucideIconNames.map(name => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-accent hover:text-primary-foreground transition-colors"
            >
              <Icon name={name} size={IconSizes.md} />
              <span className="text-xs text-center">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple icons demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Simple Icons</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {reactSimpleIconNames.map(name => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Icon name={name} size={IconSizes.md} source="simple" />
              <span className="text-xs text-center">{name.replace('Si', '')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-configured brand icons demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Pre-configured Brand Icons</h3>
        <div className="flex items-center gap-4">
          {Object.entries(BrandIcons).map(([name, BrandIcon]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <BrandIcon name={name as ReactSimpleIconName} size={IconSizes.md} />
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon colors demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Icon Colors</h3>
        <div className="flex items-center gap-4">
          <Icon name="SiGithub" className="text-primary" />
          <Icon name="SiGithub" className="text-secondary" />
          <Icon name="SiGithub" className="text-accent" />
          <Icon name="SiGithub" className="text-muted-foreground" />
          <Icon name="SiGithub" className="text-cinnabar" />
        </div>
      </div>
    </div>
  );
}
