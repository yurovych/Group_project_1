'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
  },
};

const XIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className='cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center'
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      style={{ width: '32px', height: '32px', padding: '0' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#fbfbfb'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <motion.path
          variants={pathVariants}
          animate={controls}
          d='M18 6 6 18'
        />
        <motion.path
          transition={{ delay: 0.2 }}
          variants={pathVariants}
          animate={controls}
          d='m6 6 12 12'
        />
      </svg>
    </div>
  );
};

export { XIcon };
