/**
 * @file: nominations/accordion-item.tsx
 * @description: Компонент аккордеона с плавной анимацией высоты summary
 */
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { cls } from '@/shared/libs/cls'
import { AccordionUI } from '@/shared/ui/accordion-ui'
import ArrowIcon from '@/source/icons/arrow.svg'
import Image from 'next/image'

import { NominationItem } from './data'

interface AccordionItemProps {
  nomination: NominationItem
  index: number
}

/**
 * Функция для точного измерения высоты текста без манипуляций с оригинальным элементом
 */
const measureTextHeight = (originalElement: HTMLElement): number => {
  // Создаем измерительный контейнер
  const measurer = document.createElement('div')

  // Получаем все вычисленные стили оригинала
  const computedStyle = window.getComputedStyle(originalElement)

  // Копируем все стили, влияющие на размер текста
  const importantStyles = [
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'font-variant',
    'line-height',
    'letter-spacing',
    'word-spacing',
    'text-transform',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'box-sizing',
    'word-wrap',
    'word-break',
    'hyphens',
  ]

  // Применяем стили к измерителю
  importantStyles.forEach((prop) => {
    measurer.style.setProperty(prop, computedStyle.getPropertyValue(prop))
  })

  // Устанавливаем точную ширину как у оригинала
  const originalRect = originalElement.getBoundingClientRect()
  measurer.style.width = originalRect.width + 'px'

  // Убираем все ограничения по высоте и обрезанию
  measurer.style.height = 'auto'
  measurer.style.maxHeight = 'none'
  measurer.style.minHeight = '0'
  measurer.style.overflow = 'visible'
  measurer.style.whiteSpace = 'normal'
  measurer.style.textOverflow = 'clip'
  measurer.style.webkitLineClamp = 'none'
  measurer.style.display = 'block'

  // Скрываем измеритель
  measurer.style.position = 'absolute'
  measurer.style.visibility = 'hidden'
  measurer.style.top = '-9999px'
  measurer.style.left = '-9999px'
  measurer.style.zIndex = '-9999'
  measurer.style.pointerEvents = 'none'

  // Копируем содержимое (только текст и простые элементы)
  measurer.innerHTML = originalElement.innerHTML

  // Добавляем в body для измерения
  document.body.appendChild(measurer)

  // Измеряем полную высоту
  const fullHeight = measurer.getBoundingClientRect().height

  // Удаляем измеритель
  document.body.removeChild(measurer)

  return fullHeight
}

