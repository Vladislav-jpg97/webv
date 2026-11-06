'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile, useReducedMotion } from '@/hooks/useEnv';

// Многослойный фон: анимированные градиентные пятна, сетка, шум и лёгкие частицы (2D canvas).
export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const mobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const count = mobile ? 26 : 62;
    const parts = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.00006,
      vy: -(Math.random() * 0.00009 + 0.00002),
      a: Math.random() * 0.5 + 0.15,
      p: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t, dt) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduced) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.y < -0.02) p.y = 1.02;
          if (p.x < -0.02) p.x = 1.02;
          if (p.x > 1.02) p.x = -0.02;
        }
        const tw = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 0.0012 + p.p);
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 180, 255, ${p.a * tw})`;
        ctx.fill();
      }
    };

    let last = performance.now();
    const loop = (now) => {
      if (!running) return;
      const dt = Math.min(now - last, 64);
      last = now;
      draw(now, dt);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    if (reduced) {
      draw(0, 0);
    } else {
      raf = requestAnimationFrame(loop);
    }
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mobile, reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-aurora blob-a" />
      <div className="bg-aurora blob-b" />
      <div className="bg-aurora blob-c" />
      <div className="grid-lines absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="grain" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,7,11,0.65)_100%)]" />
    </div>
  );
}
