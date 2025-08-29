/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */
"use client";
import React from "react";
import { PartnerCard } from "./partner-card";
import { partnersData } from "./partners.data";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";

export const Partners: React.FC = () => {
  return (
    <section className="partners" aria-label="Наши партнеры">
      {/* <WaveAnimationUI noAnimation /> */}
      <div className="container">
        <div className="partners__header">
          <h2 className="partners__title">Наши партнеры</h2>
        </div>

        <div className="partners__content">
          <ul className="partners__grid">
            {partnersData.map((partner) => (
              <li key={partner.id} className="partners__item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
