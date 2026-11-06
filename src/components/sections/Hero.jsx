'use client';

import dynamic from 'next/dynamic';
import { ArrowDown, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile, useReducedMotion } from '@/hooks/useEnv';
import { openContact, scrollToId } from '@/lib/scroll';
import Button from '@/components/ui/Button';

// 3D грузится отдельным чанком и не блокирует первый рендер текста
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

// "Создаю *цифровые решения,* ..." -> слова с флагом градиента
function tokenize(title) {
  const out = [];
  title.split('*').forEach((seg, i) => {
    seg
      .split(' ')
      .filter(Boolean)
      .forEach((w) => out.push({ w, g: i % 2 === 1 }));
  });
  return out;
}

const chipIcons = [Globe, Sparkles];

export default function Hero() {
  const { t, lang } = useLanguage();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const words = tokenize(t.hero.title);

  const base = 0.25;

  return (
    <section id="home" data-hue="255" className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 md:pb-28 md:pt-36">
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.18fr_1fr] lg:gap-6">
        {/* Текст */}
        <div data-parallax="0.08" data-parallax-start="top top" className="relative z-10">
          <p className="rise eyebrow flex items-center gap-3 !text-white/70" style={{ '--d': `${base}s` }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
            </span>
            {t.hero.eyebrow}
          </p>

          <h1 className="mt-6 font-display font-semibold tracking-[-0.025em] text-fluid-h1">
            {words.map((tok, i) => (
              <span key={`${lang}-${i}`}>
                <span className="word-mask">
                  <span className={`word-in ${tok.g ? 'text-grad' : ''}`} style={{ '--d': `${base + 0.1 + i * 0.07}s` }}>
                    {tok.w}
                  </span>
                </span>
                {i < words.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <p className="rise mt-7 flex items-center gap-4 text-fluid-body font-semibold text-white" style={{ '--d': `${base + 0.75}s` }}>
            <span className="h-px w-10 bg-gradient-to-r from-accent to-ice" />
            {t.hero.name}
          </p>
          <p className="rise mt-4 max-w-xl text-fluid-body text-mute" style={{ '--d': `${base + 0.85}s` }}>
            {t.hero.desc}
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ '--d': `${base + 1}s` }}>
            <Button onClick={() => openContact()} size="lg" icon={<ArrowUpRight size={20} />} className="w-full sm:w-auto">
              {t.hero.primary}
            </Button>
            <Button onClick={() => scrollToId('portfolio')} variant="ghost" size="lg" className="w-full sm:w-auto">
              {t.hero.secondary}
            </Button>
          </div>

          <ul className="rise mt-12 flex flex-wrap gap-x-7 gap-y-3" style={{ '--d': `${base + 1.15}s` }}>
            {t.hero.tags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-white/55">
                <span className="font-semibold text-accent">0{i + 1}</span>
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Визуальная композиция */}
        <div data-parallax="0.05" data-parallax-start="top top" className="fade-in relative mx-auto aspect-[4/4.6] w-full max-w-[28.75rem] lg:max-w-[35rem]" style={{ '--d': '0.5s' }}>
          <div className="absolute inset-[-6%] md:inset-0">
            <HeroScene mobile={mobile} reduced={reduced} />
          </div>

          {/* Плавающие чипы */}
          {[
            { pos: 'right-[2%] top-[16%]', d: '0s' },
            { pos: 'right-[6%] bottom-[18%]', d: '1.4s' },
          ].map((c, i) => {
            const Icon = chipIcons[i];
            return (
              <div key={i} className={`absolute z-20 ${c.pos}`}>
                <div className="floaty glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-[12.5px] font-semibold shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]" style={{ '--fd': `${5 + i}s`, '--fdelay': c.d }}>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent to-electric">
                    <Icon size={14} />
                  </span>
                  {t.hero.tags[i]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Подсказка прокрутки */}
      <button
        type="button"
        onClick={() => scrollToId('about')}
        className="fade-in absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-white/40 transition hover:text-white md:flex"
        style={{ '--d': '2s' }}
      >
        {t.hero.scroll}
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
