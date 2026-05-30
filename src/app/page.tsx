import Link from 'next/link';
import Image from 'next/image';
import { ImpalaHero } from '@/components/hero/ImpalaHero';
import { DailyShowcase } from '@/components/home/DailyShowcase';
import { EpisodeCard } from '@/components/episodes/EpisodeCard';
import { episodes } from '@/data/episodes';
import { characters } from '@/data/characters';
import { monsters } from '@/data/bestiary';
import { weapons } from '@/data/weapons';
import { quotes } from '@/data/quotes';
import { routes } from '@/lib/routes';

const sections = [
  { href: routes.episodes, label: 'База серий', desc: 'S01–S15, фильтры по монстрам и событиям', icon: '📺' },
  { href: routes.characters, label: 'Персонажи', desc: 'Охотники, ангелы, демоны и боги', icon: '👤' },
  { href: routes.bestiary, label: 'Бестиарий', desc: 'Монстры, слабые места, способы убийства', icon: '👹' },
  { href: routes.armory, label: 'Оружейная', desc: 'Кольт, клинки, артефакты, ритуалы', icon: '🗡️' },
  { href: routes.map, label: 'Карта', desc: 'Ключевые локации Винчестеров', icon: '🗺️' },
  { href: routes.soundtrack, label: 'Саундтрек', desc: 'Плейлист Импалы по сезонам', icon: '🎸' },
];

export default function HomePage() {
  const latest = [...episodes]
    .sort((a, b) => +new Date(b.airDate) - +new Date(a.airDate))
    .slice(0, 3);

  const stats = [
    { value: '327', label: 'серий' },
    { value: '15', label: 'сезонов' },
    { value: characters.length.toString(), label: 'персонажей' },
    { value: monsters.length.toString(), label: 'монстров' },
    { value: weapons.length.toString(), label: 'единиц оружия' },
    { value: quotes.length.toString(), label: 'цитат' },
  ];

  return (
    <>
      <ImpalaHero />

      {/* Полоса статистики */}
      <section className="border-y border-impala/15 bg-night/60">
        <div className="container-page grid grid-cols-3 gap-6 py-8 md:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-brand text-4xl tracking-wider text-impala">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ash">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Кинокадр: Винчестеры и Импала */}
      <section className="relative overflow-hidden">
        <div className="relative h-[52vh] min-h-[360px] w-full">
          <Image
            src="/media/winchesters-road.jpg"
            alt="Сэм и Дин у Импалы на закатной трассе"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Блендинг в тёмную страницу сверху и снизу */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-transparent" />
          <div className="container-page relative flex h-full flex-col justify-center">
            <p className="section-eyebrow animate-fade-up">Дорога — наш дом</p>
            <h2 className="mt-3 max-w-md font-display text-4xl uppercase leading-[0.95] tracking-wide text-bone drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-5xl">
              Семейное дело длиной в 15 сезонов
            </h2>
            <Link href={routes.episodes} className="btn-ember mt-6 w-fit text-sm">
              В дорогу
            </Link>
          </div>
        </div>
      </section>

      {/* Витрина: монстр + цитата дня */}
      <section className="container-page py-16">
        <DailyShowcase />
      </section>

      {/* Последние серии */}
      <section className="container-page py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="section-eyebrow">Из архива</p>
            <h2 className="section-title mt-2">Последние серии</h2>
          </div>
          <Link href={routes.episodes} className="hidden link-spark text-sm sm:block">
            Все серии →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((ep) => (
            <EpisodeCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      {/* Навигация по разделам */}
      <section className="container-page py-16">
        <div className="mb-8">
          <p className="section-eyebrow">Разделы архива</p>
          <h2 className="section-title mt-2">Куда заглянуть</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} className="card-paper group p-6">
              <span className="text-3xl" aria-hidden>
                {s.icon}
              </span>
              <h3 className="mt-3 font-title text-xl text-bone transition-colors group-hover:text-impala">
                {s.label}
              </h3>
              <p className="mt-1 text-sm text-parchment">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Призыв к интерактиву */}
      <section className="container-page py-8 pb-20">
        <div className="card-paper relative overflow-hidden p-10 text-center">
          <div className="absolute inset-0 bg-fog-radial" />
          <div className="relative">
            <p className="section-eyebrow">Проверь себя</p>
            <h2 className="section-title mt-2">Кто ты из охотников?</h2>
            <p className="mx-auto mt-4 max-w-xl text-parchment">
              Пройди тест и узнай, на кого из героев «Сверхъестественного» ты похож.
              Заодно отметь просмотренные серии в личном трекере.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href={routes.quiz} className="btn-ember">
                Пройти тест
              </Link>
              <Link href={routes.tracker} className="link-spark text-sm">
                Трекер просмотра →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
