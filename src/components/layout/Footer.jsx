'use client';

import { ArrowUp, Phone, Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { navItems, site } from '@/data/site';
import { scrollToId } from '@/lib/scroll';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 overflow-hidden">
      <div className="container-x">
        {/* Колонки */}
        <div className="grid gap-12 border-t border-white/[0.08] pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-[0.02em]">
              {site.brand}
              <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-ice" />
            </p>
            <p className="mt-4 max-w-xs text-fluid-small leading-relaxed text-mute">{t.footer.tagline}</p>
            <div className="mt-7 flex gap-2.5">
              <a
                href={site.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-accent hover:to-electric"
              >
                <Send size={17} />
              </a>
              <a
                href={site.phoneHref}
                aria-label={site.phoneDisplay}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gradient-to-br hover:from-accent hover:to-electric"
              >
                <Phone size={17} />
              </a>
            </div>
            <button
              type="button"
              onClick={() => scrollToId('home')}
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 py-1.5 pl-4 pr-1.5 text-sm text-white/65 transition hover:border-white/30 hover:text-white"
            >
              {t.footer.top}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 transition group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-electric">
                <ArrowUp size={15} />
              </span>
            </button>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <p className="eyebrow">{t.footer.navTitle}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 md:block md:space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    className="group inline-flex items-center gap-2 text-fluid-small text-white/65 transition hover:text-white"
                  >
                    <span className="h-px w-0 bg-gradient-to-r from-accent to-ice transition-all duration-300 group-hover:w-4" />
                    {t.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">{t.footer.contactTitle}</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a href={site.telegramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-fluid-small text-white/75 transition hover:text-white">
                  <Send size={16} className="text-accent" /> {site.telegramHandle}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 text-fluid-small text-white/75 transition hover:text-white">
                  <Phone size={16} className="text-accent" /> {site.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-14" />
      </div>
    </footer>
  );
}
