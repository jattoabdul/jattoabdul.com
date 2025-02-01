'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  /** Distance around the magnet where the mouse can activate it */
  padding?: number;
  /** Controls how strong the magnet pull is. Lower = stronger pull */
  magneticStrength?: number;
  /** Disables the magnet effect entirely */
  disabled?: boolean;
  /** Transition when the magnet is active (mouse in range) */
  activeTransitionDuration?: number;
  /** Transition when the magnet is inactive (mouse out of range) */
  inactiveTransitionDuration?: number;
  /** Optional class for the outer wrapper */
  wrapperClassName?: string;
  /** Optional class for the moving/inner element */
  innerClassName?: string;
}

const MotionDiv = motion.div;

export function MagneticContainer({
  children,
  padding = 100,
  magneticStrength = 2,
  disabled = false,
  activeTransitionDuration = 0.3,
  inactiveTransitionDuration = 0.5,
  wrapperClassName = '',
  innerClassName = '',
  className = '',
  ...props
}: MagneticContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magneticStrength;
        const offsetY = (e.clientY - centerY) / magneticStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, disabled, magneticStrength]);

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      data-magnetic="true"
    >
      <MotionDiv
        className={cn(innerClassName, className)}
        animate={position}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
          duration: isActive ? activeTransitionDuration : inactiveTransitionDuration,
        }}
        style={{
          willChange: 'transform',
        }}
        {...props}
      >
        {children}
      </MotionDiv>
    </div>
  );
}
