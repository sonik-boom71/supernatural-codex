import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FogOverlay } from '@/components/effects/FogOverlay';
import { CarryOnEasterEgg } from '@/components/effects/CarryOnEasterEgg';
import { RandomQuoteWidget } from '@/components/quotes/RandomQuoteWidget';

export const metadata: Metadata = {
  metadataBase: new URL('https://hunters-codex.vercel.app'),
  title: {
    default: "Hunter's Codex — энциклопедия «Сверхъестественного»",
    template: "%s · Hunter's Codex",
  },
  description:
    'Архив Хранителей Знания: серии, персонажи, бестиарий, оружейная, карта, цитаты и саундтрек сериала «Сверхъестественное» (Supernatural).',
  keywords: [
    'Сверхъестественное',
    'Supernatural',
    'Винчестеры',
    'энциклопедия',
    'бестиарий',
    'охотники',
  ],
  openGraph: {
    title: "Hunter's Codex",
    description: 'Тёмная мистическая энциклопедия вселенной «Сверхъестественного».',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Шрифты грузятся браузером, а не на этапе сборки —
            так Vercel-сборка не зависит от доступности fonts.gstatic.com. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- ссылка в корневом layout грузится для всех страниц */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300..700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          <FogOverlay />
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <RandomQuoteWidget />
          <CarryOnEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
