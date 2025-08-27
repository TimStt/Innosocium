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

const Nominations: React.FC = () => {
  const [openNominations, setOpenNominations] = useState<Set<string>>(
    new Set(["active-longevity"]) // По умолчанию открыта первая номинация
  );

  const handleToggle = (nominationId: string) => {
    const newOpenNominations = new Set(openNominations);

    if (newOpenNominations.has(nominationId)) {
      newOpenNominations.delete(nominationId);
    } else {
      newOpenNominations.add(nominationId);
    }

    setOpenNominations(newOpenNominations);
  };

  return (
    <section className="nominations">
      <div className="container">
        <div className="nominations__content">
          <h2 className="nominations__title">Номинации конкурса</h2>

          <div className="nominations__accordion">
            {nominationsData.map((nomination) => (
              <AccordionItem
                key={nomination.id}
                nomination={nomination}
                isOpen={openNominations.has(nomination.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nominations;
