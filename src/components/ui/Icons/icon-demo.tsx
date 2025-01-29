import { Icon, IconName, IconSizes } from '.'
import * as LucideIcons from 'lucide-react'

export function IconDemo() {
  const iconNames = Object.keys(LucideIcons) as IconName[]

  return (
    <div className="p-4">
      <h2 className="text-2xl font-heading mb-4">Icon System Demo</h2>
      
      {/* Icon sizes demo */}
      <div className="mb-8">
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

      {/* Common icons demo */}
      <div className="mb-8">
        <h3 className="text-xl font-heading mb-2">Common Icons</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {iconNames.slice(0, 24).map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <Icon name={name} size={IconSizes.md} />
              <span className="text-xs text-center">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon colors demo */}
      <div>
        <h3 className="text-xl font-heading mb-2">Icon Colors</h3>
        <div className="flex items-center gap-4">
          <Icon name="Github" className="text-primary" />
          <Icon name="Github" className="text-secondary" />
          <Icon name="Github" className="text-accent" />
          <Icon name="Github" className="text-muted-foreground" />
          <Icon name="Github" className="text-ruby" />
          <Icon name="Github" className="text-sapphire" />
        </div>
      </div>
    </div>
  )
}
