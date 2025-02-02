'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon, IconProps } from '@components/ui/Icons';
import { MagneticContainer } from '@/components/ui/MagneticContainer';
import { cn } from '@/lib/utils';

const sideNavItems = [
  { icon: 'User', href: '/about', label: 'About' },
  { icon: 'BriefcaseBusiness', href: '/work', label: 'Work' },
  { icon: 'Play', href: '/contents', label: 'Contents' },
  { icon: 'Contact', href: '/contact', label: 'Contact' },
];

export function SideNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8">
      {sideNavItems.map(({ icon, href, label }, index) => (
        <div key={href} className="relative group">
          <MagneticContainer
            magneticStrength={3}
            padding={50}
            activeTransitionDuration={0.3}
            inactiveTransitionDuration={0.5}
            className="relative"
          >
            <Link
              href={href}
              className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-interactive
            >
              <Icon name={icon as IconProps['name']} className="size-6" />
              <motion.div
                className={cn(
                  'absolute left-full ml-4 origin-left whitespace-nowrap text-sm font-medium',
                  'pointer-events-none select-none',
                  'text-wheat opacity-0 group-hover:opacity-100'
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  x: hoveredIndex === index ? 0 : -10,
                }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {label}
              </motion.div>
              <span className="sr-only">{label}</span>
            </Link>
          </MagneticContainer>

          {/* Animated dot indicator - hidden for now */}
          <motion.div
            className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 hidden"
            initial={false}
            animate={{
              scale: hoveredIndex === index ? 1 : 0,
              opacity: hoveredIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-full w-full rounded-full bg-wheat" />
          </motion.div>
        </div>
      ))}
    </nav>
  );
}
