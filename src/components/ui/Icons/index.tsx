import { LucideIcon, LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

export interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = LucideIcons[name] as LucideIcon;
  return <LucideIcon {...props} />;
}

// Common icon sizes
export const IconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

// Commonly used icons - export them directly for convenience
export const {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  Search,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Sun,
  Moon,
  // Add more commonly used icons here
} = LucideIcons;
