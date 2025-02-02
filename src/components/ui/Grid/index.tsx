'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ColNumber = number;

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns on different breakpoints */
  cols?: {
    base?: ColNumber;
    sm?: ColNumber;
    md?: ColNumber;
    lg?: ColNumber;
    xl?: ColNumber;
    '2xl'?: ColNumber;
  };
  /** Gap between grid items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Vertical alignment of grid items */
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const gapMap = {
  none: 'gap-0',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
} as const;

/**
 * Get grid columns class based on column count
 * @param cols Number of columns
 * @returns Tailwind grid-cols class
 */
const getColsClass = (cols: number): string => {
  // For common column counts, use Tailwind's built-in classes
  if (cols >= 1 && cols <= 12) {
    return `grid-cols-${cols}`;
  }
  
  // For larger numbers, use CSS grid-template-columns
  return `grid-cols-[repeat(${cols},minmax(0,1fr))]`;
};

export function Grid({
  children,
  cols = { base: 1, md: 2, lg: 3 },
  gap = 'md',
  align = 'start',
  className,
  ...props
}: GridProps) {
  return (
    <div
      className={cn(
        'grid w-full',
        // Gap
        gapMap[gap],
        // Columns at different breakpoints
        cols.base && getColsClass(cols.base),
        cols.sm && `sm:${getColsClass(cols.sm)}`,
        cols.md && `md:${getColsClass(cols.md)}`,
        cols.lg && `lg:${getColsClass(cols.lg)}`,
        cols.xl && `xl:${getColsClass(cols.xl)}`,
        cols['2xl'] && `2xl:${getColsClass(cols['2xl'])}`,
        // Alignment
        {
          'items-start': align === 'start',
          'items-center': align === 'center',
          'items-end': align === 'end',
          'items-stretch': align === 'stretch',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
