/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */
'use client'

import React, { useState } from 'react'

import { useIntersection } from '@/shared/hooks/use-intersection'
import { cls } from '@/shared/libs/cls'
import GrantNumber from '@/source/icons/grant-number.svg'
import GrantWord1 from '@/source/icons/grant-word-1.svg'
import GrantWord from '@/source/icons/grant-word.svg'
import Image from 'next/image'

/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */

/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */

/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */

/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */

export const Grant: React.FC = () => {
  const [animate, setAnimate] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  const ref = useIntersection(
    () => {
      if (!hasAnimated) {
        setAnimate(true)
        setHasAnimated(true)
      }
    },
    {
      threshold: 0.3, // Анимация запустится когда 30% блока будет видно
      rootMargin: '-50px 0px -50px 0px', // Дополнительный отступ для более позднего срабатывания
    },
  )
  return (
    <section
      className={cls('grant', animate && 'animate')}
      ref={ref}
      style={{ backgroundImage: 'url(/images/grant.jpg)' }}
    >
      <div className="grant__inner">
        <h2 className="visually-hidden">Выиграй грант на 400 000 рублей</h2>

        <div className="grant__text">
          <span className="right">
            Стань <br /> инноватором <br /> изменений
          </span>
          <span className="left">
            Получи <br /> возможность <br /> осуществить свои мечты
          </span>
        </div>

        <div className="grant__icon">
          <img src={'/icons/grant-word-1.svg'} alt="Grant Word 1" />
          <img src={'/icons/grant-number.svg'} alt="Grant Number" />
          <img src={'/icons/grant-word.svg'} alt="Grant Word" />
        </div>
      </div>
    </section>
  )
}
