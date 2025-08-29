/**
 * @file: nominations/index.tsx
 * @description: Компонент номинаций конкурса с аккордеонами
 * @dependencies: React, nominationsData, AccordionItem
 * @created: 2025-01-27
 */

"use client";

import React, { useState } from "react";
import AccordionItem from "./accordion-item";
import { nominationsData } from "./data";
import NominationsIcon from "@/source/icons/nominations.svg";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import { ButtonUI } from "@/shared/ui/button-ui";

const Nominations: React.FC = () => {
  return (
    <section className="nominations">
      <WaveAnimationUI noAnimation />
      <div className="container">
        <div className="nominations__content">
          <NominationsIcon
            className="nominations__title"
            viewBox="0 0 1615 270"
          />

          <div className="nominations__accordions">
            {nominationsData.map((nomination, index) => (
              <AccordionItem
                key={nomination.id}
                nomination={nomination}
                index={index}
                // isOpen={openNominations.has(nomination.id)}
                // onToggle={handleToggle}
              />
            ))}
          </div>

          <ButtonUI className="nominations__button" fullWidth>
            Подать заявку
          </ButtonUI>
        </div>
      </div>
    </section>
  );
};

export default Nominations;
