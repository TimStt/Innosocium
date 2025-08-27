/**
 * @file: zero-hero/index.tsx
 * @description: Главный hero блок проекта Innosocium
 * @dependencies: React, ZeroHeroHeader компонент
 * @created: 2025-08-27
 */

import { ButtonUI } from "@/shared/ui/button-ui";
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import Image from "next/image";
import React from "react";

export const zeroHeroCards = [
  "/public/images/student1.jpg",
  "/public/images/student2.jpg",
  "/public/images/student3.jpg",
  "/public/images/student4.jpg",
  "/public/images/student5.jpg",
];

const ZeroHero: React.FC = () => {
  return (
    <section className="zero-hero container">
      <div className="zero-hero__main">
        <div className="zero-hero__main__top">
          <h1 className="zero-hero__top-description">
            Всероссийский студенческий конкурс социальных проектов
          </h1>
          <p className="zero-hero__top-description">
            Заявите о себе и получите шанс реализовать свою идею
          </p>
        </div>

        <span className="zero-hero__name name-contest">Инносоциум</span>

        <p className="zero-hero__description">
          Осуществляет поддержку в реализации студенческих проектов,
          направленных на решение социальных проблем и улучшение жизни общества.
        </p>

        <ButtonUI className="zero-hero__cta-button" fullWidth>
          Подать заявку
        </ButtonUI>

        <div className="zero-hero__right-text">
          <h2 className="zero-hero__subtitle"></h2>
        </div>
      </div>

      <div className="zero-hero__cards">
        <h2 className="zero-hero__cards-title">
          Социальный конкурс, где идеи студентов воплощаются в реальные проекты!
        </h2>

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
