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

export const Partners: React.FC = () => {
  // Разделяем партнеров на 3 строки для анимации
  const firstRow = partnersData.slice(0, 5)
  const secondRow = partnersData.slice(5, 10)
  const thirdRow = partnersData.slice(10, 15)

  return (
    <section className="partners" aria-label="Наши партнеры">
      <WaveAnimationUI noAnimation />
      <div className="container">
        <h2 className="partners__title">Наши партнеры</h2>

        <div className="partners__content">
          <div className="partners__rows">
            <div className="partners__row partners__row--first">
              <div className="partners__track">
                <ul className="partners__grid">
                  {firstRow.map((partner) => (
                    <li key={partner.id} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
                {/* Дублируем элементы для бесконечной анимации */}
                <ul className="partners__grid">
                  {firstRow.map((partner) => (
                    <li key={`${partner.id}-duplicate`} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="partners__row partners__row--second">
              <div className="partners__track">
                <ul className="partners__grid">
                  {secondRow.map((partner) => (
                    <li key={partner.id} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
                {/* Дублируем элементы для бесконечной анимации */}
                <ul className="partners__grid">
                  {secondRow.map((partner) => (
                    <li key={`${partner.id}-duplicate`} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="partners__row partners__row--third">
              <div className="partners__track">
                <ul className="partners__grid">
                  {thirdRow.map((partner) => (
                    <li key={partner.id} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
                {/* Дублируем элементы для бесконечной анимации */}
                <ul className="partners__grid">
                  {thirdRow.map((partner) => (
                    <li key={`${partner.id}-duplicate`} className="partners__item">
                      <PartnerCard partner={partner} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
