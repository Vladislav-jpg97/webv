'use client';

import { motion } from 'motion/react';
import { useLanguage } from '@/hooks/useLanguage';

// Сегментированный переключатель RU / EN. id нужен, чтобы layoutId не конфликтовал между экземплярами.
export default function LanguageSwitcher({ id = 'lang', className = '' }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={`relative inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1 ${className}`}
    >
      {['ru', 'en'].map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            lang={code}
            className={`relative z-10 min-w-[40px] rounded-full px-3 py-1.5 font-mono text-xs font-semibold tracking-wider transition-colors ${
              active ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-thumb`}
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-accent to-electric"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
