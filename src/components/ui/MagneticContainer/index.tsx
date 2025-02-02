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
  /** Variant of the magnetic effect */
  variant?: 'default' | 'social';
}

const MotionDiv = motion.div;

const variants = {
  default: {
    springConfig: { damping: 15, stiffness: 150, mass: 0.2 },
    cursorAttribute: 'data-cursor-interactive',
  },
  social: {
    springConfig: { damping: 20, stiffness: 250, mass: 0.1 },
    cursorAttribute: 'data-cursor-social',
  },
} as const;

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
  variant = 'default',
  ...props
}: MagneticContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Get variant configuration
  const variantConfig = variants[variant];

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

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding) {
        setIsActive(true);
        // Adjust pull strength based on variant
        const pullStrength = variant === 'social' 
          ? Math.max(0.2, (distance / padding) * 0.8)
          : Math.max(0.1, distance / padding);
        
        const offsetX = (distanceX / magneticStrength) * pullStrength;
        const offsetY = (distanceY / magneticStrength) * pullStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, disabled, magneticStrength, variant]);

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...{ [variantConfig.cursorAttribute]: true }}
    >
      <MotionDiv
        className={cn(innerClassName, className)}
        animate={position}
        transition={{
          type: 'spring',
          ...variantConfig.springConfig,
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
