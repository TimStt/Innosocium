/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/source/icons/logo.svg";

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__logo logo">
          <Logo width={41} height={41} />
          <span>Инносоциум</span>
        </div>

        <nav className="header__nav navigation">
          <ul className="header__nav-list nav-list">
            <li className="header__nav-item nav-item">
              <Link
                href="/about"
                className="header__nav-link nav-link text-with-slash"
              >
                о конкурсе
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link
                href="/news"
                className="header__nav-link nav-link   text-with-slash"
              >
                новости
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link
                href="/knowledge"
                className="header__nav-link nav-link text-with-slash"
              >
                база знаний
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link
                href="/contacts"
                className="header__nav-link nav-link text-with-slash"
              >
                контакты
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          className="header__profile-button profile-button"
          aria-label="Профиль пользователя"
          href="/profile"
        >
          <Image
            className="header__profile-icon profile-icon"
            src="/icons/avatar.svg"
            alt="Профиль"
            width="43"
            height="43"
          />
        </Link>
      </div>
    </header>
  );
};
