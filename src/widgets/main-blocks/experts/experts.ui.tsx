/**
 * @file: Experts.tsx
 * @description: Исправленный виджет экспертов с рабочим Swiper
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP, Swiper
 * @created: 2025-08-29
 */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useIntersection } from "@/shared/hooks/use-intersection";
import { ButtonUI } from "@/shared/ui/button-ui";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useExpertsMainTimeline } from "./hooks/use-experts-main-timeline";

import { ExpertCard } from "./expert-card";
import { expertsData } from "./experts.data";
import { cls } from "@/shared/libs/cls";
import { useCallbackRef } from "@/shared/hooks/use-callback-ref";
import { useMarquee } from "@/shared/hooks/use-marquee";

gsap.registerPlugin(Draggable);

const Experts: React.FC = () => {
  // Состояние анимации и флаг однократного запуска
  const hasAnimated = useRef<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  // Refs для элементов анимации
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Ref для timeline анимации
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const { createMainTimeline } = useExpertsMainTimeline();

  const { loopRef } = useMarquee({
    duration: 20,
    marqueeRef: trackRef,
    direction: "right",
  });

  /**
   * Intersection Observer для запуска анимации при появлении в области видимости
   */
  const intersectionRef = useIntersection(
    () => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;

        // Создаем и запускаем основную анимацию
        const mainTimeline = createMainTimeline(
          titleRef.current,
          trackRef.current,
          descriptionRef.current,
          buttonRef.current
        );

        if (mainTimeline) {
          timelineRef.current = mainTimeline;
          mainTimeline.play();
        }

        // Запускаем бесконечную прокрутку после анимации появления

        setTimeout(() => {
          loopRef.current?.play();
        }, 3000);
      }
    },
    {
      threshold: 0.2,
      rootMargin: "-100px 0px -100px 0px",
    }
  );

  // // Drag-пауза для карточек
  // useEffect(() => {
  //   if (!trackRef.current) return;

  //   const destroyers: Array<() => void> = [];

  //   // Находим только оригинальные карточки (не клоны) с атрибутом data-draggable
  //   const originalCards = document.querySelectorAll(
  //     ".experts__item[data-draggable='true']"
  //   );

  //   originalCards.forEach((el) => {
  //     // Проверяем, не был ли уже создан Draggable для этого элемента
  //     if ((el as any)._gsDraggable) {
  //       console.warn("Draggable already exists for element:", el);
  //       return;
  //     }

  //     let x = gsap.getProperty(el, "x") as number;
  //     let y = gsap.getProperty(el, "y") as number;

  //     const d = Draggable.create(el, {
  //       type: "x,y",
  //       bounds: trackRef.current,
  //       inertia: true,
  //       throwResistance: 2000,
  //       onPress: () => {
  //         x = gsap.getProperty(el, "x") as number;
  //         y = gsap.getProperty(el, "y") as number;
  //         setIsDragging(true);
  //         console.log("onPress");
  //         loopRef.current?.pause();
  //       },
  //       onDrag: function () {
  //         console.log("onDrag");
  //         loopRef.current?.pause();
  //         // мягкие ограничения по Y (чтобы не «залазило» вверх)
  //         const maxY = Math.min(80, (el as HTMLElement).clientHeight * 0.3);
  //         const minY = -maxY;
  //         const y = gsap.getProperty(el, "y") as number;
  //         if (y > maxY) gsap.set(el, { y: maxY });
  //         if (y < minY) gsap.set(el, { y: minY });
  //       },

  //       onRelease: function () {
  //         console.log("onRelease");
  //         setIsDragging(false);
  //         console.log("x", x);
  //         gsap.to(el, {
  //           y: y,
  //           x: x,
  //           duration: 0.3,
  //           ease: "back.out(1.2)",
  //           onComplete: () => {
  //             // Сбрасываем X после возврата по Y, чтобы карточка вернулась в поток marquee

  //             loopRef.current?.play();
  //           },
  //         });
  //       },
  //     })[0];

  //     destroyers.push(() => d.kill());
  //   });

  //   return () => destroyers.forEach((fn) => fn());
  // }, []);

  // Очистка анимаций при размонтировании
  useEffect(() => {
    // const refresh = () => loopRef.current?.refresh(true);
    // window.addEventListener("resize", refresh);
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <section
      className={cls("experts", isDragging && "dragging")}
      aria-label="Эксперты и жюри конкурса"
      ref={(el) => {
        sectionRef.current = el;
        intersectionRef(el);
      }}
    >
      <WaveAnimationUI noAnimation reversed />

      <h2 className="experts__title title container" ref={titleRef}>
        <span>Конкурс, в котором</span>
        <span>мы – твои помощники!</span>
      </h2>

      <div className="experts__content">
        <div className="experts__description container" ref={descriptionRef}>
          <p>
            Жюри и эксперты конкурса — это надёжный навигатор, который помогает
            участникам пройти путь от идеи до реализованного проекта. В их
            составе признанные профессионалы науки, политики, культуры и
            бизнеса, от заместителя Министра науки до лидеров медиахолдингов и
            банков.
          </p>

          <div className="experts__description-column">
            <p>
              Они открывают доступ к опыту и контактам, позволяя напрямую
              взаимодействовать с людьми, способными направить инициативу в
              фонды, медиа или региональные программы развития, превращая
              участие в конкурсе в реальный шаг к масштабным переменам.
            </p>
            <a className="link-with-underline" href="/jury">
              Подробнее о жюри
            </a>
          </div>
        </div>

        <div className="experts__list-container" ref={trackRef}>
          <div className="experts__list">
            {expertsData.map((expert) => (
              <div
                key={`original-${expert.id}`}
                className="experts__item marquee-item"
                data-draggable="true"
              >
                <ExpertCard expert={expert} />
              </div>
            ))}

            <div className="experts__list">
              {expertsData.map((expert) => (
                <div
                  key={`clone-${expert.id}`}
                  className="experts__item marquee-item"
                >
                  <ExpertCard expert={expert} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <ButtonUI className="experts__button" fullWidth ref={buttonRef}>
          Подать заявку
        </ButtonUI>
      </div>
    </section>
  );
};

export default Experts;
