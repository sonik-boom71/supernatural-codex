import type { MapLocation } from '@/types';

// x/y — проценты на стилизованной карте США (0,0 — левый верхний угол).
export const locations: MapLocation[] = [
  {
    slug: 'lawrence',
    name: 'Lawrence, Kansas',
    nameRu: 'Лоренс, Канзас',
    kind: 'city',
    x: 60,
    y: 49,
    description:
      'Родной город Винчестеров. Здесь сгорела Мэри, отсюда началась вся история. Сюда же братья возвращаются в серии «Дом».',
    episode: 's01e09',
  },
  {
    slug: 'lebanon',
    name: 'Lebanon, Kansas',
    nameRu: 'Лебанон, Канзас',
    kind: 'bunker',
    x: 58,
    y: 46,
    description:
      'Бункер Хранителей Знания — дом Винчестеров с 8 сезона. Защищённое хранилище лора, оружия и артефактов в географическом центре США.',
    episode: 's14e13',
  },
  {
    slug: 'jericho',
    name: 'Jericho, California',
    nameRu: 'Иерихон, Калифорния',
    kind: 'city',
    x: 12,
    y: 50,
    description:
      'Место первой совместной охоты братьев в пилоте — призрак Женщины в белом на трассе Сентенниал.',
    episode: 's01e01',
  },
  {
    slug: 'blackwater-ridge',
    name: 'Blackwater Ridge, Colorado',
    nameRu: 'Блэкуотер-Ридж, Колорадо',
    kind: 'city',
    x: 44,
    y: 47,
    description: 'Лес, где братья выследили вендиго во второй серии.',
    episode: 's01e02',
  },
  {
    slug: 'st-louis',
    name: 'St. Louis, Missouri',
    nameRu: 'Сент-Луис, Миссури',
    kind: 'city',
    x: 64,
    y: 50,
    description:
      'Город, где перевёртыш принял облик Дина, из-за чего того официально объявили мёртвым.',
    episode: 's01e06',
  },
  {
    slug: 'sioux-falls',
    name: 'Sioux Falls, South Dakota',
    nameRu: 'Су-Фолс, Южная Дакота',
    kind: 'city',
    x: 57,
    y: 35,
    description:
      'Свалка Бобби Сингера — штаб охотников, библиотека лора и «второй дом» братьев на долгие годы.',
    episode: 's01e22',
  },
  {
    slug: 'pontiac',
    name: 'Pontiac, Illinois',
    nameRu: 'Понтиак, Иллинойс',
    kind: 'city',
    x: 66,
    y: 44,
    description:
      'Здесь Дин выбрался из собственной могилы после того, как Кастиэль вытащил его из Ада.',
    episode: 's04e01',
  },
  {
    slug: 'carthage',
    name: 'Carthage, Missouri',
    nameRu: 'Карфаген, Миссури',
    kind: 'city',
    x: 62,
    y: 53,
    description:
      'Город, где Люцифер вершил жатву и где геройски погибли Эллен и Джо Харвелл.',
    episode: 's05e10',
  },
  {
    slug: 'stull-cemetery',
    name: 'Stull Cemetery, Kansas',
    nameRu: 'Кладбище Стулл, Канзас',
    kind: 'city',
    x: 60,
    y: 51,
    description:
      'Место финальной схватки Михаила и Люцифера. Здесь Сэм увлёк Люцифера в Клетку, спасая мир.',
    episode: 's05e22',
  },
  {
    slug: 'cicero',
    name: 'Cicero, Indiana',
    nameRu: 'Цицеро, Индиана',
    kind: 'city',
    x: 68,
    y: 45,
    description:
      'Где Дин почти год прожил «нормальной» жизнью с Лизой и Беном после финала Апокалипсиса.',
    episode: 's06e01',
  },
  {
    slug: 'hell',
    name: 'Hell',
    nameRu: 'Ад',
    kind: 'realm',
    x: 30,
    y: 88,
    description:
      'Преисподняя, где души пытают, превращая в демонов. Трон занимали Лилит, затем Кроули, Ровена и другие. Врата открываются особым ключом.',
    episode: 's02e22',
  },
  {
    slug: 'purgatory',
    name: 'Purgatory',
    nameRu: 'Чистилище',
    kind: 'realm',
    x: 50,
    y: 92,
    description:
      'Дикий лес-загробье, куда попадают души монстров. Дин и Кастиэль провели здесь год, пробиваясь к выходу.',
    episode: 's08e01',
  },
  {
    slug: 'heaven',
    name: 'Heaven',
    nameRu: 'Небеса',
    kind: 'realm',
    x: 70,
    y: 8,
    description:
      'Загробный мир для праведных душ — у каждой свой рай из лучших воспоминаний. После реформы Джека стал общим, без стен между раями.',
    episode: 's05e16',
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
