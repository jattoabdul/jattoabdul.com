'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';

type AnimationVariant =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom'
  | 'none';

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  /** Section contents */
  children: ReactNode;
  /** Makes the container full width */
  fluid?: boolean;
  /** Centers the container */
  centered?: boolean;
  /** Adds vertical padding */
  paddedY?: boolean;
  /** Container size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** If true, wraps children in a Grid component */
  grid?: boolean;
  /** Grid props if grid is true */
  gridProps?: Omit<React.ComponentProps<typeof Grid>, 'children'>;
  /** Background color variant */
  variant?: 'default' | 'muted' | 'accent';
  /** Animation variant */
  animation?: AnimationVariant;
  /** Animation delay in seconds */
  delay?: number;
  /** Custom animation variants */
  customVariants?: Variants;
}

const MotionSection = motion.section;

// Default animation variants
const animationVariants: Record<AnimationVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-down': {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  none: {
    hidden: {},
    visible: {},
  },
};

export function Section({
  children,
  fluid = false,
  centered = true,
  paddedY = true,
  size = 'lg',
  grid = false,
  gridProps,
  variant = 'default',
  animation = 'none',
  delay = 0,
  customVariants,
  className,
  ...props
}: SectionProps) {
  const variants = customVariants || animationVariants[animation];

  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      className={cn(
        'relative w-full',
        {
          'bg-background': variant === 'default',
          'bg-muted': variant === 'muted',
          'bg-accent': variant === 'accent',
        },
        className
      )}
      {...props}
    >
      <Container fluid={fluid} centered={centered} paddedY={paddedY} size={size}>
        {grid ? <Grid {...gridProps}>{children}</Grid> : children}
      </Container>
    </MotionSection>
  );
}
