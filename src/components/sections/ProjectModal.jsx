'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { openContact } from '@/lib/scroll';
import Button from '@/components/ui/Button';
import ProjectVisual from './Mockups';

// Окно просмотра проекта. project === null — закрыто.
export default function ProjectModal({ project, onClose }) {
  const { t, pick } = useLanguage();
  const closeRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button type="button" aria-label={t.portfolio.close} onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-md" tabIndex={-1} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={pick(project.title)}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#0d0d15] sm:rounded-[2rem]"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[90px]" style={{ background: `rgba(${project.accent}, 0.35)` }} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t.portfolio.close}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 transition hover:bg-white/10"
            >
              <X size={20} />
            </button>

            <div className="relative grid gap-8 p-6 pt-8 sm:p-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex items-center rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-8">
                <div className="w-full">
                  <ProjectVisual project={project} title={pick(project.title)} />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2.5 pr-12">
                  {project.demo && (
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-amber-200">
                      {t.portfolio.badge}
                    </span>
                  )}
                  <span className="eyebrow">{pick(project.category)}</span>
                </div>
                <h3 className="mt-5 font-display text-fluid-h3 font-semibold tracking-tight">{pick(project.title)}</h3>
                <p className="mt-4 text-fluid-body text-mute">{pick(project.description)}</p>

                <p className="eyebrow mt-8">{t.portfolio.features}</p>
                <ul className="mt-4 space-y-2.5">
                  {pick(project.features).map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14.5px] text-white/85">
                      <Check size={16} className="shrink-0 text-ice" /> {f}
                    </li>
                  ))}
                </ul>

                <p className="eyebrow mt-8">{t.portfolio.stack}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[13px] text-white/80">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => {
                      const type = project.type;
                      onClose();
                      setTimeout(() => openContact(type), 350);
                    }}
                    icon={<ArrowUpRight size={18} />}
                  >
                    {t.portfolio.discuss}
                  </Button>
                  {project.url && (
                    <Button href={project.url} external variant="ghost">
                      {t.portfolio.open}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
