'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useEnv';
import { gsap } from '@/lib/gsap';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import ProfilePhoto from '@/components/ui/ProfilePhoto';

export default function About() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();
  const root = useRef(null);
  const [hover, setHover] = useState(0);

  // GSAP: слова лида проявляются по скроллу, фото открывается маской
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scrub-word',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: { trigger: '.scrub-block', start: 'top 82%', end: 'bottom 52%', scrub: true },
        }
      );
      gsap.fromTo(
        '.photo-mask',
        { clipPath: 'inset(100% 0% 0% 0% round 2rem)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 2rem)',
          ease: 'power3.out',
          duration: 1.4,
          scrollTrigger: { trigger: '.photo-mask', start: 'top 85%', once: true },
        }
      );
      gsap.fromTo(
        '.photo-inner',
        { scale: 1.35 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: '.photo-mask', start: 'top bottom', end: 'center center', scrub: true } }
      );
    }, root);
    return () => ctx.revert();
  }, [lang, reduced]);

  const leadWords = t.about.lead.split(' ');

  return (
    <section id="about" ref={root} data-hue="268" className="section">
      <div className="container-x">
        <SectionTitle index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Фото */}
          <div className="relative mx-auto w-full max-w-[26.25rem] md:max-w-[28.75rem] lg:sticky lg:top-28 lg:mx-0">
            <div className="photo-mask relative overflow-hidden rounded-[2rem]">
              <div className="photo-inner">
                <ProfilePhoto className="aspect-square w-full rounded-[2rem]" />
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.4rem] border border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-56 w-56 rounded-full bg-accent/25 blur-[80px]" />
          </div>

          {/* Текст */}
          <div>
            <p className="scrub-block font-display text-fluid-lead font-medium tracking-[-0.02em]">
              {leadWords.map((w, i) => (
                <span key={`${lang}-${i}`}>
                  <span className="scrub-word inline-block">{w}</span>
                  {i < leadWords.length - 1 ? ' ' : null}
                </span>
              ))}
            </p>

            <Reveal delay={0.05} className="mt-10 max-w-xl space-y-5 text-fluid-body text-mute">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </Reveal>

            {/* Интерактивные принципы */}
            <ul className="mt-14 border-t border-white/[0.08]" onMouseLeave={() => setHover(0)}>
              {t.about.points.map((p, i) => {
                const on = hover === i;
                return (
                  <li key={p.title}>
                    <motion.button
                      type="button"
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onClick={() => setHover(i)}
                      aria-pressed={on}
                      className="group flex w-full items-center gap-5 border-b border-white/[0.08] py-6 text-left"
                    >
                      <span className={`font-mono text-xs transition-colors ${on ? 'text-accent' : 'text-white/30'}`}>0{i + 1}</span>
                      <span className={`font-display text-fluid-h4 font-semibold tracking-tight transition-all duration-500 ${on ? 'translate-x-2 text-white' : 'text-white/45'}`}>
                        {p.title}
                      </span>
                      <span className={`ml-auto hidden max-w-[16rem] text-sm leading-snug text-mute transition-all duration-500 sm:block ${on ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'}`}>
                        {p.text}
                      </span>
                    </motion.button>
                    <p className={`overflow-hidden pl-9 text-sm leading-snug text-mute transition-all duration-500 sm:hidden ${on ? 'max-h-20 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                      {p.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
