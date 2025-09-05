/**
 * @file: use-experts-main-timeline.ts
 * @description: Хук создания основной GSAP timeline для секции экспертов
 * @dependencies: gsap, splitTextToWords
 * @created: 2025-01-27
 */

import { useCallback } from "react";
import { gsap } from "gsap";
import { splitTextToWords } from "../utils/split-text-to-words";

export const useExpertsMainTimeline = () => {
  /**
   * Создает и возвращает основную timeline анимации
   * Возвращает null, если переданные refs не готовы
   */
  const createMainTimeline = useCallback(
    (
      titleEl: HTMLHeadingElement | null,
      cardsListEl: HTMLDivElement | null,
      descriptionEl: HTMLDivElement | null,
      buttonEl: HTMLButtonElement | null
    ) => {
      if (!titleEl || !cardsListEl || !descriptionEl || !buttonEl) return null;

      const tl = gsap.timeline({ paused: true });

      // Разбиваем все спаны заголовка на слова
      const titleSpans = titleEl.querySelectorAll("span");
      titleSpans.forEach((span) => splitTextToWords(span as HTMLElement));

      const allWords = titleEl.querySelectorAll(".word");
      const cards = cardsListEl.querySelectorAll(".expert-card");
      const cardImages = cardsListEl.querySelectorAll(".expert-card img");

      // Стартовые состояния
      gsap.set(titleEl, { opacity: 0 });
      gsap.set(descriptionEl, { opacity: 0, y: 30 });
      gsap.set(buttonEl, { opacity: 0, scale: 0.9 });
      gsap.set(allWords, { opacity: 0, y: 30, rotationX: -90 });
      gsap.set(cards, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        clipPath: "circle(0% at 50% 50%)",
      });
      cardImages.forEach((image) =>
        gsap.set(image, { scale: 1.12, transformOrigin: "center" })
      );

      // Появление заголовка
      tl.to(titleEl, { opacity: 1, duration: 0.3 });

      // Появление слов заголовка
      tl.to(
        allWords,
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        0.3
      );

      // Первое фото
      tl.to(
        cards[0],
        {
          opacity: 1,
          scale: 1,
          y: 0,
          clipPath: "circle(160% at 50% 50%)",
          duration: 0.8,
          ease: "power2.out",
        },
        0.75
      );

      // Остальные фото последовательно
      cards.forEach((card, index) => {
        if (index === 0) return;
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            clipPath: "circle(160% at 50% 50%)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.95 + index * 0.2
        );
      });

      // Масштаб изображений
      tl.to(cardImages, { scale: 1, duration: 1.2, ease: "power2.out" }, 1.55);

      // Появление описания и кнопки
      tl.to(
        descriptionEl,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.75
      );
      tl.to(
        buttonEl,
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        2.35
      );

      return tl;
    },
    []
  );

  return { createMainTimeline };
};
