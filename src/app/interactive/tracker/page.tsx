import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { WatchTracker } from '@/components/interactive/WatchTracker';

export const metadata: Metadata = {
  title: 'Трекер просмотра',
  description: 'Отмечай просмотренные серии и следи за статистикой.',
};

export default function TrackerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Личный архив"
        title="Трекер просмотра"
        description="Отмечай серии, что уже посмотрел, и следи за прогрессом по каждому сезону. Данные хранятся локально в твоём браузере."
      />
      <div className="container-page py-10">
        <WatchTracker />
      </div>
    </>
  );
}
