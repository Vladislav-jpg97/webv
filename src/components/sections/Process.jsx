'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useEnv';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

export default function Process() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();
  const root = useRef(null);

  // GSAP: линия прогресса (scrub) + активные этапы
  useEffect(() => {
    const steps = root.current?.querySelectorAll('.step');
    if (!steps?.length) return;

    if (reduced) {
      steps.forEach((s) => s.setAttribute('data-active', 'true'));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: 0.4 },
        }
      );
      steps.forEach((s) => {
        ScrollTrigger.create({
          trigger: s,
          start: 'top 62%',
          onEnter: () => s.setAttribute('data-active', 'true'),
          onLeaveBack: () => s.setAttribute('data-active', 'false'),
        });
      });
    }, root);

    return () => ctx.revert();
  }, [lang, reduced]);

  return (
    <section id="process" ref={root} data-hue="255" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle index="04" eyebrow={t.process.eyebrow} title={t.process.title} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-fluid-body text-mute">{t.process.desc}</p>
          </Reveal>
        </div>

        <ol className="timeline relative">
          {/* Линия */}
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-white/10" />
          <div className="progress-line absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-accent via-electric to-ice shadow-[0_0_14px_rgba(109,92,255,0.9)]" />

          {t.process.steps.map((s, i) => (
            <li
              key={`${lang}-${i}`}
              data-active="false"
              className="step group relative flex gap-6 pb-14 last:pb-0 sm:gap-8"
            >
              <span className="step-num relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/15 bg-[#0b0b12] font-display text-lg font-semibold text-white/50 transition-all duration-700 group-hover:scale-110">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="step-body translate-y-3 pt-2 opacity-45 transition-all duration-700">
                <h3 className="font-display text-fluid-h4 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 max-w-md text-fluid-body text-mute">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
