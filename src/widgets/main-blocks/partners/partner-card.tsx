/**
 * @file: partner-card.tsx
 * @description: Компонент карточки партнера
 * @dependencies: LiquidGlassUI, PartnerItem
 * @created: 2025-08-29
 */
import React from "react";

import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";

import type { PartnerItem } from "./partners.data";

type PartnerCardProps = {
  partner: PartnerItem;
};

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const { name, logo, tagline, url } = partner;

  return (
    <LiquidGlassUI className="partner-card">
      <div className="partner-card__inner">
        <img
          src={logo}
          alt={`Логотип ${name}`}
          className="partner-card__logo"
          loading="lazy"
        />
      </div>
    </LiquidGlassUI>
  );
};
