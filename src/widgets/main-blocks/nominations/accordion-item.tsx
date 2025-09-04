import React, { useCallback, useEffect, useRef, useState } from "react";

import { cls } from "@/shared/libs/cls";
import { AccordionUI } from "@/shared/ui/accordion-ui";
import ArrowIcon from "@/source/icons/arrow.svg";
import Image from "next/image";

import { NominationItem } from "./data";

interface AccordionItemProps {
  nomination: NominationItem;
  index: number;
}

/**
 * Функция для точного измерения высоты текста без манипуляций с оригинальным элементом
 */

// Компонент аккордеона с правильным измерением
const AccordionItem: React.FC<AccordionItemProps> = ({ nomination, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const refSummary = useRef<HTMLDetailsElement>(null);
  const refSummaryElement = useRef<HTMLElement>(null);

  const [heightSummary, setHeightSummary] = useState(0);

  /**
   * Функция для точного измерения размеров элемента без влияния на оригинал
   * Создает точную копию элемента для измерения
   */
  const measureElementSize = useCallback((element: HTMLElement) => {
    if (!element) return { width: 0, height: 0 };

    // Создаем точную копию элемента
    const clone = element.cloneNode(true) as HTMLElement;

    // Применяем стили для точного измерения
    clone.style.position = "absolute";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.width = `${element.offsetWidth}px`;
    clone.style.height = "max-content";
    clone.style.visibility = "hidden";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "-1";

    // Добавляем клон в DOM для измерения
    document.body.appendChild(clone);

    // Получаем размеры
    const measurements = {
      width: clone.offsetWidth,
      height: clone.offsetHeight,
      scrollWidth: clone.scrollWidth,
      scrollHeight: clone.scrollHeight,
      clientWidth: clone.clientWidth,
      clientHeight: clone.clientHeight,
    };

    console.log(measurements);

    // Удаляем клон из DOM
    document.body.removeChild(clone);

    return measurements;
  }, []);

  useEffect(() => {
    if (refSummaryElement.current && isOpen) {
      const measurements = measureElementSize(refSummaryElement.current);
      setHeightSummary(measurements.height);
    }
  }, [isOpen, measureElementSize]);

  // Рендер остается без изменен

  const renderContent = (content: NominationItem["content"]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <div key={index} className="nominations__accordion__description">
              <p>{item.value as string}</p>
              {item.images && (
                <div className="nominations__accordion__description-images">
                  {item.images.map((image, imageIndex) => (
                    <div
                      className="nominations__accordion__description-image"
                      key={imageIndex}
                    >
                      <Image src={image} alt={image} width={100} height={100} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "list":
          return (
            <div key={index} className="nominations__accordion__box">
              {item.title && (
                <h4 className="nominations__accordion__box-title">
                  {item.title}
                </h4>
              )}

              {item.images && (
                <div className="nominations__accordion__box-images">
                  {item.images.map((image, imageIndex) => (
                    <div
                      className="nominations__accordion__box-image"
                      key={imageIndex}
                    >
                      <Image src={image} alt={image} width={420} height={364} />
                    </div>
                  ))}
                </div>
              )}

              {item.title && (
                <h4 className="nominations__accordion__box-title mobile">
                  {item.title}
                </h4>
              )}

              {Array.isArray(item.value) ? (
                <ul className="nominations__accordion__box-list">
                  {item.value.map((listItem, listIndex) => (
                    <li
                      key={listIndex}
                      className="nominations__accordion__box-item"
                    >
                      <p className="text-with-slash">{listItem}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="nominations__accordion__box-text text-with-slash">
                  {item.value}
                </p>
              )}
            </div>
          );

        default:
          return null;
      }
    });
  };
  return (
    <AccordionUI
      classNameRoot={cls("nominations__accordion", {
        "nominations__accordion--open": isOpen,
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
          "--heightOpenSummary": heightSummary + "px",
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
  );
};

export default AccordionItem;
