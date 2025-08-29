/**
 * @file: StagesOfTheCompetition.tsx
 * @description: Компонент StagesOfTheCompetition
 * @created: 2025-08-29
 */
"use client";
import React, { useRef, useState } from "react";
import { CardStage } from "./card-stage";
import { stagesOfCompetition } from "./stages-of-the-competition.data";
import Link from "next/link";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import { useIntersection } from "@/shared/hooks/use-intersection";
import { cls } from "@/shared/libs/cls";
import { ButtonUI } from "@/shared/ui/button-ui";

export const StagesOfTheCompetition: React.FC = () => {
  const [isViewActiveStage, setIsViewActiveStage] = useState(false);

  const ref = useIntersection(() => setIsViewActiveStage(true));

  return (
    <section className="stages" aria-label="Этапы конкурса">
      <WaveAnimationUI noAnimation />
      <div className="container">
        <div className="stages__head">
          <h2 className="stages__title">Этапы конкурса</h2>
          <Link className="link-with-underline" href="/">
            Подробнее о конкурсе
          </Link>
        </div>
        <ul className="stages__list" ref={ref}>
          {stagesOfCompetition.map((item) => (
            <li key={item.id} className="stages__item">
              <CardStage item={item} />
            </li>
          ))}
          <li
            className={cls(
              "stage-card__numbers",
              isViewActiveStage && "active"
            )}
          >
            {stagesOfCompetition.map((item) => (
              <span className="stage-card__number" key={item.id}>
                {item.number}
              </span>
            ))}
          </li>
        </ul>

        <ButtonUI className="stages__button" fullWidth>
          Подать заявку
        </ButtonUI>
      </div>
    </section>
  );
};
