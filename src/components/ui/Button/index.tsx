import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary variants using our gem colors
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        ruby: 'bg-ruby text-white hover:bg-ruby-900 active:bg-ruby-600',
        sapphire: 'bg-sapphire text-white hover:bg-sapphire-900 active:bg-sapphire-600',
        jade: 'bg-jade text-white hover:bg-jade-900 active:bg-jade-600',

        // Secondary variants
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',

        // Special variants
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      // Add glass effect variant
      glass: {
        true: 'backdrop-blur-sm bg-opacity-20 hover:bg-opacity-30',
      },
      // Add gradient variant
      gradient: {
        true: 'bg-gradient-to-r from-ruby via-sapphire to-jade text-white border-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glass: false,
      gradient: false,
    },
    // Handle compound variants
    compoundVariants: [
      {
        gradient: true,
        className: 'hover:shadow-lg hover:scale-[1.02] transition-all',
      },
      {
        glass: true,
        variant: 'default',
        className: 'bg-ruby/20 hover:bg-ruby/30',
      },
      {
        glass: true,
        variant: 'sapphire',
        className: 'bg-sapphire/20 hover:bg-sapphire/30',
      },
      {
        glass: true,
        variant: 'jade',
        className: 'bg-jade/20 hover:bg-jade/30',
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glass, gradient, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glass, gradient, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
