'use client';

import { ComponentType } from 'react';
import { useMaskStore, MASK_SIZE, selectSize, selectSetSize } from '@/stores/maskStore';
import { motion } from 'framer-motion';
import useMousePosition from '@/hooks/useMousePosition';
import { useMask } from '@/contexts/MaskContext';

interface WithMaskHoverProps {
  className?: string;
}

export function withMaskHover<P extends object>(
  WrappedComponent: ComponentType<P & WithMaskHoverProps>
) {
  const WithMaskHover = (props: P & WithMaskHoverProps) => {
    const size = useMaskStore(selectSize);
    const setSize = useMaskStore(selectSetSize);
    const { x, y } = useMousePosition();
    const { config } = useMask();
    const { className, ...componentProps } = props;

    if (!config.enabled) {
      return <WrappedComponent {...(componentProps as P)} className={className} />;
    }

    return (
      <div
        className={`relative cursor-none ${className}`}
        onMouseEnter={() => setSize(config.hoverSize || MASK_SIZE.onHover)}
        onMouseLeave={() => setSize(config.initialSize || MASK_SIZE.initial)}
      >
        {/* Original Component Layer */}
        <div className="relative">
          <WrappedComponent {...(componentProps as P)} />
        </div>

        {/* Mask Layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, black 100%, transparent 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px ${size}px`,
          }}
          animate={{
            WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
            WebkitMaskSize: `${size}px ${size}px`,
          }}
          transition={{
            type: 'tween',
            ease: config.easing || 'backOut',
            duration: config.transitionDuration || 0.5,
          }}
        >
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: config.color || '#F2542D' }} 
          />
          <div className="relative">
            <WrappedComponent {...(componentProps as P)} />
          </div>
        </motion.div>
      </div>
    );
  };

  // Set display name for debugging
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithMaskHover.displayName = `withMaskHover(${componentName})`;

  return WithMaskHover;
}
