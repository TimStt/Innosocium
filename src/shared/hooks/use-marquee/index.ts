import debounce from "@/shared/utils/debounce";
import { useCallback, useEffect, useRef } from "react";

import gsap from "gsap";

export const useMarquee = ({
  duration = 5,
  marqueeRef,
  direction,
}: {
  duration?: number;
  direction?: "left" | "right";
  marqueeRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const loopRef = useRef<gsap.core.Tween | null>(null);

  const init = useCallback(() => {
    // Находим элемент с атрибутом wb-data="marquee"
    console.log("init", marqueeRef);
    if (!marqueeRef.current) {
      return; // Если такого элемента нет — выходим
    }

    // Получаем длительность анимации из атрибута duration, если нет — по умолчанию 5 секунд

    console.log(duration); // Выводим duration в консоль для отладки

    // Находим контейнер с контентом внутри marquee
    const marqueeContent = marqueeRef.current.querySelector(".experts__list");
    if (!marqueeContent) {
      return; // Если контента нет — выходим
    }

    // Клонируем контент, чтобы использовать для бесконечного скролла
    const allChildren = marqueeRef.current.querySelectorAll(".marquee-item");

    // Переменная для хранения GSAP-твина

    // Функция для запуска/перезапуска анимации
    const playMarquee = () => {
      let progress = loopRef.current ? loopRef.current.progress() : 0; // Сохраняем текущий прогресс анимации
      loopRef.current && loopRef.current.progress(0).kill(); // Если есть предыдущая анимация — убиваем её

      // Получаем ширину контента
      const width = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("width"),
        10
      );

      // Получаем gap между элементами (column-gap)
      const gap = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("column-gap"),
        10
      );

      // Расстояние, на которое нужно переместить контент
      const distanceToTranslate = -1 * (gap + width);

      // Создаём анимацию GSAP
      loopRef.current = gsap.fromTo(
        allChildren, // Все дети marquee (оригинал + клон)
        { x: 0 }, // Начальная позиция
        {
          x: distanceToTranslate,
          duration,
          ease: "none",
          repeat: -1,
          reversed: direction === "right",
        } // Конечная позиция
      );

      loopRef.current?.progress(progress); // Возвращаем прогресс, чтобы анимация не «перезапускалась» с нуля
    };

    // Запускаем анимацию сразу
    playMarquee();

    // При ресайзе окна пересчитываем анимацию
  }, [direction]);

  useEffect(() => {
    init();

    window.addEventListener("resize", debounce(init, 500));

    return () => {
      window.removeEventListener("resize", debounce(init, 500));
    };
  }, [init]);

  return { loopRef };
};
