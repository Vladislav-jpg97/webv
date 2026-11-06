'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useFinePointer, useReducedMotion } from '@/hooks/useEnv';

const variants = {
  primary:
    'text-white bg-[linear-gradient(120deg,#7a68ff_0%,#4f6bff_55%,#2f7bff_100%)] shadow-[0_12px_40px_-12px_rgba(109,92,255,0.9),inset_0_1px_0_rgba(255,255,255,0.25)]',
  ghost: 'text-white glass hover:border-white/25 hover:bg-white/[0.07]',
  light: 'text-ink bg-white hover:bg-white/90 shadow-[0_12px_40px_-14px_rgba(255,255,255,0.6)]',
};
const sizes = {
  sm: 'h-10 px-5 text-sm gap-2',
  md: 'h-[52px] px-7 text-[15px] gap-2.5',
  lg: 'h-16 px-9 text-base gap-3',
};

// Кнопка с магнитным эффектом. Если передан href — рендерится ссылка.
export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  magnetic = true,
  icon,
  className = '',
  children,
  external,
  ...rest
}) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const enabled = magnetic && fine && !reduced;

  const onMove = (e) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.36);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? motion.a : motion.button;
  const extra = href
    ? external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {}
    : { type: rest.type || 'button' };

  return (
    <Comp
      ref={ref}
      href={href}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={enabled ? { x: sx, y: sy } : undefined}
      whileTap={{ scale: 0.97 }}
      className={`shine relative inline-flex select-none items-center justify-center overflow-hidden whitespace-nowrap rounded-full font-semibold transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      {...extra}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {children}
        {icon}
      </span>
    </Comp>
  );
}
