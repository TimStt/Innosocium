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

const Nominations: React.FC = () => {
  return (
    <section className="nominations">
      <div className="container">
        <div className="nominations__content">
          <NominationsIcon
            className="nominations__title"
            viewBox="0 0 1615 270"
          />

          <div>
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
        </div>
      </div>
    </section>
  );
};

export default Nominations;
