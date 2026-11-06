'use client';

import { Asterisk } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Светлая "лента" между Hero и About: контрастный переход между секциями.
export default function Ribbon() {
  const { t } = useLanguage();
  const items = [...t.hero.tags, 'Landing Pages', 'Multi-page Websites'];
  const row = [...items, ...items];

  return (
    <div aria-hidden="true" className="relative z-10 -my-4 overflow-hidden py-10">
      <div className="marquee -rotate-[1.6deg] scale-[1.03] border-y border-black/10 bg-[#e9e6ff] py-4 text-ink shadow-[0_0_80px_-10px_rgba(109,92,255,0.5)]">
        <div className="marquee-track" style={{ '--speed': '48s' }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {row.map((txt, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-8 pr-8 font-display text-xl font-semibold uppercase tracking-tight sm:text-3xl">
                  {txt}
                  <Asterisk size={26} className="text-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