// Компонент аккордеона с правильным измерением
const AccordionItem: React.FC<AccordionItemProps> = ({ nomination, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const refSummary = useRef<HTMLDetailsElement>(null)
  const refSummaryElement = useRef<HTMLElement>(null)
  const [heightSummary, setHeightSummary] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)

  // ОТЛАДОЧНАЯ функция измерения - добавляем прямо в компонент
  const measureNaturalHeightDebug = (originalElement: HTMLElement): number => {
    console.log('=== НАЧАЛО ИЗМЕРЕНИЯ ===')

    // Проверяем оригинал
    const originalRect = originalElement.getBoundingClientRect()
    console.log('Оригинал:', {
      height: originalRect.height,
      width: originalRect.width,
      innerHTML: originalElement.innerHTML.slice(0, 200) + '...',
    })

    // Создаем клон
    const clone = originalElement.cloneNode(true) as HTMLElement

    // Устанавливаем базовые стили для изоляции
    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    clone.style.top = '-9999px'
    clone.style.left = '-9999px'
    clone.style.zIndex = '-9999'
    clone.style.pointerEvents = 'none'

    // Точная ширина
    clone.style.width = originalRect.width + 'px'

    // Добавляем в DOM БЕЗ изменения стилей
    const parent = originalElement.parentElement || document.body
    parent.appendChild(clone)

    const beforeHeight = clone.getBoundingClientRect().height
    console.log('Клон ДО изменений:', beforeHeight)

    // Теперь постепенно убираем ограничения
    clone.style.height = 'auto'
    const step1 = clone.getBoundingClientRect().height
    console.log('После height: auto:', step1)

    clone.style.maxHeight = 'none'
    const step2 = clone.getBoundingClientRect().height
    console.log('После maxHeight: none:', step2)

    clone.style.minHeight = '0'
    const step3 = clone.getBoundingClientRect().height
    console.log('После minHeight: 0:', step3)

    // Проверяем текстовые элементы внутри
    const textElements = clone.querySelectorAll('.text-with-slash')
    textElements.forEach((el, i) => {
      const textEl = el as HTMLElement
      console.log(`Текстовый элемент ${i}:`, {
        height: textEl.getBoundingClientRect().height,
        webkitLineClamp: getComputedStyle(textEl).webkitLineClamp,
        display: getComputedStyle(textEl).display,
        overflow: getComputedStyle(textEl).overflow,
      })

      textEl.style.webkitLineClamp = 'unset'
      textEl.style.overflow = 'visible'
      textEl.style.textOverflow = 'clip'

      console.log(`После изменений ${i}:`, textEl.getBoundingClientRect().height)
    })

    const finalHeight = clone.getBoundingClientRect().height
    console.log('ФИНАЛЬНАЯ ВЫСОТА:', finalHeight)

    parent.removeChild(clone)
    console.log('=== КОНЕЦ ИЗМЕРЕНИЯ ===')

    return finalHeight
  }

  // Измеряем высоты при монтировании и изменении состояния
  useEffect(() => {
    if (!refSummaryElement.current) return

    const summaryElement = refSummaryElement.current

    // Сохраняем начальную высоту (с обрезанием)
    if (initialHeight === 0) {
      const rect = summaryElement.getBoundingClientRect()
      setInitialHeight(rect.height)
    }

    if (isOpen) {
      // При открытии измеряем естественную высоту блока (отладочная версия)
      const fullHeight = measureNaturalHeightDebug(summaryElement)
      setHeightSummary(fullHeight)

      console.log('Height measurement:', {
        initialHeight: initialHeight,
        fullHeight: fullHeight,
        difference: fullHeight - initialHeight,
      })
    } else {
      // При закрытии возвращаем начальную высоту
      setHeightSummary(initialHeight)
    }
  }, [isOpen, initialHeight])

  // Альтернативный вариант с кешированием измерений
  const [cachedHeights, setCachedHeights] = useState<{
    closed: number
    open: number
  } | null>(null)

  const measureHeights = useCallback(() => {
    if (!refSummaryElement.current || cachedHeights) return

    const summaryElement = refSummaryElement.current

    // Измеряем текущую высоту (с обрезанием)
    const closedHeight = summaryElement.getBoundingClientRect().height

    // Измеряем полную высоту
    const openHeight = measureTextHeight(summaryElement)

    setCachedHeights({
      closed: closedHeight,
      open: openHeight,
    })

    // Устанавливаем начальную высоту
    setHeightSummary(closedHeight)
  }, [cachedHeights])

  // Измеряем высоты один раз при монтировании
  useEffect(() => {
    measureHeights()
  }, [measureHeights])

  // Переключаем высоту при изменении состояния
  useEffect(() => {
    if (cachedHeights) {
      setHeightSummary(isOpen ? cachedHeights.open : cachedHeights.closed)
    }
  }, [isOpen, cachedHeights])

  // Рендер остается без изменен

  const renderContent = (content: NominationItem['content']) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'text':
          return (
            <div key={index} className="nominations__accordion__description">
              <p>{item.value as string}</p>
              {item.images && (
                <div className="nominations__accordion__description-images">
                  {item.images.map((image, imageIndex) => (
                    <div className="nominations__accordion__description-image" key={imageIndex}>
                      <Image src={image} alt={image} width={100} height={100} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )

        case 'list':
          return (
            <div key={index} className="nominations__accordion__box">
              {item.title && <h4 className="nominations__accordion__box-title">{item.title}</h4>}

              {item.images && (
                <div className="nominations__accordion__box-images">
                  {item.images.map((image, imageIndex) => (
                    <div className="nominations__accordion__box-image" key={imageIndex}>
                      <Image src={image} alt={image} width={420} height={364} />
                    </div>
                  ))}
                </div>
              )}

              {item.title && (
                <h4 className="nominations__accordion__box-title mobile">{item.title}</h4>
              )}

              {Array.isArray(item.value) ? (
                <ul className="nominations__accordion__box-list">
                  {item.value.map((listItem, listIndex) => (
                    <li key={listIndex} className="nominations__accordion__box-item">
                      <p className="text-with-slash">{listItem}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="nominations__accordion__box-text text-with-slash">{item.value}</p>
              )}
            </div>
          )

        default:
          return null
      }
    })
  }
  return (
    <AccordionUI
      classNameRoot={cls('nominations__accordion', {
        'nominations__accordion--open': isOpen,
      })}
      classNameDetails="nominations__accordion-details"
      classNameWrapper="nominations__accordion-content"
      classNameSummary="nominations__accordion-summary"
      titleSummary={nomination.title}
      accordionRef={refSummary}
      refSummary={refSummaryElement}
      propsRoot={{
        style: {
          zIndex: index + 1,
          '--heightOpenSummary': heightSummary + 'px',
          '--heightClosedSummary': initialHeight + 'px',
        } as React.CSSProperties,
      }}
      summaryContent={
        <>
          <span className="text-with-slash">{nomination.title}</span>
          <ArrowIcon />
        </>
      }
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
    >
      {renderContent(nomination.content)}
    </AccordionUI>
  )
}

export default AccordionItem
