import type { LucideIcon, LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import * as ReactSimpleIcons from '@icons-pack/react-simple-icons';
import type { IconType as ReactSimpleIcon } from '@icons-pack/react-simple-icons';

// Type for Lucide icon names
export type LucideIconName = keyof typeof LucideIcons;

// Type for Simple Icons names (they start with 'Si')
export type ReactSimpleIconName = keyof typeof ReactSimpleIcons;

// Combined icon source types
export type IconSource = 'lucide' | 'simple';

// Props for our Icon component
export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName | ReactSimpleIconName;
  source?: IconSource;
}

// Common icon sizes
export const IconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof IconSizes;

// Helper to check if a name is a Simple Icon
const isSimpleIcon = (name: string): name is ReactSimpleIconName => {
  return name.startsWith('Si') && name in ReactSimpleIcons;
};

export function Icon({ name, source, color, size = IconSizes.md, className, ...props }: IconProps) {
  // Automatically detect source if not provided
  const iconSource = source || (isSimpleIcon(name) ? 'simple' : 'lucide');

  // Render Simple Icons
  if (iconSource === 'simple' && isSimpleIcon(name)) {
    // Remove 'Hex' suffix from Simple Icons names just for good measure. If we need to handle these icons differently, we can add a separate check for them.
    if (name.endsWith('Hex')) {
      name = name.slice(0, -3) as ReactSimpleIconName;
    }
    const SiReact = ReactSimpleIcons[name as ReactSimpleIconName] as ReactSimpleIcon;

    return <SiReact size={size} color={color} className={className} {...props} />;
  }

  // Fallback to Lucide icons
  const LucideIcon = LucideIcons[name as LucideIconName] as LucideIcon;
  return <LucideIcon size={size} color={color} className={className} {...props} />;
}

// Commonly used Lucide icons (exported for convenience)
export const {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Search,
  ExternalLink,
  Copy,
  Check,
  Sun,
  Moon,
} = LucideIcons;

export const { SiGithub, SiX, SiYoutube, SiDiscord } = ReactSimpleIcons;

// Commonly used brand icons
export const BrandIcons = {
  Github: (props: IconProps) => <Icon {...props} name="SiGithub" />,
  Twitter: (props: IconProps) => <Icon {...props} name="SiX" />,
  LinkedIn: (props: IconProps) => <Icon {...props} name="Linkedin" />,
  YouTube: (props: IconProps) => <Icon {...props} name="SiYoutube" />,
  Discord: (props: IconProps) => <Icon {...props} name="SiDiscord" />,
};
