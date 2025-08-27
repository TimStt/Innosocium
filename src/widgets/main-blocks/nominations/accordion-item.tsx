/**
 * @file: nominations/accordion-item.tsx
 * @description: Компонент аккордеона для отдельной номинации
 * @dependencies: React, Image from Next.js, NominationItem interface
 * @created: 2025-01-27
 */

import Image from "next/image";
import React from "react";
import { NominationItem } from "./data";

interface AccordionItemProps {
  nomination: NominationItem;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  nomination,
  isOpen,
  onToggle,
}) => {
  const renderContent = (content: NominationItem["content"]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <p key={index} className="accordion-item__text">
              {item.value as string}
            </p>
          );

        case "list":
          return (
            <div key={index} className="accordion-item__list">
              {item.title && (
                <h4 className="accordion-item__list-title">{item.title}</h4>
              )}
              <ul className="accordion-item__list-items">
                {(item.value as string[]).map((listItem, listIndex) => (
                  <li key={listIndex} className="accordion-item__list-item">
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          );

        case "image":
          return (
            <div key={index} className="accordion-item__images">
              {(item.value as Array<{ src: string; alt: string }>).map(
                (image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="accordion-item__image-wrapper"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={200}
                      height={200}
                      className="accordion-item__image"
                    />
                  </div>
                )
              )}
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <div className={`accordion-item ${isOpen ? "accordion-item--open" : ""}`}>
      <button
        className="accordion-item__header"
        onClick={() => onToggle(nomination.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${nomination.id}`}
      >
        <div className="accordion-item__title-wrapper">
          <span className="accordion-item__slash">/</span>
          <h3 className="accordion-item__title">{nomination.title}</h3>
        </div>
        <span className="accordion-item__icon">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div
          id={`accordion-content-${nomination.id}`}
          className="accordion-item__content"
        >
          {nomination.logo && (
            <div className="accordion-item__logo">
              <Image
                src={nomination.logo.src}
                alt={nomination.logo.alt}
                width={40}
                height={40}
                className="accordion-item__logo-image"
              />
            </div>
          )}

          <div className="accordion-item__content-wrapper">
            {renderContent(nomination.content)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
