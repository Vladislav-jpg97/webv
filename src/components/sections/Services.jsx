'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { services } from '@/data/services';
import { openContact } from '@/lib/scroll';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { serviceArt } from './ServiceArt';

// Две карточки с разной шириной: широкая / узкая.
const layouts = [
  { span: 'lg:col-span-7', row: false },
  { span: 'lg:col-span-5', row: false },
];

export default function Services() {
  const { t, pick } = useLanguage();

  return (
    <section id="services" data-hue="240" className="section">
      <div className="container-x">
        <SectionTitle index="02" eyebrow={t.services.eyebrow} title={t.services.title} />

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {services.map((s, i) => {
            const Art = serviceArt[s.id];
            const layout = layouts[i];
            return (
              <Reveal key={s.id} delay={i * 0.08} amount={0.15} className={layout.span}>
                <Card glow={s.glow} className="h-full">
                  <div className={`flex h-full flex-col gap-6 p-6 sm:p-9 ${layout.row ? 'lg:flex-row lg:items-center lg:gap-14 lg:p-12' : ''}`}>
                    {/* Иллюстрация */}
                    <div
                      className={`relative ${layout.row ? 'lg:order-2 lg:w-[42%] lg:shrink-0' : ''}`}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-3xl"
                        style={{ background: `radial-gradient(closest-side, rgba(${s.glow}, 0.35), transparent)` }}
                      />
                      <div className={`relative mx-auto aspect-[4/3] ${layout.row ? 'max-w-sm lg:max-w-none' : 'max-w-[320px]'}`}>
                        <Art />
                      </div>
                    </div>

                    <div className={`flex flex-1 flex-col ${layout.row ? 'lg:order-1' : ''}`}>
                      <div className="flex items-start justify-between gap-4">
                        <span className="outline-num font-display text-[clamp(3.5rem,7vw,5.5rem)] font-semibold leading-none">{s.number}</span>
                        <span className="mt-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">
                          {s.label}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-fluid-h3 font-semibold tracking-[-0.02em]">
                        {pick(s.title)}
                      </h3>
                      <p className="mt-4 max-w-md text-fluid-body text-mute">{pick(s.desc)}</p>

                      <p className="eyebrow mt-8">{t.services.suited}</p>
                      <ul className={`mt-4 grid gap-x-8 gap-y-2.5 ${layout.row ? 'sm:grid-cols-2' : ''}`}>
                        {pick(s.suited).map((item) => (
                          <li key={item} className="flex items-start gap-3 text-fluid-small text-white/80">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: `rgba(${s.glow}, 0.18)`, color: `rgb(${s.glow})` }}>
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-9">
                        <Button onClick={() => openContact(s.projectType)} variant="ghost" icon={<ArrowUpRight size={18} />}>
                          {t.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-sm leading-relaxed text-white/40">{t.services.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
