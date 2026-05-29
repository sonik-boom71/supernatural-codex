import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { CharactersExplorer } from '@/components/characters/CharactersExplorer';
import { characters } from '@/data/characters';

export const metadata: Metadata = {
  title: 'Энциклопедия персонажей',
  description: 'Охотники, ангелы, демоны, боги и люди вселенной «Сверхъестественного».',
};

export default function CharactersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Досье · Кто есть кто"
        title="Персонажи"
        description="От братьев Винчестеров и ангела Кастиэля до Кроули, Джека и самой Тьмы. Фильтруйте по лагерю: охотники, ангелы, демоны, боги, люди."
      />
      <div className="container-page py-10">
        <CharactersExplorer characters={characters} />
      </div>
    </>
  );
}
