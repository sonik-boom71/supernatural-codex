import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { WeaponCard } from '@/components/armory/WeaponCard';
import { weapons, weaponTypes } from '@/data/weapons';

export const metadata: Metadata = {
  title: 'Оружейная',
  description: 'Кольт, ангельские клинки, Первый Клинок, артефакты и ритуальные средства.',
};

export default function ArmoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Арсенал охотника"
        title="Оружейная"
        description="То, чем убивают неубиваемое. От легендарного Кольта и ангельских клинков до соли, святой воды и дьявольских ловушек."
      />
      <div className="container-page space-y-14 py-10">
        {weaponTypes.map((t) => {
          const list = weapons.filter((w) => w.type === t.id);
          if (list.length === 0) return null;
          return (
            <section key={t.id}>
              <h2 className="mb-6 flex items-center gap-3 font-title text-2xl text-bone">
                <span className="text-2xl">{t.icon}</span> {t.label}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((w) => (
                  <WeaponCard key={w.slug} weapon={w} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
