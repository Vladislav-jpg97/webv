'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';
import { site } from '@/data/site';
import { openContact, scrollToId } from '@/lib/scroll';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import Button from '@/components/ui/Button';
import { DesktopNav, MobileMenu, useActiveSection } from './Navigation';

export default function Header() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`flex w-full items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? 'max-w-[65rem] border-white/[0.12] bg-[#0a0a10]/75 py-2 pl-5 pr-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]'
              : 'max-w-[77.5rem] border-white/[0.06] bg-white/[0.025] py-2.5 pl-5 pr-2.5'
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('home');
            }}
            aria-label={`${site.brand} — ${t.nav.home}`}
            className="group flex items-center gap-0.5 font-display text-[17px] font-semibold tracking-[0.02em]"
          >
            {site.brand}
            <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent to-ice transition-transform duration-500 group-hover:scale-[2.2]" />
          </a>

          <DesktopNav active={active} />

          <div className="flex items-center gap-2">
            <LanguageSwitcher id="lang-desktop" className="hidden sm:inline-flex" />
            <Button onClick={() => openContact()} size="sm" className="hidden md:inline-flex">
              {t.cta}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.menu}
              className="relative z-50 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] lg:hidden"
            >
              <span className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded bg-white transition-all duration-500 ${
                    open ? 'top-[5px] rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-[5px] h-[1.5px] w-full rounded bg-white transition-all duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full rounded bg-white transition-all duration-500 ${
                    open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={open} onClose={close} active={active} />
    </>
  );
}
