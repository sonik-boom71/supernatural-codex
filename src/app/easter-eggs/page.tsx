import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { easterEggs } from '@/data/easter-eggs';

export const metadata: Metadata = {
  title: 'Пасхалки',
  description: 'Разбор пасхалок и отсылок по сезонам «Сверхъестественного».',
};

export default function EasterEggsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Скрытые знаки"
        title="Пасхалки"
        description="Отсылки к рок-музыке, классике хоррора, другим сериалам CW и сотни мелочей, спрятанных создателями. А ещё — на самом сайте есть свои секреты (попробуй кликнуть по логотипу 7 раз)."
      />
      <div className="container-page py-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {easterEggs.map((egg) => (
            <article key={`${egg.season}-${egg.title}`} className="card-paper p-6">
              <div className="flex items-center gap-3">
                <span className="font-brand text-3xl text-impala">
                  S{String(egg.season).padStart(2, '0')}
                </span>
                <h2 className="font-title text-lg text-bone">{egg.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-parchment">
                {egg.description}
              </p>
            </article>
          ))}
        </div>

        {/* Секреты сайта */}
        <section className="mt-14">
          <h2 className="section-title text-3xl">Секреты этого архива</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { trigger: '7 кликов по логотипу', effect: 'Запускается гимн Carry On Wayward Son.' },
              { trigger: 'Клик 7 раз по «67» в подвале', effect: 'Тот же гимн — отсылка к Импале 1967 года.' },
              { trigger: 'Режим «Ночная охота»', effect: 'Кнопка-луна в шапке включает кромешную тьму.' },
              { trigger: 'Виджет цитаты', effect: 'Сворачивается в крутящуюся пентаграмму в углу.' },
              { trigger: 'Случайная цитата', effect: 'Меняется при каждой перезагрузке главной.' },
              { trigger: 'Монстр дня', effect: 'Своё досье при каждом заходе на главную.' },
            ].map((s) => (
              <div key={s.trigger} className="card-paper p-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-impala">
                  {s.trigger}
                </p>
                <p className="mt-2 text-sm text-parchment">{s.effect}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
