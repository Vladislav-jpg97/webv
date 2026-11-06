import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Плагин регистрируем один раз (только в браузере).
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
