/**
 * @file: experts.data.ts
 * @description: Моковые данные для виджета экспертов и жюри конкурса
 * @dependencies: используется в `index.tsx`, `expert-card.tsx`
 * @created: 2025-08-29
 */

export type ExpertItem = {
  id: number;
  name: string;
  position: string;
  role: "jury" | "expert";
  image: string;
};

export const expertsData: ExpertItem[] = [
  {
    id: 1,
    name: "Галина Карелова",
    position:
      "Председатель жюри. Первый заместитель председателя Комитета Совета Федерации по Федеративному устройству",
    role: "jury",
    image: "/images/juri1.jpg",
  },
  {
    id: 2,
    name: "Диана Гурцкая",
    position:
      "Первый заместитель председателя комиссии по вопросам социального партнерства, попечения и развитию инклюзивных практик",
    role: "expert",
    image: "/images/juri2.jpg",
  },
  {
    id: 3,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri3.jpg",
  },

  {
    id: 4,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri4.jpg",
  },

  {
    id: 5,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri2.jpg",
  },
  {
    id: 6,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri3.jpg",
  },
  {
    id: 7,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri4.jpg",
  },
  {
    id: 8,
    name: "Афанасий Саввин",
    position:
      "Генеральный директор, АО «Корпорация развития Республики Саха (Якутия)»",
    role: "expert",
    image: "/images/juri3.jpg",
  },
];
