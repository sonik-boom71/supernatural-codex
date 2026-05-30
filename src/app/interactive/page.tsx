import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { routes } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Интерактив',
  description: 'Тест, квиз, трекер просмотра и форма страшных историй.',
};

const cards = [
  {
    href: routes.fbiBadge,
    icon: '🪪',
    title: 'Удостоверение охотника',
    desc: 'Сделай себе корочку ФБР как у Винчестеров: имя, фото — скачай и поделись.',
  },
  {
    href: routes.quiz,
    icon: '🧭',
    title: 'Кто ты из охотников?',
    desc: 'Ответь на 6 вопросов и узнай, на кого из героев ты похож.',
  },
  {
    href: routes.guessEpisode,
    icon: '🔎',
    title: 'Угадай серию',
    desc: 'Определи эпизод по описанию дела. Сколько угадаешь подряд?',
  },
  {
    href: routes.tracker,
    icon: '✅',
    title: 'Трекер просмотра',
    desc: 'Отмечай просмотренные серии и следи за прогрессом по сезонам.',
  },
  {
    href: routes.submitStory,
    icon: '👻',
    title: 'Своя страшилка',
    desc: 'Поделись жуткой историей — анонимно или под ником.',
  },
];

export default function InteractivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Поиграем"
        title="Интерактив"
        description="Тесты, квизы и личный трекер. Узнай своего внутреннего охотника, проверь память на серии и отметь, что уже пересмотрел."
      />
      <div className="container-page py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className="card-paper group p-8">
              <span className="text-4xl" aria-hidden>
                {c.icon}
              </span>
              <h2 className="mt-4 font-title text-2xl text-bone transition-colors group-hover:text-impala">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-parchment">{c.desc}</p>
              <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-widest text-impala">
                Начать →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
