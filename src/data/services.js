// Услуги. Поля {ru, en} — тексты на двух языках.
// projectType — значение, которое подставляется в форму заявки (landing | multipage | other).

export const services = [
  {
    id: 'landing',
    number: '01',
    label: 'LANDING PAGE',
    projectType: 'landing',
    glow: '109, 92, 255',
    title: { ru: 'Одностраничные сайты', en: 'One-page websites' },
    desc: {
      ru: 'Современные сайты, которые презентуют ваш бизнес, продукт или услугу на одной странице.',
      en: 'Modern websites that present your business, product or service on a single page.',
    },
    suited: {
      ru: ['Презентация бизнеса', 'Продажа отдельного продукта', 'Реклама услуги', 'Сбор заявок', 'Презентация мероприятия'],
      en: ['Business presentation', 'Selling a single product', 'Advertising a service', 'Collecting requests', 'Event presentation'],
    },
  },
  {
    id: 'multipage',
    number: '02',
    label: 'MULTI-PAGE WEBSITE',
    projectType: 'multipage',
    glow: '47, 123, 255',
    title: { ru: 'Многостраничные сайты', en: 'Multi-page websites' },
    desc: {
      ru: 'Полноценные сайты с отдельными страницами для различных направлений вашего бизнеса.',
      en: 'Full-featured websites with separate pages for different areas of your business.',
    },
    suited: {
      ru: ['Сайты компаний', 'Корпоративные сайты', 'Каталоги услуг', 'Сайты образовательных проектов', 'Информационные ресурсы'],
      en: ['Company websites', 'Corporate websites', 'Service catalogs', 'Educational project websites', 'Information resources'],
    },
  },
];
