'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { LogIn, LogOut, User } from 'lucide-react';
import { routes } from '@/lib/routes';

export function AccountButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="h-4 w-16 animate-pulse rounded bg-mortar" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={routes.forum}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-impala"
        >
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">{session.user.username}</span>
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: routes.home })}
          aria-label="Выйти"
          className="rounded-sm border border-impala/30 p-2 text-ash transition-colors hover:text-hell"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <Link
      href={routes.login}
      className="flex items-center gap-1.5 rounded-sm border border-impala/30 px-3 py-2 font-mono text-xs uppercase tracking-widest text-impala transition-colors hover:bg-impala/10"
    >
      <LogIn className="h-4 w-4" />
      <span className="hidden sm:inline">Войти</span>
    </Link>
  );
}
