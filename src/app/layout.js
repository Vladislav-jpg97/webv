import '@fontsource-variable/manrope';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';

import { LanguageProvider } from '@/hooks/useLanguage';
import { translations } from '@/data/translations';
import { site } from '@/data/site';

const ru = translations.ru;

export const metadata = {
  metadataBase: new URL(site.url),
  title: ru.meta.title,
  description: ru.meta.description,
  applicationName: 'WebV',
  authors: [{ name: 'Тё Владислав' }],
  keywords: ['разработка сайтов', 'landing page', 'веб-разработчик', 'Next.js', 'web developer'],
  openGraph: {
    type: 'website',
    title: ru.meta.title,
    description: ru.meta.description,
    siteName: 'WebV',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
  },
  twitter: { card: 'summary_large_image', title: ru.meta.title, description: ru.meta.description },
};

export const viewport = {
  themeColor: '#07070b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
