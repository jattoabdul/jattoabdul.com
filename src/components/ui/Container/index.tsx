'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Makes the container full width with no max-width */
  fluid?: boolean;
  /** Centers the container and adds horizontal padding */
  centered?: boolean;
  /** Adds vertical padding */
  paddedY?: boolean;
  /** Container size variants */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function Container({
  children,
  fluid = false,
  centered = true,
  paddedY = false,
  size = 'lg',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        // Base styles
        'w-full px-4 md:px-6',
        // Centered styles
        centered && 'mx-auto',
        // Vertical padding
        paddedY && 'py-8 md:py-12 lg:py-16',
        // Max width variants
        !fluid && {
          'max-w-screen-sm': size === 'sm',   // 640px
          'max-w-screen-md': size === 'md',   // 768px
          'max-w-screen-lg': size === 'lg',   // 1024px
          'max-w-screen-xl': size === 'xl',   // 1280px
          'max-w-screen-2xl': size === '2xl', // 1536px
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
