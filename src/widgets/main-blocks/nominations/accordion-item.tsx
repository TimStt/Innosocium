/**
 * @file: nominations/accordion-item.tsx
 * @description: Компонент аккордеона для отдельной номинации
 * @dependencies: React, Image from Next.js, NominationItem interface
 * @created: 2025-01-27
 */

import Image from "next/image";
import React, { useState } from "react";
import { NominationItem } from "./data";
import { AccordionUI } from "@/shared/ui/accordion-ui";
import ArrowIcon from "@/source/icons/arrow.svg";
import { cls } from "@/shared/libs/cls";

interface AccordionItemProps {
  nomination: NominationItem;
  index: number;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ nomination, index }) => {
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionUI
      classNameRoot={cls("nominations__accordion", {
        "nominations__accordion--open": isOpen,
      })}
      classNameDetails="nominations__accordion-details"
      classNameWrapper="nominations__accordion-content"
      classNameSummary="nominations__accordion-summary"
      titleSummary={nomination.title}
      propsRoot={{
        style: {
          zIndex: index + 1,
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
