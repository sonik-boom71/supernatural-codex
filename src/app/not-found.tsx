import Link from 'next/link';
import { Pentagram } from '@/components/icons/Pentagram';
import { routes } from '@/lib/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <Pentagram className="h-24 w-24 text-impala/40 animate-flicker" />
      <h1 className="mt-8 font-brand text-7xl tracking-widest text-bone sm:text-8xl">
        404
      </h1>
      <p className="mt-4 font-title text-2xl text-impala">Эта душа не найдена</p>
      <p className="mt-3 max-w-md text-parchment">
        Похоже, тут поработал левиафан и стёр страницу. Или Чак просто вырезал этот кусок
        сюжета. Вернись на знакомую дорогу.
      </p>
      <Link href={routes.home} className="btn-ember mt-8 text-sm">
        На главную дорогу
      </Link>
    </div>
  );
}
