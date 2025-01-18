'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';

const dotVariants: Variants = {
  normal: {
    opacity: 1,
  },
  animate: (custom: number) => ({
    opacity: [1, 0, 0, 1, 1, 0, 0, 1],
    transition: {
      opacity: {
        times: [
          0,
          0.1,
          0.1 + custom * 0.1,
          0.1 + custom * 0.1 + 0.1,
          0.5,
          0.6,
          0.6 + custom * 0.1,
          0.6 + custom * 0.1 + 0.1,
        ],
        duration: 1.5,
      },
    },
  }),
};

const MessageCircleMoreIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className='cursor-pointer select-none hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center overflow-hidden'
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
      style={{ width: '36px', height: '36px', padding: '0' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#fbfbfb'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z' />
        <motion.path
          d='M8 12h.01'
          variants={dotVariants}
          animate={controls}
          custom={0}
        />
        <motion.path
          d='M12 12h.01'
          variants={dotVariants}
          animate={controls}
          custom={1}
        />
        <motion.path
          d='M16 12h.01'
          variants={dotVariants}
          animate={controls}
          custom={2}
        />
      </svg>
    </div>
  );
};

export { MessageCircleMoreIcon };
