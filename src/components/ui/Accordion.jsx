'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';

// items: [{ q: string, a: string }]. Одновременно открыт один пункт.
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="group relative">
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7"
              >
                <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 text-fluid-small !text-[clamp(1.0625rem,0.95rem+0.55vw,1.4rem)] font-semibold leading-snug transition-colors duration-300 ${
                    isOpen ? 'text-white' : 'text-white/75 group-hover:text-white'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    isOpen
                      ? 'rotate-[135deg] border-transparent bg-gradient-to-br from-accent to-electric text-white'
                      : 'border-white/15 text-white/70 group-hover:border-white/40'
                  }`}
                >
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-a${i}`}
                  role="region"
                  aria-labelledby={`${uid}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-[calc(1rem+1.5rem)] pr-4 text-fluid-body text-mute sm:pl-[calc(1.5rem+1.5rem)]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
