import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { SubmitStory } from '@/components/interactive/SubmitStory';

export const metadata: Metadata = {
  title: 'Своя страшилка',
  description: 'Поделись своей страшной историей анонимно или под ником.',
};

export default function SubmitStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Истории у костра"
        title="Своя страшилка"
        description="У каждого охотника есть история, от которой стынет кровь. Расскажи свою."
      />
      <div className="container-page py-10">
        <SubmitStory />
      </div>
    </>
  );
}
