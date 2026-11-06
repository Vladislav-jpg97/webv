'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useFinePointer, useReducedMotion } from '@/hooks/useEnv';

// 3D Tilt-карточка со следящим за курсором световым пятном.
// glow — "R, G, B". Содержимое лежит на слое с translateZ — отсюда эффект глубины.
export default function Card({ glow = '109, 92, 255', tilt = 7, className = '', innerClassName = '', children, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const enabled = fine && !reduced;

  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (enabled) {
      rx.set(-(py - 0.5) * tilt * 2);
      ry.set((px - 0.5) * tilt * 2);
    }
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className={className} {...rest}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX: enabled ? rx : 0, rotateY: enabled ? ry : 0, transformStyle: 'preserve-3d', '--mx': '50%', '--my': '30%' }}
        className="group relative h-full rounded-[2rem]"
      >
        {/* Фоновый слой с клипом */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0e0e16]">
          <div
            className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(520px circle at var(--mx) var(--my), rgba(${glow}, 0.2), transparent 45%)` }}
          />
          <div
            className="absolute -top-1/2 left-1/2 h-full w-[120%] -translate-x-1/2 opacity-60"
            style={{ background: `radial-gradient(closest-side, rgba(${glow}, 0.16), transparent)` }}
          />
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.04]" />
        </div>
        <div className={`relative h-full ${innerClassName}`} style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
