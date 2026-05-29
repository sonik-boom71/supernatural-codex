'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Moon as MoonIcon, Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { mainNav, routes } from '@/lib/routes';
import { useTheme } from '@/providers/ThemeProvider';
import { Pentagram } from '@/components/icons/Pentagram';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Пасхалка: 7 кликов по логотипу запускают гимн
  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 7) {
      setLogoClicks(0);
      window.dispatchEvent(new CustomEvent('hc:carry-on'));
    }
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-impala/20 bg-void/85 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={routes.home}
          onClick={handleLogoClick}
          className="group flex items-center gap-2"
        >
          <Pentagram className="h-8 w-8 text-impala transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-brand text-2xl uppercase tracking-[0.2em] text-bone">
            Hunter&apos;s <span className="text-impala">Codex</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-5 xl:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'link-spark font-mono text-xs uppercase tracking-widest',
                  pathname.startsWith(item.href) && 'text-impala',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Переключить режим «Ночная охота»"
            className="rounded-sm border border-impala/30 p-2 text-impala transition-colors hover:bg-impala/10"
          >
            <MoonIcon
              className={cn('h-4 w-4', theme === 'pitch-black' && 'fill-impala')}
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Меню"
            aria-expanded={mobileOpen}
            className="rounded-sm border border-impala/30 p-2 text-impala xl:hidden"
          >
            {mobileOpen ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="border-t border-impala/20 bg-void/95 backdrop-blur-lg xl:hidden">
          <ul className="container-page grid gap-1 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-sm px-3 py-3 font-mono text-sm uppercase tracking-widest text-parchment hover:bg-mortar hover:text-impala',
                    pathname.startsWith(item.href) && 'bg-mortar text-impala',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
