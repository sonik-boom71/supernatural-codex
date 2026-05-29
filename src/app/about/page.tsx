import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'О проекте',
  description: 'Hunter\'s Codex — фанатская энциклопедия по сериалу «Сверхъестественное».',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Men of Letters"
        title="О проекте"
        description="Hunter's Codex — некоммерческий фанатский архив вселенной «Сверхъестественного»."
      />
      <div className="container-page py-10">
        <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-parchment">
          <p>
            <span className="font-title text-impala">Hunter&apos;s Codex</span> —
            это дань уважения сериалу «Сверхъестественное» (Supernatural, 2005–2020) и
            его фандому SPN Family. Здесь собраны серии, персонажи, бестиарий, оружейная,
            карта локаций, цитаты и саундтрек — всё, что нужно охотнику в дороге.
          </p>
          <p>
            Название отсылает к Хранителям Знания (Men of Letters) — тайному обществу
            архивариусов сверхъестественного, чьим наследием стал бункер Винчестеров.
            Девиз на гербе —{' '}
            <span className="font-serif italic text-bone">«Non timebo mala»</span>,
            «не убоюсь зла»: та же гравировка, что на Кольте и клинке Дина.
          </p>
          <p>
            Сайт построен на Next.js 14 (App Router), TypeScript, Tailwind CSS и
            Framer Motion. Данные хранятся статически, трекер просмотра и опросы — в
            localStorage браузера, так что всё работает без бэкенда. Архитектура готова
            к подключению PostgreSQL + Prisma и авторизации для полноценного форума.
          </p>
          <p className="text-base text-ash">
            Проект создан исключительно в образовательных и развлекательных целях. Все
            права на «Сверхъестественное», персонажей и торговые марки принадлежат
            Warner Bros. Television и The CW. Изображения-заглушки не являются официальными
            материалами.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={routes.episodes} className="btn-ember text-sm">
              Открыть архив
            </Link>
            <Link href={routes.quiz} className="link-spark text-sm">
              Пройти тест охотника →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
