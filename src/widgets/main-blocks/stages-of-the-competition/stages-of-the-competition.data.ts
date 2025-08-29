/**
 * @file: stages-of-the-competition.data.ts
 * @description: Моковые данные для виджета этапов конкурса и типы
 * @dependencies: используется в `index.tsx`, `card-stage.tsx`
 * @created: 2025-08-29
 */

export type StageItem = {
  id: number;
  number: number;
  title: string;

  dateStart?: string;
  dateEnd?: string;
  isCurrent?: boolean;
};

export const stagesOfCompetition: StageItem[] = [
  {
    id: 1,
    number: 1,
    title: "Подача заявок",
    dateStart: "02.09.25",
    dateEnd: "26.01.26",
  },
  {
    id: 2,
    number: 2,
    title: "Оценка проекта экспертным советом",
    dateStart: "28.01.26",
    dateEnd: "10.02.26",
    isCurrent: true,
  },
  {
    id: 3,
    number: 3,
    title: "Объявление финалистов",
    dateStart: "—",
    dateEnd: "12.02.26",
  },
  {
    id: 4,
    number: 4,
    title: "Доработка проекта финалистами",
    dateStart: "16.02.26",
    dateEnd: "27.02.26",
  },
  {
    id: 5,
    number: 5,
    title: "Оценка проекта членами жюри",
    dateStart: "02.03.26",
    dateEnd: "18.03.26",
  },
  {
    id: 6,
    number: 6,
    title: "Питчинг проектов и объявление победителей",
    dateStart: "—",
    dateEnd: "24.03.26",
  },
];
