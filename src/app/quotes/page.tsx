import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { QuotesExplorer } from '@/components/quotes/QuotesExplorer';
import { quotes } from '@/data/quotes';

export const metadata: Metadata = {
  title: 'Цитаты',
  description: 'База культовых цитат из «Сверхъестественного» с генератором и фильтром.',
};

export default function QuotesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Слова, что остаются"
        title="Цитаты"
        description="«Driver picks the music», «Son of a bitch!», «Hey, assbutt!» — культовые реплики Винчестеров, Кастиэля, Кроули и других. Жмите «Другая цитата» или фильтруйте по персонажу."
      />
      <div className="container-page py-10">
        <QuotesExplorer quotes={quotes} />
      </div>
    </>
  );
}
