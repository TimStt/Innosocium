/**
 * @file: zero-hero/index.tsx
 * @description: Главный hero блок проекта Innosocium
 * @dependencies: React, SCSS стили
 * @created: 2025-08-27
 */

import React from 'react';

const ZeroHero: React.FC = () => {
  return (
    <section className="zero-hero">
      <div className="container">
        <h1>Innosocium</h1>
        <p>Инновационные решения для общества</p>
      </div>
    </section>
  );
};

export default ZeroHero;
