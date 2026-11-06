// Контактные данные и общие настройки сайта.
// Меняйте значения здесь — они подхватятся во всех секциях.

export const site = {
  brand: 'WebV',
  telegramHandle: '@AdibayVladik',
  telegramUrl: 'https://t.me/AdibayVladik',
  phoneDisplay: '+998 97 097 87 20',
  phoneHref: 'tel:+998970978720',
  year: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
};

// Пункты навигации: id секции + ключ в translations.nav
export const navItems = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'services', key: 'services' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'process', key: 'process' },
  { id: 'contact', key: 'contact' },
];

// Секции без пункта меню подсвечивают ближайший пункт
export const sectionAlias = { faq: 'process' };
