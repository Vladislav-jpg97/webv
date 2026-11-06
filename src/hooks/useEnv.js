'use client';

import { useEffect, useState } from 'react';

export function useMedia(query, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)');
export const useIsMobile = () => useMedia('(max-width: 767px)');
export const useDesktop = () => useMedia('(min-width: 1024px)');
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)');
