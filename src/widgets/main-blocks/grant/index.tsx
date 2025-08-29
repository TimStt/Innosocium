/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */
import React from "react";
import Image from "next/image";

export const Grant: React.FC = () => {
  return (
    <section
      className="grant"
      style={{ backgroundImage: "url(/images/grant.jpg)" }}
    >
      <div className="grant__inner container">
        <h2 className="visually-hidden">Выиграй грант на 400 000 рублей</h2>

        <div className="grant__text">
          <span className="right">
            Стань <br /> инноватором <br /> изменений
          </span>
          <span className="left">
            Получи <br /> возможность <br /> осуществить свои мечты
          </span>
        </div>

        <Image
          src="/icons/grant.svg"
          alt=""
          width={1843}
          height={772}
          role="presentation"
        />
      </div>
    </section>
  );
};
