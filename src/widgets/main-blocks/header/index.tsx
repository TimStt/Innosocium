/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

'use client'

import React, { useRef, useState } from 'react'

import useOnClickOutside from '@/shared/hooks/use-on-click-outside'
import { cls } from '@/shared/libs/cls'
import Logo from '@/source/icons/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

/**
 * @file: zero-hero/header.tsx
 * @description: Компонент шапки для hero-блока проекта Innosocium
 * @dependencies: React
 * @created: 2025-01-27
 */

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileNavRef = useRef<HTMLDivElement>(null)
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useOnClickOutside(mobileNavRef, () => setIsMobileMenuOpen(false), ['.header__burger'])

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
              <Link href="/about" className="header__nav-link nav-link text-with-slash">
                о конкурсе
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link href="/news" className="header__nav-link nav-link text-with-slash">
                новости
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link href="/knowledge" className="header__nav-link nav-link text-with-slash">
                база знаний
              </Link>
            </li>
            <li className="header__nav-item nav-item">
              <Link href="/contacts" className="header__nav-link nav-link text-with-slash">
                контакты
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__controls">
          <button
            className={cls('header__burger burger', { ['burger--active']: isMobileMenuOpen })}
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
          </button>

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
      </div>

      {/* Мобильное меню */}
      <nav
        className={cls('header__mobile-nav mobile-nav', { ['mobile-nav--open']: isMobileMenuOpen })}
        ref={mobileNavRef}
      >
        <ul className="mobile-nav__list">
          <li className="mobile-nav__item">
            <Link
              href="/about"
              className="mobile-nav__link text-with-slash"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              о конкурсе
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href="/news"
              className="mobile-nav__link text-with-slash"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              новости
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href="/knowledge"
              className="mobile-nav__link text-with-slash"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              база знаний
            </Link>
          </li>
          <li className="mobile-nav__item">
            <Link
              href="/contacts"
              className="mobile-nav__link text-with-slash"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              контакты
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
