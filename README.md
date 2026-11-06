# WebV — премиальное портфолио

Одностраничный сайт-портфолио независимого веб-разработчика Тё Владислава.
Next.js (App Router) · JavaScript · React · Tailwind CSS · GSAP + ScrollTrigger · Motion · React Three Fiber · Lucide.
Контент полностью статический: без backend и баз данных.

## Установка и запуск

```bash
npm install
npm run dev        # режим разработки → http://localhost:3000
npm run build      # production-сборка
npm run start      # запуск собранной версии
```

Нужен Node.js 18.18+ (проверено на Node 22).

Перед публикацией задайте адрес сайта (для Open Graph):
`NEXT_PUBLIC_SITE_URL=https://ваш-домен.com npm run build`

## Где что менять

| Что | Файл |
|---|---|
| Контакты (Telegram, телефон), бренд, пункты меню | `src/data/site.js` |
| Все тексты интерфейса RU / EN | `src/data/translations.js` |
| Услуги (3 карточки) | `src/data/services.js` |
| Портфолио | `src/data/projects.js` |
| Вопросы и ответы FAQ | `src/data/faq.js` |
| Сборка сообщения и валидация формы | `src/lib/telegram.js` |

### Изменить контактные данные
Откройте `src/data/site.js` и поправьте `telegramHandle`, `telegramUrl`, `phoneDisplay`, `phoneHref`.
Для формы заявки адресат берётся из `telegramUrl`. В `translations.js` (раздел `contact.done.steps`) упоминается `@AdibayVladik` — замените и там, если смените ник.

### Добавить фотографию
Фото лежит в `public/images/profile.webp` (сейчас там ваше). Чтобы заменить — подставьте файл с тем же именем (лучше квадрат или 4:5, до 200 КБ) и перезапустите проект.
Наличие файла определяется при запуске/сборке. Пока файла нет, показывается монограмма «ТВ», а лишних запросов (404) нет.
Фото показывается только в блоке «Обо мне».

### Добавить / изменить / удалить проект
Правьте массив в `src/data/projects.js` — JSX менять не нужно. Каждый проект:
`id`, `number`, `demo`, `mock`, `image`, `url`, `type`, `accent`, `title/category/description/features {ru,en}`, `stack`.
- Реальный скриншот: положите файл в `public/images/projects/` и укажите `image: '/images/projects/my-site.webp'`.
- Реальная работа: `demo: false` (бейдж «Demo / Concept» исчезнет) и, при желании, `url: 'https://...'`.
- Удалить проект — удалите его объект из массива.

Сейчас в портфолио три **демонстрационных концепта** (помечены Demo / Concept), не реальные клиентские проекты.

### Редактировать переводы
Откройте `src/data/translations.js`: объекты `ru` и `en` зеркальны. В `hero.title` фрагмент между `*звёздочками*` подсвечивается градиентом.
Язык по умолчанию — русский; выбор сохраняется в `localStorage`.
Имя в английской версии записано как «Tyo Vladislav» — при необходимости поменяйте в `hero.name`, `about.lead`, `meta.title`, `photo.alt`.

## Форма заявки (без backend)
Форма проверяет поля, собирает сообщение и открывает `https://t.me/AdibayVladik?text=...` (чат с готовым текстом).
Текст дополнительно копируется в буфер обмена. Запасной вариант — официальный share-URL `https://t.me/share/url?...` (кнопка «Выбрать чат вручную»).
Сайт **не заявляет** об отправке: заявка уходит только когда пользователь сам нажмёт «Отправить» в Telegram — об этом написано в инструкции после нажатия кнопки.

## Структура
```
src/app            layout, page, globals.css, иконка, OG-картинка
src/components
  layout/          Header, Navigation (desktop + mobile), Footer
  ui/              Button (магнитная), Card (3D tilt), Accordion, LanguageSwitcher, SectionTitle, Reveal, ProfilePhoto
  animations/      ScrollAnimations (GSAP), Cursor, BackgroundEffects
src/data           site, translations, services, projects, faq
src/hooks          useLanguage, useEnv
src/lib            telegram, gsap, scroll
public/images      profile.webp (ваше фото), projects/
```

## Анимации и производительность
- Прелоадера нет: Hero появляется сразу (CSS-анимации, без блокировок).
- GSAP/ScrollTrigger: параллакс, смена оттенка фона по секциям, scrub-текст, маска фото, линия прогресса, стопка карточек портфолио. Всё в `gsap.context` и чистится при размонтировании. Motion отвечает за появления, hover и микровзаимодействия — на разных элементах, конфликтов нет.
- Один WebGL-холст (Hero), ставится на паузу вне экрана, на мобильных упрощён.
- `prefers-reduced-motion` отключает тяжёлые эффекты; кастомный курсор — только для мыши.
