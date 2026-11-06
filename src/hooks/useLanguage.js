'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '@/data/translations';

const STORAGE_KEY = 'vladislav-lang';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Русский по умолчанию; сохранённый выбор читаем после гидратации
  const [lang, setLangState] = useState('ru');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ru' || saved === 'en') setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t.meta.description);
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang],
      // pick({ru, en}) -> строка/массив текущего языка
      pick: (obj) => (obj && typeof obj === 'object' && lang in obj ? obj[lang] : obj),
    }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
