/**
 * @file: partners.data.ts
 * @description: Моковые данные для виджета партнеров конкурса
 * @dependencies: используется в `index.tsx`, `partner-card.tsx`
 * @created: 2025-08-29
 */

export type PartnerItem = {
  id: number;
  name: string;
  logo: string;
  tagline?: string;
  url?: string;
};

export const partnersData: PartnerItem[] = [
  {
    id: 1,
    name: "СИБУР",
    logo: "/images/partners/sibur-logo.svg",
    url: "https://www.sibur.ru",
  },
  {
    id: 2,
    name: "Фонд ПРЕЗИДЕНТСКИХ ГРАНТОВ",
    logo: "/images/partners/presidential-grants-logo.svg",
    url: "https://президентскиегранты.рф",
  },
  {
    id: 3,
    name: "РОСКОНГРЕСС",
    logo: "/images/partners/roscongress-logo.svg",
    tagline: "Пространство доверия",
    url: "https://roscongress.org",
  },
  {
    id: 4,
    name: "ПСБ",
    logo: "/images/partners/psb-logo.svg",
    url: "https://www.psbank.ru",
  },
  {
    id: 5,
    name: "ГАЗПРОМ",
    logo: "/images/partners/gazprom-logo.svg",
    url: "https://www.gazprom.ru",
  },
  {
    id: 6,
    name: "Российская Газета RGRU",
    logo: "/images/partners/rg-logo.svg",
    url: "https://rg.ru",
  },
  {
    id: 7,
    name: "КОМСОМОЛЬСКАЯ ПРАВДА",
    logo: "/images/partners/kp-logo.svg",
    url: "https://www.kp.ru",
  },
  {
    id: 8,
    name: "RMG РУССКАЯ МЕДИАГРУППА",
    logo: "/images/partners/rmg-logo.svg",
    url: "https://rmg.media",
  },
  {
    id: 9,
    name: "LENTA.RU",
    logo: "/images/partners/lenta-logo.svg",
    url: "https://lenta.ru",
  },
  {
    id: 10,
    name: "вконтакте",
    logo: "/images/partners/vk-logo.svg",
    url: "https://vk.com",
  },
  {
    id: 11,
    name: "АЛЬПИНА ПАБЛИШЕР",
    logo: "/images/partners/alpina-logo.svg",
    url: "https://alpinabook.ru",
  },
  {
    id: 12,
    name: "СФ",
    logo: "/images/partners/sf-logo.svg",
    tagline: "Совет Федерации",
    url: "https://council.gov.ru",
  },
];
