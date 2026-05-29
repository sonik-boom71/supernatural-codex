import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { locations } from '@/data/locations';

export const metadata: Metadata = {
  title: 'Карта Винчестеров',
  description: 'Ключевые локации сериала: Лоренс, бункер, Ад, Чистилище, Небеса.',
};

export default function MapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Маршруты Импалы"
        title="Карта Винчестеров"
        description="Где всё начиналось и куда заводила охота. Города, бункер Хранителей Знания и потусторонние миры — кликайте по меткам."
      />
      <div className="container-page py-10">
        <InteractiveMap locations={locations} />
      </div>
    </>
  );
}
