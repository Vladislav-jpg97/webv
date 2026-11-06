'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { faq } from '@/data/faq';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/ui/Accordion';

export default function FAQ() {
  const { t, pick } = useLanguage();
  const items = faq.map((f) => ({ q: pick(f.q), a: pick(f.a) }));

  return (
    <section id="faq" data-hue="245" className="section">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle index="05" eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm text-fluid-body text-mute">{t.faq.desc}</p>
          </Reveal>
        </div>
        <Reveal delay={0.08} amount={0.1}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
