'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from '@/hooks/useEnv';

// Плавное появление при прокрутке (Motion). Для GSAP-анимаций используются отдельные элементы,
// поэтому конфликтов transform между библиотеками нет.
export default function Reveal({ as = 'div', delay = 0, y = 28, amount = 0.2, className, children, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
