'use client';

import { useRef, useState, useEffect, ComponentProps } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticSocialProps extends ComponentProps<typeof motion.div> {
  children: React.ReactNode;
  /** Distance around the magnet where the mouse can activate it */
  padding?: number;
  /** Controls how strong the magnet pull is. Lower = stronger pull */
  magneticStrength?: number;
  /** Disables the magnet effect entirely */
  disabled?: boolean;
  /** Optional class for the outer wrapper */
  wrapperClassName?: string;
  /** Optional class for the moving/inner element */
  innerClassName?: string;
}

const MotionDiv = motion.div;

export function MagneticSocial({
  children,
  padding = 50,
  magneticStrength = 2,
  disabled = false,
  wrapperClassName = '',
  innerClassName = '',
  className = '',
  ...props
}: MagneticSocialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  // Use motion values for smoother animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring physics for smoother movement
  const springConfig = { 
    damping: 20,
    stiffness: 250,
    mass: 0.1
  };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (disabled) {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      // Calculate distance from cursor to center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding) {
        setIsActive(true);
        // Modified pull strength calculation for smoother transition
        const pullStrength = Math.max(0.2, (distance / padding) * 0.8);
        const offsetX = (distanceX / magneticStrength) * pullStrength;
        const offsetY = (distanceY / magneticStrength) * pullStrength;
        
        x.set(offsetX);
        y.set(offsetY);
      } else {
        setIsActive(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, disabled, magneticStrength, x, y]);

  return (
    <div
      ref={ref}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      data-cursor-social="true"
    >
      <MotionDiv
        className={cn(innerClassName, className)}
        style={{
          x: springX,
          y: springY,
          willChange: 'transform',
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.1
        }}
        {...props}
      >
        {children}
      </MotionDiv>
    </div>
  );
}
