import type { Metadata } from 'next';
import {
  Bebas_Neue,
  Oswald,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FogOverlay } from '@/components/effects/FogOverlay';
import { CarryOnEasterEgg } from '@/components/effects/CarryOnEasterEgg';
import { RandomQuoteWidget } from '@/components/quotes/RandomQuoteWidget';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});
const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-oswald',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});
const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html
      lang="ru"
      className={`${bebas.variable} ${oswald.variable} ${playfair.variable} ${inter.variable} ${mono.variable}`}
    >
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
