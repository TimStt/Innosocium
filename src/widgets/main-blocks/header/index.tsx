/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="zero-hero__header">
      <div className="container">
        <div className="zero-hero__header-content">
          <div className="zero-hero__logo">
            <Image
              src="/icons/logo.svg"
              alt="ИННОСОЦИУМ"
              width="41"
              height="41"
              className="zero-hero__logo-image"
            />
            <span className="zero-hero__logo-text">ИННОСОЦИУМ</span>
          </div>

          <nav className="zero-hero__navigation">
            <ul className="zero-hero__nav-list">
              <li className="zero-hero__nav-item">
                <Link
                  href="/about"
                  className="zero-hero__nav-link text-with-slash"
                >
                  о конкурсе
                </Link>
              </li>
              <li className="zero-hero__nav-item">
                <Link
                  href="/news"
                  className="zero-hero__nav-link text-with-slash"
                >
                  новости
                </Link>
              </li>
              <li className="zero-hero__nav-item">
                <Link
                  href="/knowledge"
                  className="zero-hero__nav-link text-with-slash"
                >
                  база знаний
                </Link>
              </li>
              <li className="zero-hero__nav-item">
                <Link
                  href="/contacts"
                  className="zero-hero__nav-link text-with-slash"
                >
                  контакты
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            className="zero-hero__profile-button"
            aria-label="Профиль пользователя"
            href="/profile"
          >
            <Image
              className="zero-hero__profile-icon"
              src="/icons/avatar.svg"
              alt="Профиль"
              width="43"
              height="43"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
