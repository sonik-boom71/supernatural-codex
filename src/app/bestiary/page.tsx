import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { BestiaryExplorer } from '@/components/bestiary/BestiaryExplorer';
import { monsters } from '@/data/bestiary';

export const metadata: Metadata = {
  title: 'Бестиарий',
  description:
    'Полный определитель монстров и сверхъестественных существ: слабые места и способы убийства.',
};

export default function BestiaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Определитель тварей"
        title="Бестиарий"
        description="Призраки, оборотни, вампиры, демоны, ангелы, левиафаны и древние боги. У каждого досье — уровень угрозы, слабое место и проверенный способ упокоить."
      />
      <div className="container-page py-10">
        <BestiaryExplorer monsters={monsters} />
      </div>
    </>
  );
}
