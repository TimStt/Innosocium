/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */
'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useIntersection } from '@/shared/hooks/use-intersection'
import { ButtonUI } from '@/shared/ui/button-ui'
import { WaveAnimationUI } from '@/shared/ui/wave-animation-ui'
import { gsap } from 'gsap'

import { ExpertCard } from './expert-card'
import { expertsData } from './experts.data'

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

/**
 * @file: Experts.tsx
 * @description: Виджет экспертов и жюри конкурса с GSAP анимациями
 * @dependencies: ExpertCard, expertsData, WaveAnimationUI, ButtonUI, GSAP
 * @created: 2025-08-29
 */

export const Experts: React.FC = () => {
  // Состояние анимации и флаг однократного запуска
  const [hasAnimated, setHasAnimated] = useState(false)

  // Refs для элементов анимации
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsListRef = useRef<HTMLUListElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Ref для timeline анимации
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const cardsMoveTimelineRef = useRef<gsap.core.Timeline | null>(null)

  // Refs для обработчиков событий мыши
  const mouseHandlersRef = useRef<{
    handleMouseDown: (e: MouseEvent) => void
    handleMouseMove: (e: MouseEvent) => void
    handleMouseUp: () => void
  } | null>(null)

  /**
   * Разбивает текст на отдельные слова для анимации
   * @param element - HTML элемент с текстом
   * @returns массив span элементов со словами
   */
  const splitTextToWords = (element: HTMLElement) => {
    const text = element.textContent || ''
    const words = text.trim().split(/\s+/)

    element.innerHTML = words
      .map((word, index) => `<span class="word" data-word-index="${index}">${word}</span>`)
      .join(' ')

    return element.querySelectorAll('.word')
  }

  /**
   * Создает основную timeline анимации
   */
  const createMainTimeline = () => {
    if (!titleRef.current || !cardsListRef.current || !descriptionRef.current || !buttonRef.current)
      return

    // Создаем главную timeline
    const tl = gsap.timeline({ paused: true })

    // Разбиваем заголовок на слова
    const titleSpans = titleRef.current.querySelectorAll('span')
    titleSpans.forEach((span) => {
      splitTextToWords(span as HTMLElement)
    })

    // Получаем все слова заголовка
    const allWords = titleRef.current.querySelectorAll('.word')
    const cards = cardsListRef.current.querySelectorAll('.expert-card')
    const cardImages = cardsListRef.current.querySelectorAll('.expert-card img')

    // Устанавливаем начальные состояния - ВСЕ элементы скрыты
    gsap.set(titleRef.current, { opacity: 0 })
    gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
    gsap.set(buttonRef.current, { opacity: 0, scale: 0.9 })
    gsap.set(allWords, {
      opacity: 0,
      y: 30,
      rotationX: -90,
    })
    gsap.set(cards, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      clipPath: 'circle(0% at 50% 50%)',
    })
    gsap.set(cardImages, {
      scale: 1.12,
      transformOrigin: 'center',
    })

    // Анимация появления заголовка
    tl.to(titleRef.current, {
      opacity: 1,
      duration: 0.3,
    })

    // Анимация появления слов заголовка
    tl.to(
      allWords,
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      },
      0.3,
    )

    // Появление первого фото
    tl.to(
      cards[0],
      {
        opacity: 1,
        scale: 1,
        y: 0,
        clipPath: 'circle(160% at 50% 50%)',
        duration: 0.8,
        ease: 'power2.out',
      },
      0.75,
    )

    // Последовательное появление остальных фото
    cards.forEach((card, index) => {
      if (index === 0) return

      tl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          clipPath: 'circle(160% at 50% 50%)',
          duration: 0.8,
          ease: 'power2.out',
        },
        0.95 + index * 0.2,
      )
    })

    // Анимация масштабирования изображений
    tl.to(
      cardImages,
      {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      },
      1.55,
    )

    // Появление описания
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      1.75,
    )

    // Появление кнопки
    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      },
      2.35,
    )

    return tl
  }

  /**
   * Создает анимацию бесконечного движения карточек вправо
   */
  const createCardsMovementAnimation = () => {
    if (!cardsListRef.current) return

    const originalCards = Array.from(cardsListRef.current.querySelectorAll('.expert-card'))

    // Создаем дубликаты карточек для бесконечной дорожки
    const duplicatedCards = originalCards.map((card) => {
      const cloned = card.cloneNode(true) as HTMLElement
      cardsListRef.current?.appendChild(cloned)
      return cloned
    })

    // Получаем все карточки (оригиналы + дубликаты)
    const allCards = cardsListRef.current.querySelectorAll('.expert-card')

    // Вычисляем ширину для бесконечного слайдера
    const cardWidth = originalCards[0]?.getBoundingClientRect().width || 300
    const gap = 80 // Промежуток между карточками
    const totalWidth = originalCards.length * (cardWidth + gap)

    // Устанавливаем начальную позицию для дубликатов справа от оригиналов
    gsap.set(duplicatedCards, { x: totalWidth })

    // Timeline для бесконечного движения карточек вправо
    const moveTl = gsap.timeline({ repeat: -1, paused: true })

    // Анимация движения влево для создания эффекта движения вправо
    // Карточки начинают с изначальной позиции и движутся влево
    moveTl.to(allCards, {
      x: `-=${totalWidth}`,
      duration: 25,
      ease: 'none',
    })

    // Добавляем интерактивность для каждой карточки отдельно
    allCards.forEach((card) => {
      let isDragging = false
      let startX = 0
      let startY = 0
      let originalX = 0
      let originalY = 0

      const handleCardMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        isDragging = true
        startX = e.clientX
        startY = e.clientY

        // Получаем текущую позицию карточки
        const computedStyle = window.getComputedStyle(card)
        const transform = computedStyle.transform
        const matrix = new DOMMatrix(transform === 'none' ? '' : transform)
        originalX = matrix.m41
        originalY = matrix.m42

        // Останавливаем основную анимацию
        moveTl.pause()

        // Добавляем класс для визуальной обратной связи
        card.classList.add('dragging')
      }

      const handleCardMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const deltaX = e.clientX - startX
        const deltaY = e.clientY - startY

        // Ограничиваем смещение в пределах 20% от размера карточки
        const maxOffset = (cardWidth + gap) * 0.2
        const clampedOffsetX = Math.max(-maxOffset, Math.min(maxOffset, deltaX))
        const clampedOffsetY = Math.max(-maxOffset, Math.min(maxOffset, deltaY))

        // Применяем смещение к карточке
        gsap.set(card, {
          x: originalX + clampedOffsetX,
          y: originalY + clampedOffsetY,
        })
      }

      const handleCardMouseUp = () => {
        if (!isDragging) return

        isDragging = false
        card.classList.remove('dragging')

        // Возвращаем карточку на исходную позицию
        gsap.to(card, {
          x: originalX,
          y: originalY,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // Возобновляем основную анимацию
            moveTl.play()
          },
        })
      }

      // Добавляем обработчики для каждой карточки
      card.addEventListener('mousedown', handleCardMouseDown as EventListener)
      card.addEventListener('touchstart', ((e: TouchEvent) => {
        handleCardMouseDown(e.touches[0] as any)
      }) as EventListener)
      document.addEventListener('mousemove', handleCardMouseMove as EventListener)
      document.addEventListener('touchmove', ((e: TouchEvent) => {
        handleCardMouseMove(e.touches[0] as any)
      }) as EventListener)
      document.addEventListener('mouseup', handleCardMouseUp as EventListener)
      document.addEventListener('touchend', handleCardMouseUp as EventListener)
    })

    return moveTl
  }

  /**
   * Intersection Observer для запуска анимации при появлении в области видимости
   */
  const intersectionRef = useIntersection(
    () => {
      if (!hasAnimated) {
        setHasAnimated(true)

        // Создаем и запускаем основную анимацию
        const mainTimeline = createMainTimeline()
        if (mainTimeline) {
          timelineRef.current = mainTimeline
          mainTimeline.play()

          // Запускаем движение карточек после основной анимации
          setTimeout(() => {
            const moveTimeline = createCardsMovementAnimation()
            if (moveTimeline) {
              cardsMoveTimelineRef.current = moveTimeline
              moveTimeline.play()
            }
          }, 3000) // Запуск через 3 секунды после основной анимации
        }
      }
    },
    {
      threshold: 0.2, // Запуск когда 20% блока видно
      rootMargin: '-100px 0px -100px 0px', // Дополнительный отступ
    },
  )

  // Очистка анимаций при размонтировании
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (cardsMoveTimelineRef.current) {
        cardsMoveTimelineRef.current.kill()
      }
    }
  }, [])

  return (
    <section
      className="experts"
      aria-label="Эксперты и жюри конкурса"
      ref={(el) => {
        sectionRef.current = el
        intersectionRef(el)
      }}
    >
      <WaveAnimationUI noAnimation reversed />
      <div className="container">
        <h2 className="experts__title title" ref={titleRef}>
          <span>Конкурс, в котором</span>
          <span>мы – твои помощники!</span>
        </h2>

        <div className="experts__content">
          <div className="experts__description" ref={descriptionRef}>
            <p>
              Жюри и эксперты конкурса — это надёжный навигатор, который помогает участникам пройти
              путь от идеи до реализованного проекта. В их составе признанные профессионалы науки,
              политики, культуры и бизнеса, от заместителя Министра науки до лидеров медиахолдингов
              и банков.
            </p>

            <div className="experts__description-column">
              <p>
                Они открывают доступ к опыту и контактам, позволяя напрямую взаимодействовать с
                людьми, способными направить инициативу в фонды, медиа или региональные программы
                развития, превращая участие в конкурсе в реальный шаг к масштабным переменам.
              </p>
              <a className="link-with-underline" href="/jury">
                Подробнее о жюри
              </a>
            </div>
          </div>

          <ul className="experts__list" ref={cardsListRef}>
            {expertsData.map((expert) => (
              <li key={expert.id} className="experts__item">
                <ExpertCard expert={expert} />
              </li>
            ))}
          </ul>
        </div>

        <div ref={buttonRef}>
          <ButtonUI className="experts__button" fullWidth>
            Подать заявку
          </ButtonUI>
        </div>
      </div>
    </section>
  )
}
