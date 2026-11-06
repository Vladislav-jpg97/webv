// ПОРТФОЛИО. Чтобы добавить/изменить/удалить проект — правьте только этот массив.
//
// mock    — какой встроенный макет рисовать, пока нет скриншота: 'landing' | 'corporate'
// image   — путь к реальному скриншоту, например '/images/projects/my-site.webp' (файл положите в public/images/projects/)
// url     — ссылка на живой проект (если указана, в окне проекта появится кнопка «Открыть проект»)
// demo    — true для демонстрационных концептов (показывается бейдж Demo / Concept).
//           Для реальных работ поставьте demo: false.
// type    — тип проекта для формы заявки: landing | multipage | other
// accent  — цвет свечения карточки (R, G, B)

export const projects = [
  {
    id: 'business-landing',
    number: '01',
    demo: true,
    mock: 'landing',
    image: null,
    url: null,
    type: 'landing',
    accent: '109, 92, 255',
    title: { ru: 'Business Landing Page', en: 'Business Landing Page' },
    category: { ru: 'Одностраничный сайт', en: 'One-page website' },
    description: {
      ru: 'Концепт сайта для презентации бизнеса: сильный первый экран, блоки услуг и форма заявки.',
      en: 'A concept of a website that presents a business: a strong first screen, service blocks and a request form.',
    },
    features: {
      ru: ['Выразительный первый экран', 'Блоки услуг и преимуществ', 'Форма заявки', 'Адаптивная вёрстка'],
      en: ['Expressive first screen', 'Service and benefit blocks', 'Request form', 'Responsive layout'],
    },
    stack: ['Next.js', 'Tailwind CSS', 'GSAP'],
  },
  {
    id: 'corporate-website',
    number: '02',
    demo: true,
    mock: 'corporate',
    image: null,
    url: null,
    type: 'multipage',
    accent: '47, 123, 255',
    title: { ru: 'Corporate Website', en: 'Corporate Website' },
    category: { ru: 'Многостраничный сайт', en: 'Multi-page website' },
    description: {
      ru: 'Концепт корпоративного сайта с отдельными страницами для направлений компании и каталогом услуг.',
      en: 'A concept of a corporate website with separate pages for the company’s areas and a service catalog.',
    },
    features: {
      ru: ['Отдельные страницы направлений', 'Каталог услуг', 'Единая навигация', 'Страница контактов'],
      en: ['Separate pages for each area', 'Service catalog', 'Unified navigation', 'Contacts page'],
    },
    stack: ['Next.js', 'React', 'Tailwind CSS'],
  },
];
