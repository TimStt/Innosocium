/**
 * @file: partner-card.tsx
 * @description: Компонент карточки партнера
 * @dependencies: LiquidGlassUI, PartnerItem
 * @created: 2025-08-29
 */
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import React from "react";
import type { PartnerItem } from "./partners.data";

type PartnerCardProps = {
  partner: PartnerItem;
};

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  const { name, logo, tagline, url } = partner;

  const CardContent = () => (
    <div className="partner-card__inner">
      <div className="partner-card__logo-wrapper">
        <img
          src={logo}
          alt={`Логотип ${name}`}
          className="partner-card__logo"
          loading="lazy"
        />
      </div>
      <div className="partner-card__content">
        <h3 className="partner-card__name">{name}</h3>
        {tagline && <p className="partner-card__tagline">{tagline}</p>}
      </div>
    </div>
  );

  if (url) {
    return (
      <LiquidGlassUI className="partner-card">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="partner-card__link"
          aria-label={`Перейти на сайт ${name}`}
        >
          <CardContent />
        </a>
      </LiquidGlassUI>
    );
  }

  return (
    <LiquidGlassUI className="partner-card">
      <CardContent />
    </LiquidGlassUI>
  );
};
