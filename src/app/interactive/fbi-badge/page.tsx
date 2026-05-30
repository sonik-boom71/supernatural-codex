import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { FbiBadgeGenerator } from '@/components/interactive/FbiBadgeGenerator';

export const metadata: Metadata = {
  title: 'Удостоверение охотника',
  description:
    'Сделай себе поддельное удостоверение ФБР в стиле Винчестеров: имя, фото, ведомство — скачай и поделись.',
};

export default function FbiBadgePage() {
  return (
    <>
      <PageHeader
        eyebrow="FBI · «Эй, мы из ФБР»"
        title="Удостоверение охотника"
        description="Любимый трюк Винчестеров — корочка ФБР и уверенный вид. Впиши имя (или возьми рок-псевдоним), загрузи фото, выбери ведомство и забирай свой значок."
      />
      <div className="container-page py-10">
        <FbiBadgeGenerator />
      </div>
    </>
  );
}
