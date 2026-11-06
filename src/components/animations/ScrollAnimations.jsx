'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useEnv';

// Глобальные scroll-эффекты (GSAP + ScrollTrigger):
//  • параллакс для элементов с data-parallax="0.1" (опционально data-parallax-start="top top")
//  • плавная смена оттенка фоновых пятен при переходе между секциями (data-hue)
// Всё создаётся внутри gsap.context и корректно очищается при размонтировании.
export default function ScrollAnimations() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          const section = el.closest('section') || el;
          gsap.to(el, {
            yPercent: -speed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: el.dataset.parallaxStart || 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        });
      }

      const hue = { v: parseFloat(getComputedStyle(root).getPropertyValue('--hue')) || 255 };
      gsap.utils.toArray('section[data-hue]').forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(hue, {
              v: parseFloat(sec.dataset.hue),
              duration: reduced ? 0.01 : 1.6,
              ease: 'power2.out',
              overwrite: true,
              onUpdate: () => root.style.setProperty('--hue', hue.v.toFixed(1)),
            });
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
      root.style.removeProperty('--hue');
    };
  }, [reduced]);

  return null;
}
