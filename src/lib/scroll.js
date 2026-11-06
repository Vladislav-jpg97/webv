export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  try {
    history.replaceState(null, '', `#${id}`);
  } catch {}
}

// Прокрутка к форме; type — предвыбранный тип проекта (landing | multipage | other)
export function openContact(type) {
  if (type) window.dispatchEvent(new CustomEvent('vl:prefill', { detail: { type } }));
  scrollToId('contact');
}
