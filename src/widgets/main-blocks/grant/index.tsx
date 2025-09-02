/**
 * @file: Grant.tsx
 * @description: Компонент Grant
 * @created: 2025-08-29
 */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import GrantWord from "@/source/icons/grant-word.svg";
import GrantWord1 from "@/source/icons/grant-word-1.svg";
import GrantNumber from "@/source/icons/grant-number.svg";
import { useIntersection } from "@/shared/hooks/use-intersection";
import { cls } from "@/shared/libs/cls";

export const Grant: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  const ref = useIntersection(() => {
    setAnimate(true);
  });
  return (
    <section
      className={cls("grant", animate && "animate")}
      ref={ref}
      style={{ backgroundImage: "url(/images/grant.jpg)" }}
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
          <img src={"/icons/grant-word-1.svg"} alt="Grant Word 1" />
          <img src={"/icons/grant-number.svg"} alt="Grant Number" />
          <img src={"/icons/grant-word.svg"} alt="Grant Word" />
        </div>
      </div>
    </section>
  );
};
