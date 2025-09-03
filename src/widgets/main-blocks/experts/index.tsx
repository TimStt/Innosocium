/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI
 * @created: 2025-08-29
 */
"use client";
import React from "react";
import { ExpertCard } from "./expert-card";
import { expertsData } from "./experts.data";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import { ButtonUI } from "@/shared/ui/button-ui";
import Link from "next/link";

export const Experts: React.FC = () => {
  return (
    <section className="experts" aria-label="Эксперты и жюри конкурса">
      <WaveAnimationUI noAnimation reversed />
      <div className="container">
        <h2 className="experts__title title">
          <span>Конкурс, в котором</span>
          <span>мы – твои помощники!</span>
        </h2>

        <div className="experts__content">
          <div className="experts__description">
            <p>
              Жюри и эксперты конкурса — это надёжный навигатор, который
              помогает участникам пройти путь от идеи до реализованного проекта.
              В их составе признанные профессионалы науки, политики, культуры
              и бизнеса, от заместителя Министра науки до лидеров медиахолдингов
              и банков.
            </p>

            <div className="experts__description-column">
              <p>
                Они открывают доступ к опыту и контактам, позволяя напрямую
                взаимодействовать с людьми, способными направить инициативу
                в фонды, медиа или региональные программы развития, превращая
                участие в конкурсе в реальный шаг к масштабным переменам.
              </p>
              <Link className="link-with-underline" href="/jury">
                Подробнее о жюри
              </Link>
            </div>
          </div>

          <ul className="experts__list">
            {expertsData.map((expert) => (
              <li key={expert.id} className="experts__item">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>
        </div>

        <ButtonUI className="experts__button" fullWidth>
          Подать заявку
        </ButtonUI>
      </div>
    </section>
  );
};
