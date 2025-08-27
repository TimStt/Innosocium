/**
 * @file: feedback-form/index.tsx
 * @description: Компонент формы обратной связи для подписки на обновления
 * @dependencies: React, ButtonUI
 * @created: 2025-01-27
 */

import { ButtonUI } from "@/shared/ui/button-ui";
import React, { useState } from "react";

const FeedbackForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки формы
    console.log("Отправка формы:", { email, isAgreed });
  };

  return (
    <aside className="feedback-form">
      <div className="feedback-form__container">
        <h3 className="feedback-form__title">
          Получайте сообщения о каждом обновлении, которое мы публикуем. Давайте
          будем на связи!
        </h3>

        <form className="feedback-form__form" onSubmit={handleSubmit}>
          <div className="feedback-form__field">
            <label htmlFor="email" className="feedback-form__label">
              Ваш email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="namename@gmail.com"
              className="feedback-form__input"
              required
            />
          </div>

          <div className="feedback-form__field">
            <label className="feedback-form__checkbox-label">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="feedback-form__checkbox"
                required
              />
              <span className="feedback-form__checkbox-text">
                согласие на обработку персональных данных
              </span>
            </label>
          </div>

          <ButtonUI
            type="submit"
            className="feedback-form__submit-button"
            disabled={!email || !isAgreed}
          >
            Отправить
          </ButtonUI>
        </form>
      </div>
    </aside>
  );
};

export default FeedbackForm;
