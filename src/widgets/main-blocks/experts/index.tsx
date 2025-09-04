/**
 * @file: Experts.tsx
 * @description: Исправленный виджет экспертов с рабочим Swiper
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP, Swiper
 * @created: 2025-08-29
 */
"use client";

import React, { useEffect, useRef, useState } from "react";

import { useIntersection } from "@/shared/hooks/use-intersection";
import { ButtonUI } from "@/shared/ui/button-ui";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useExpertsMainTimeline } from "./hooks/use-experts-main-timeline";
import { horizontalLoop } from "./utils/horizontal-loop";

import { ExpertCard } from "./expert-card";
import { expertsData } from "./experts.data";
import { cls } from "@/shared/libs/cls";
import { useCallbackRef } from "@/shared/hooks/use-callback-ref";

gsap.registerPlugin(Draggable);

export const Experts: React.FC = () => {
  // Состояние анимации и флаг однократного запуска
  const hasAnimated = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Refs для элементов анимации
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Ref для timeline анимации
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const loopRef = useRef<gsap.core.Timeline | null>(null);

  const { createMainTimeline } = useExpertsMainTimeline();

  const refItemsList = useRef<HTMLDivElement[]>([]);

  const refItem = useCallbackRef<HTMLDivElement>((el) => {
    if (el) {
      if (!refItemsList.current) {
        refItemsList.current = [];
      }

      refItemsList.current.push(el);
    }
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
          if (!loopRef.current && trackRef.current) {
            loopRef.current = horizontalLoop(refItemsList, {
              repeat: -1,
              paddingRight: 80,
              speed: 0.5,
            });
          }
        }, 3000);
      }
    },
    {
      threshold: 0.2,
      rootMargin: "-100px 0px -100px 0px",
    }
  );

  // Drag-пауза для карточек
  useEffect(() => {
    if (!trackRef.current || !loopRef.current) return;

    const destroyers: Array<() => void> = [];

    refItemsList.current.forEach((el) => {
      const d = Draggable.create(el, {
        type: "x,y",
        bounds: trackRef.current,
        onPress: () => {
          setIsDragging(true);
          loopRef.current?.pause();
        },
        onDrag: function () {
          // мягкие ограничения по Y (чтобы не «залазило» вверх)
          const maxY = Math.min(120, (el as HTMLElement).clientHeight * 0.4);
          const minY = -maxY;
          const y = gsap.getProperty(el, "y") as number;
          if (y > maxY) gsap.set(el, { y: maxY });
          if (y < minY) gsap.set(el, { y: minY });
        },
        onRelease: function () {
          setIsDragging(false);
          gsap.to(el, {
            y: 0,
            duration: 0.35,
            ease: "back.out(1.3)",
            onComplete: () => {
              if (loopRef.current) {
                loopRef.current.play();
              }
            },
          });
        },
      })[0];

      destroyers.push(() => d.kill());
    });

    return () => destroyers.forEach((fn) => fn());
  }, [trackRef.current, loopRef.current]);

  // Очистка анимаций при размонтировании
  useEffect(() => {
    // const refresh = () => loopRef.current?.refresh(true);
    // window.addEventListener("resize", refresh);
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (loopRef.current) {
        loopRef.current.kill();
        loopRef.current = null;
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

        <div className="experts__slider-container">
          <div className="experts__list" ref={trackRef}>
            {expertsData.map((expert) => (
              <div
                key={`original-${expert.id}`}
                className="experts__item marquee-item"
                ref={refItem}
              >
                <ExpertCard expert={expert} />
              </div>
            ))}
            {expertsData.map((expert) => (
              <div
                key={`copy-${expert.id}`}
                className="experts__item marquee-item"
                ref={refItem}
              >
                <ExpertCard expert={expert} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={buttonRef} className="container">
        <ButtonUI className="experts__button" fullWidth>
          Подать заявку
        </ButtonUI>
      </div>
    </section>
  );
};
