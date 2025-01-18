'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const pathVariant: Variants = {
  normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    pathOffset: [1, 0],
  },
};

const circleVariant: Variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    scale: 1,
  },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    scale: [0.5, 1],
  },
};

const UserIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className='cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center'
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      style={{ width: '20px', height: '20px', padding: '0' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        stroke='#fbfbfb'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <motion.circle
          cx='12'
          cy='8'
          r='5'
          animate={controls}
          variants={circleVariant}
        />

        <motion.path
          d='M20 21a8 8 0 0 0-16 0'
          variants={pathVariant}
          transition={{
            delay: 0.2,
            duration: 0.4,
          }}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { UserIcon };
