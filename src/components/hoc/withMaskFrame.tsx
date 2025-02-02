'use client';

import { ComponentType, useEffect } from 'react';
import { motion } from 'framer-motion';

import useMousePosition from '@/hooks/useMousePosition';
import { useMaskStore } from '@/stores/maskStore';

const MASK_IMAGE_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMTAwIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K';

export function withMaskFrame<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  const WithMaskFrame = (props: P) => {
    const { x, y } = useMousePosition();
    const { mousePos, size, setMousePos } = useMaskStore();

    useEffect(() => {
      setMousePos(x, y);
    }, [x, y, setMousePos]);

    return (
      <motion.div
        animate={{
          WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{
          type: 'tween',
          ease: 'backOut',
          duration: 0.5,
        }}
        style={{
          WebkitMaskImage: `url(${MASK_IMAGE_URL})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
      >
        <Component {...props} />
      </motion.div>
    );
  };

  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  WithMaskFrame.displayName = `withMaskFrame(${componentName})`;

  return WithMaskFrame;
}
