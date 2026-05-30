import { Database } from 'lucide-react';

export function ForumNotConfigured() {
  return (
    <div className="card-paper mx-auto max-w-2xl p-8 text-center">
      <Database className="mx-auto h-12 w-12 text-impala/40" />
      <h2 className="mt-5 font-title text-2xl text-bone">Форум ещё не подключён</h2>
      <p className="mt-3 text-parchment">
        Это рабочий форум на Prisma + Postgres с авторизацией. Чтобы он заработал,
        нужно подключить бесплатную базу данных Neon и задать переменные окружения.
      </p>
      <div className="mt-6 rounded-sm border border-impala/20 bg-night p-5 text-left">
        <p className="font-mono text-[11px] uppercase tracking-widest text-impala/80">
          Быстрый старт
        </p>
        <ol className="mt-3 space-y-2 text-sm text-parchment">
          <li>
            1. Создай проект на{' '}
            <span className="text-impala">neon.tech</span> и скопируй connection string.
          </li>
          <li>
            2. В Vercel → Settings → Environment Variables добавь{' '}
            <code className="text-impala">DATABASE_URL</code>,{' '}
            <code className="text-impala">DIRECT_URL</code>,{' '}
            <code className="text-impala">NEXTAUTH_SECRET</code>,{' '}
            <code className="text-impala">NEXTAUTH_URL</code>.
          </li>
          <li>
            3. Применить схему:{' '}
            <code className="text-impala">npx prisma db push</code>.
          </li>
          <li>4. Передеплой — форум оживёт.</li>
        </ol>
        <p className="mt-4 text-xs text-ash">
          Подробности — в README проекта (раздел «Бэкенд»).
        </p>
      </div>
    </div>
  );
}
