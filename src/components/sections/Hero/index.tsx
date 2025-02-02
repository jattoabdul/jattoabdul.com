'use client';

import { motion } from 'framer-motion';
import useMousePosition from '@hooks/useMousePosition';
import { useMaskStore } from '@/stores/maskStore';
import { useEffect } from 'react';

const MASK_IMAGE_URL = 'https://framerusercontent.com/images/De0CMakQwO0HOVWPyQnVeTw.svg';

export function HeroSection() {
  // const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();
  const { mousePos, size, setMousePos, setSize } = useMaskStore();

  useEffect(() => {
    setMousePos(x, y);
  }, [x, y, setMousePos]);

  return (
    <section className="relative h-screen hero-section">
      {/* Main Hero Content Mask Layer */}
      <motion.div
        className="w-full h-full flex flex-col text-6xl items-center justify-center cursor-default absolute bg-primary text-smoky"
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
        {/*<p onMouseEnter={() => setMousePos(x, y)} onMouseLeave={() => setMousePos(x, y)}>*/}
        <p className="p-10" onMouseEnter={() => setSize(400)} onMouseLeave={() => setSize(40)}>
          Main Site Mask Content
        </p>
      </motion.div>

      {/* Main Hero Content Original Layer */}
      <div className="w-full h-full flex flex-col text-6xl items-center justify-center cursor-default">
        <p className="p-10">Main Site Original Content</p>
      </div>
    </section>
  );
}
