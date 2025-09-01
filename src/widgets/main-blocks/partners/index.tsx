/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */
'use client'

import React from 'react'

import { WaveAnimationUI } from '@/shared/ui/wave-animation-ui'

import { PartnerCard } from './partner-card'
import { partnersData } from './partners.data'

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

/**
 * @file: Partners.tsx
 * @description: Виджет партнеров конкурса
 * @dependencies: PartnerCard, partnersData, WaveAnimationUI
 * @created: 2025-08-29
 */

export const Partners: React.FC = () => {
  // Разделяем партнеров на 3 строки для анимации
  const firstRow = partnersData.slice(0, 10)
  const secondRow = partnersData.slice(10, 20)
  const thirdRow = partnersData.slice(20, 30)

  return (
    <>
      <section className="partners" aria-label="Наши партнеры">
        <WaveAnimationUI noAnimation />

        <h2 className="partners__title title container">Наши партнеры</h2>

        <div className="partners__wrap">
          <ul className="partners__list marquee">
            {firstRow.map((partner) => (
              <li key={partner.id} className="partners__list-item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
          {/* Дублируем элементы для бесконечной анимации */}
          <ul className="items partners__list marquee">
            {firstRow.map((partner) => (
              <li key={`${partner.id}-duplicate`} className="partners__item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>
        <div className="partners__wrap">
          <ul className="partners__list marquee reverce">
            {secondRow.map((partner) => (
              <li key={partner.id} className="partners__list-item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
          {/* Дублируем элементы для бесконечной анимации */}
          <ul className="partners__list marquee reverce">
            {secondRow.map((partner) => (
              <li key={`${partner.id}-duplicate`} className="partners__list-item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>

        <div className="partners__wrap">
          <ul className="partners__list marquee">
            {thirdRow.map((partner) => (
              <li key={partner.id} className="partners__list-item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
          {/* Дублируем элементы для бесконечной анимации */}
          <ul className="partners__list marquee">
            {thirdRow.map((partner) => (
              <li key={`${partner.id}-duplicate`} className="partners__list-item">
                <PartnerCard partner={partner} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
