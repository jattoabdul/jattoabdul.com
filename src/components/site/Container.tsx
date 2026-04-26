import { cn } from '@/lib/utils';

type ContainerProps = {
  width?: 'text' | 'wide' | 'nav' | 'shell';
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

const widthClass: Record<NonNullable<ContainerProps['width']>, string> = {
  text: 'max-w-text',
  wide: 'max-w-wide',
  nav: 'max-w-nav',
  shell: 'max-w-shell',
};

export function Container({
  width = 'text',
  as: As = 'div',
  className,
  children,
}: ContainerProps) {
  const Cmp = As as React.ElementType;
  return (
    <Cmp className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', widthClass[width], className)}>
      {children}
    </Cmp>
  );
}
