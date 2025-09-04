/**
 * @file: feedback-form/index.tsx
 * @description: Компонент формы обратной связи для подписки на обновления
 * @dependencies: React, ButtonUI, LiquidGlassUI, InputUI
 * @created: 2025-01-27
 */
"use client";

import React, { useState } from "react";

import { cls } from "@/shared/libs/cls";
import { ButtonUI } from "@/shared/ui/button-ui";
import { CheckboxUI } from "@/shared/ui/checkbox-ui";
import { InputUI } from "@/shared/ui/input-ui";
import { LiquidGlassUI } from "@/shared/ui/liquid-glass-ui";
import { WaveAnimationUI } from "@/shared/ui/wave-animation-ui";
import Link from "next/link";
import { LiquidGlassBlurUI } from "@/shared/ui/liquid-glass-blur-ui";

const FeedbackForm: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки формы
    console.log("Отправка формы:", { email, isAgreed });
  };

  return (
    <LiquidGlassBlurUI className={cls("feedback-form", className)}>
      <div className="feedback-form__inner">
        <h3 className="feedback-form__title">
          Получайте сообщения о каждом обновлении, которое мы публикуем. <br />{" "}
          Давайте будем на связи!
        </h3>

        <form className="feedback-form__form" onSubmit={handleSubmit}>
          <InputUI
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="namename@gmail.com"
            className="feedback-form__input"
            label="ВАШ EMAIL:"
            required
          />

          <CheckboxUI
            checked={isAgreed}
            onChangeCheckbox={(status) => setIsAgreed(status || false)}
          >
            {" "}
            согласие на обработку{" "}
            <Link href="/privacy-policy">персональных данных</Link>
          </CheckboxUI>

          <ButtonUI
            type="submit"
            className="feedback-form__submit-button"
            disabled={!email || !isAgreed}
            fullWidth
          >
            Отправить
          </ButtonUI>
        </form>
      </div>
    </LiquidGlassBlurUI>
  );
};

export default FeedbackForm;
