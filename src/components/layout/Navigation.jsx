'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Send, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { navItems, sectionAlias, site } from '@/data/site';
import { scrollToId, openContact } from '@/lib/scroll';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import Button from '@/components/ui/Button';

// Определяет секцию, которая сейчас в центре экрана.
export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const ids = [...navItems.map((n) => n.id), ...Object.keys(sectionAlias)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(sectionAlias[e.target.id] || e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function DesktopNav({ active }) {
  const { t } = useLanguage();
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToId(item.id);
            }}
            className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
              isActive ? 'text-white' : 'text-white/55 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] ring-1 ring-inset ring-white/10"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {t.nav[item.key]}
          </a>
        );
      })}
    </nav>
  );
}

export function MobileMenu({ open, onClose, active }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const go = (id) => {
    onClose();
    // даём меню закрыться, затем скроллим (скролл заблокирован, пока меню открыто)
    setTimeout(() => scrollToId(id), 60);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          initial={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 38px) 38px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 38px) 38px)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-[#08080d] px-6 pb-8 pt-28 lg:hidden"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/30 blur-[90px]" />
          <nav className="relative flex flex-1 flex-col justify-center gap-1.5">
            {navItems.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="group flex items-baseline gap-4 border-b border-white/[0.06] py-3.5"
              >
                <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`font-display text-[1.65rem] font-semibold tracking-tight ${
                    active === item.id ? 'text-grad' : 'text-white'
                  }`}
                >
                  {t.nav[item.key]}
                </span>
              </motion.a>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="relative mt-6 space-y-5"
          >
            <Button
              onClick={() => {
                onClose();
                setTimeout(() => openContact(), 60);
              }}
              size="lg"
              className="w-full"
              magnetic={false}
            >
              {t.cta}
            </Button>
            <div className="flex items-center justify-between gap-3">
              <LanguageSwitcher id="lang-mobile" />
              <div className="flex gap-2">
                <a
                  href={site.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                >
                  <Send size={18} />
                </a>
                <a
                  href={site.phoneHref}
                  aria-label={site.phoneDisplay}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
