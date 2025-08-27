/**
 * @file: nominations/index.tsx
 * @description: Блок номинаций конкурса
 * @dependencies: React, SCSS стили
 * @created: 2025-08-27
 */
import React from 'react';

const Nominations: React.FC = () => {
  return (
    <section className="nominations">
      <div className="container">
        <h2>Номинации</h2>
        <div className="nominations-grid">
          {/* Здесь будут карточки номинаций */}
        </div>
      </div>
    </section>
  );
};

export default Nominations;
