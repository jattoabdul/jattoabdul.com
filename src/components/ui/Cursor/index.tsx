'use client';

import { useEffect, useState } from 'react';
import { motion, HTMLMotionProps, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type DivProps = HTMLMotionProps<'div'>;

const MotionDiv = motion.div;

export function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [exitDirection, setExitDirection] = useState({ x: 0, y: 0 });

  // Mouse position with spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Add spring physics to cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Offset by half the cursor size
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
      setIsLeaving(false);

      // Check if we're over an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('[data-magnetic]') !== null;
      setIsOverInteractive(isInteractive);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      setIsLeaving(true);
      setIsOverInteractive(false);
      // Calculate exit direction
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setExitDirection({
        x: x < 0.3 ? -1 : x > 0.7 ? 1 : 0,
        y: y < 0.3 ? -1 : y > 0.7 ? 1 : 0,
      });
    };

    const handleMouseEnter = () => {
      setIsLeaving(false);
      setIsVisible(true);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  const containerProps: DivProps = {
    className: cn(
      'pointer-events-none fixed left-0 top-0 z-[999]',
      !isOverInteractive && 'mix-blend-difference'
    ),
    style: {
      x: springX,
      y: springY,
    },
    initial: false,
  };

  const cursorProps: DivProps = {
    className: 'relative h-10 w-10',
    animate: {
      scale: isVisible ? 1 : 0,
      x: isLeaving ? exitDirection.x * 100 : 0,
      y: isLeaving ? exitDirection.y * 100 : 0,
    },
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  };

  return (
    <MotionDiv {...containerProps}>
      <MotionDiv {...cursorProps}>
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-cinnabar',
            isOverInteractive ? 'opacity-20' : 'opacity-80'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-full bg-cinnabar',
            isOverInteractive ? 'opacity-10 blur-sm' : 'opacity-80 blur-sm'
          )}
        />
      </MotionDiv>
    </MotionDiv>
  );
}
