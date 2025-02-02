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
        className="w-full h-full flex flex-col items-center justify-center cursor-default absolute bg-primary text-themeSmokyBlack"
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
        <p onMouseEnter={() => setSize(400)} onMouseLeave={() => setSize(40)}>
          Main Site Mask Content Wrapped in Mask Hover HOC and then Wrapped in Mask Frame HOC
        </p>
      </motion.div>

      {/* Main Hero Content Original Layer */}
      <div className="w-full h-full flex flex-col items-center justify-center cursor-default">
        <p>Main Site Original Content Not in a Mask Hover HOC and not Wrapped in Mask Frame HOC</p>
      </div>
    </section>
  );
}
