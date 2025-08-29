/**
 * @file: expert-card.tsx
 * @description: Компонент карточки эксперта/члена жюри
 * @dependencies: LiquidGlassUI, ExpertItem
 * @created: 2025-08-29
 */
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import React from "react";
import type { ExpertItem } from "./experts.data";

type ExpertCardProps = {
  expert: ExpertItem;
};

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => {
  const { name, position, role, image } = expert;

  return (
    <LiquidGlassUI className="expert-card">
      <div className="expert-card__inner">
        <img
          src={image}
          alt={`Фото ${name}`}
          className="expert-card__image"
          loading="lazy"
        />

        <div className="expert-card__content">
          <span className="expert-card__badge badge" role="status">
            {
              {
                expert: "Эксперт",
                jury: "Жюри",
              }[role]
            }
          </span>
          <h3 className="expert-card__name">{name}</h3>
          <p className="expert-card__position">{position}</p>
        </div>
      </div>
    </LiquidGlassUI>
  );
};
