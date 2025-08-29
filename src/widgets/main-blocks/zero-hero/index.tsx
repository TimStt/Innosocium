/**
 * @file: zero-hero/index.tsx
 * @description: Главный hero блок проекта Innosocium
 * @dependencies: React, ZeroHeroHeader компонент
 * @created: 2025-08-27
 */
"use client";

import { useFitText } from "@/shared/hooks/use-fit-text";
import { ButtonUI } from "@/shared/ui/button-ui";
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import Image from "next/image";
import React, { useRef } from "react";
import InnosociumLogo from "@/source/icons/innosocium.svg";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";

export const zeroHeroCards = [
  "/images/student1.jpg",
  "/images/student2.jpg",
  "/images/student3.jpg",
  "/images/student4.jpg",
  "/images/student5.jpg",
];

const ZeroHero: React.FC = () => {
  return (
    <section className="zero-hero">
      <div className="zero-hero__main ">
        <div className="container">
          <div className="zero-hero__main__top ">
            <h1 className="zero-hero__main__top-description">
              Всероссийский студенческий конкурс социальных проектов
            </h1>
            <p className="zero-hero__main__top-description">
              Заявите о себе и получите шанс реализовать свою идею
            </p>
          </div>

          <InnosociumLogo className="zero-hero__main__logo name-contest" />

          <p className="zero-hero__main__description">
            Осуществляет поддержку в реализации студенческих проектов,
            направленных на решение социальных проблем и улучшение жизни
            общества.
          </p>

          <ButtonUI className="zero-hero__main__cta-button" fullWidth>
            Подать заявку
          </ButtonUI>

          <div className="zero-hero__main__right-text">
            <h2 className="zero-hero__main__subtitle"></h2>
          </div>
        </div>
        <WaveAnimationUI />
      </div>

      <div className="zero-hero__cards">
        {/* <WaveAnimationUI noAnimation reversed /> */}
        <div className="container">
          <h2 className="zero-hero__cards-title ">
            <span>Социальный конкурс,</span>
            <span>где идеи студентов</span>
            <span>воплощаются</span>
            <span>в реальные проекты!</span>
          </h2>
        </div>

        <div className="zero-hero__cards-list">
          {zeroHeroCards.map((card, index) => (
            <LiquidGlassUI className="zero-hero__cards-item" key={index}>
              <Image
                className="zero-hero__gallery-image"
                width={262}
                height={290}
                src={card}
                alt="Группа студентов"
              />
            </LiquidGlassUI>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZeroHero;
