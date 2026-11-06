import { site } from '@/data/site';

// Собирает структурированное сообщение для Telegram из данных формы.
export function buildMessage(values, t) {
  const c = t.contact;
  return [
    c.msgHeader,
    '',
    `${c.fName}: ${values.name.trim()}`,
    `${c.fContact}: ${values.contact.trim()}`,
    `${c.fType}: ${c.types[values.type]}`,
    '',
    `${c.fMessage}:`,
    values.message.trim(),
  ].join('\n');
}

// Прямой чат с предзаполненным текстом.
export const chatLink = (text) => `${site.telegramUrl}?text=${encodeURIComponent(text)}`;

// Официальный Telegram share URL (открывает выбор чата с готовым текстом).
export const shareLink = (text) =>
  `https://t.me/share/url?url=${encodeURIComponent(site.telegramUrl)}&text=${encodeURIComponent(text)}`;

// Валидация полей формы. Возвращает объект ошибок по ключам name/contact/type/message.
export function validate(values, t) {
  const e = {};
  const err = t.contact.errors;
  if (values.name.trim().length < 2) e.name = err.name;

  const c = values.contact.trim();
  const isHandle = /^@?[a-zA-Z0-9_]{4,32}$/.test(c);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
  const isPhone = /^\+?[\d\s()\-]{7,20}$/.test(c) && c.replace(/\D/g, '').length >= 7;
  if (!(isHandle || isEmail || isPhone)) e.contact = err.contact;

  if (!values.type) e.type = err.type;
  if (values.message.trim().length < 10) e.message = err.message;
  return e;
}
