/**
 * @file: CardStage.tsx
 * @description: Компонент CardStage
 * @created: 2025-08-29
 */
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import React from "react";
import type { StageItem } from "./stages-of-the-competition.data";

type CardStageProps = {
  item: StageItem;
};

export const CardStage: React.FC<CardStageProps> = ({ item }) => {
  const { number, title, dateStart, dateEnd, isCurrent } = item;
  return (
    <LiquidGlassUI
      className="stage-card"
      aria-current={isCurrent ? "step" : undefined}
    >
      <div className="stage-card__inner">
        <div className="stage-card__header">
          <div className="stage-card__dates">
            {dateStart && <time>{dateStart}</time>}
            <span className="stage-card__dates-separator" />
            {dateEnd && <time>{dateEnd}</time>}
          </div>
          <span
            className="stage-card__number hidden"
            aria-label={`Этап ${number}`}
          >
            {number}
          </span>
        </div>
        <div className="stage-card__body">
          {isCurrent && (
            <span className="stage-card__badge badge" role="status">
              сейчас
            </span>
          )}
          <h3 className="stage-card__title">{title}</h3>
        </div>
      </div>
    </LiquidGlassUI>
  );
};
