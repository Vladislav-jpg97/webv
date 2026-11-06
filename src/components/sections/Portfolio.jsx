'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useDesktop, useReducedMotion } from '@/hooks/useEnv';
import { projects } from '@/data/projects';
import { gsap } from '@/lib/gsap';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import ProjectVisual from './Mockups';
import ProjectModal from './ProjectModal';

export default function Portfolio() {
  const { t, pick, lang } = useLanguage();
  const desktop = useDesktop();
  const reduced = useReducedMotion();
  const root = useRef(null);
  const [current, setCurrent] = useState(null);
  const close = useCallback(() => setCurrent(null), []);

  // Desktop: карточки "стопкой" (sticky), предыдущая слегка отъезжает и затемняется
  useEffect(() => {
    if (!desktop || reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.p-card');
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector('.p-card-inner'), {
          scale: 0.92,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 78%', end: 'top 22%', scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [desktop, reduced, lang]);

  return (
    <section id="portfolio" ref={root} data-hue="278" className="section">
      <div className="container-x">
        <SectionTitle index="03" eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} />
        <Reveal className="mt-6">
          <p className="max-w-2xl text-[15px] leading-relaxed text-mute">{t.portfolio.note}</p>
        </Reveal>

        <div className="mt-14 space-y-6 lg:mt-20 lg:space-y-[14vh]">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="p-card lg:sticky"
              style={{ top: desktop ? `calc(110px + ${i * 26}px)` : undefined }}
            >
              <div className="p-card-inner origin-top will-change-transform">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0e0e16] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
                  <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full blur-[110px]" style={{ background: `rgba(${p.accent}, 0.28)` }} />
                  <div className="relative grid gap-8 p-6 sm:p-10 lg:min-h-[480px] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:p-14">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <span className="outline-num font-display text-6xl font-semibold leading-none sm:text-7xl">{p.number}</span>
                        {p.demo && (
                          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-amber-200">
                            {t.portfolio.badge}
                          </span>
                        )}
                      </div>
                      <p className="eyebrow mt-8">{pick(p.category)}</p>
                      <h3 className="mt-3 font-display text-fluid-h3 font-semibold tracking-[-0.02em]">{pick(p.title)}</h3>
                      <p className="mt-4 max-w-md text-fluid-body text-mute">{pick(p.description)}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[13px] text-white/80">
                            {s}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <Button onClick={() => setCurrent(p)} variant="ghost" icon={<ArrowUpRight size={18} />}>
                          {t.portfolio.view}
                        </Button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrent(p)}
                      aria-label={`${t.portfolio.view}: ${pick(p.title)}`}
                      className="group relative block rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 text-left transition-transform duration-700 hover:-translate-y-1.5 sm:p-8"
                    >
                      <div className="transition-transform duration-700 group-hover:scale-[1.02]">
                        <ProjectVisual project={p} title={pick(p.title)} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectModal project={current} onClose={close} />
    </section>
  );
}
