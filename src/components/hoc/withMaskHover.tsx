'use client';

import { ComponentType } from 'react';
import { useMaskStore, MASK_SIZE, type MaskState } from '@/stores/maskStore';
import { motion } from 'framer-motion';
import useMousePosition from '@/hooks/useMousePosition';

interface WithMaskHoverProps {
  maskColor?: string;
  className?: string;
}

export function withMaskHover<P extends object>(
  WrappedComponent: ComponentType<P & WithMaskHoverProps>
) {
  const WithMaskHover = (props: P & WithMaskHoverProps) => {
    const { setSize, size } = useMaskStore((state: MaskState) => ({
      setSize: state.setSize,
      size: state.size,
    }));
    const { x, y } = useMousePosition();
    const { maskColor = '#F2542D', className, ...componentProps } = props;

    return (
      <div
        className={`relative cursor-none ${className}`}
        onMouseEnter={() => setSize(MASK_SIZE.onHover)}
        onMouseLeave={() => setSize(MASK_SIZE.initial)}
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
            ease: 'backOut',
            duration: 0.5,
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: maskColor }} />
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
