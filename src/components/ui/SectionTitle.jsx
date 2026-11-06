'use client';

import { motion } from 'motion/react';
import Reveal from './Reveal';
import { useReducedMotion } from '@/hooks/useEnv';

// Заголовок секции: eyebrow + H2, слова выезжают из-под маски.
export default function SectionTitle({ index, eyebrow, title, className = '', align = 'left', as: Tag = 'h2' }) {
  const reduced = useReducedMotion();
  const words = String(title).split(' ');
  const MotionTag = motion[Tag] || motion.h2;
  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className={`inline-block h-px w-8 bg-gradient-to-r from-accent to-transparent ${align === 'center' ? '' : ''}`} />
          <span>
            {index} <span className="mx-1 text-white/20">/</span> {eyebrow}
          </span>
        </p>
      </Reveal>
      <MotionTag
        className="h2 mt-5"
        initial={reduced ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.055 }}
      >
        {words.map((w, i) => (
          <span key={i}>
            <span className="word-mask">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%', rotate: 3 },
                show: { y: 0, rotate: 0, transition: { duration: 0.95, ease: [0.2, 0.8, 0.2, 1] } },
              }}
            >
              {w}
            </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </MotionTag>
    </div>
  );
}
