"use client";
/**
 * @file: footer/index.tsx
 * @description: Компонент футера проекта Innosocium
 * @dependencies: React, Image from Next.js
 * @created: 2025-01-27
 */

import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <span className="name-contest">Инносоциум</span>
        <div className="footer__content">
          {/* Контактная информация */}
          <div className="footer__contact-info">
            <a href="tel:+74956404440" className="footer__contact-link">
              +7(495)640-44-40
            </a>

            <a href="mailto:innsocium@mail.ru" className="footer__contact-link">
              innsocium@mail.ru
            </a>

            <address className="footer__contact-address">
              Москва, Краснопресненская набережная, д. 12
            </address>
          </div>
          {/* Нижняя часть футера */}
          <div className="footer__bottom">
            <p className="footer__copyright-text">
              © 2025 все права защищены.
            </p>

            <div className="footer__social">
              <a
                href="https://vk.com/innosocium"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Мы в ВКонтакте"
              >
                <Image
                  src="/icons/vk.svg"
                  alt="ВКонтакте"
                  width={24}
                  height={24}
                  className="footer__social-icon"
                />
              </a>

              <a
                href="https://t.me/innosocium"
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Мы в Telegram"
              >
                <Image
                  src="/icons/telegram.svg"
                  alt="Telegram"
                  width={24}
                  height={24}
                  className="footer__social-icon"
                />
              </a>
            </div>

            <div className="footer__legal">
              <a href="/season-2025" className="footer__legal-link">
                сезон {new Date().getFullYear()}
              </a>
              <a href="/privacy-policy" className="footer__legal-link">
                политика конфиденциальности
              </a>
            </div>
          </div>
          spa
        </div>
      </div>
    </footer>
  );
};

export default Footer;
