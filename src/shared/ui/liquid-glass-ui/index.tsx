/**
 * @file: liquid-glass-ui/index.tsx
 * @description: Компонент LiquidGlassUI с настраиваемыми параметрами эффекта жидкого стекла
 * @dependencies: shared/libs/cls
 * @created: 2025-08-27
 */
"use client";
import { cls } from "@/shared/libs/cls";
import React from "react";
import { useLiquidGlass } from "./use-liquid-glass";

// Базовые настройки для эффекта жидкого стекла (точно как в оригинальном коде)
const base = {
  icons: false,
  scale: -180,
  radius: 16,
  border: 0.07,
  lightness: 50,
  displace: 0,
  blend: "difference",
  x: "R",
  y: "B",
  alpha: 0.93,
  blur: 11,
  r: 0,
  g: 10,
  b: 20,
  saturation: 1,
  frost: 0,
  width: 336,
  height: 96,
};

export const LiquidGlassUI: React.FC<{
  children: React.ReactNode;
  className?: string;
  config?: Partial<typeof base>;
}> = ({ children, className, config = {} }) => {
  // Объединяем базовые настройки с переданными пользователем
  const settings = { ...base, ...config };
  const { svgEl, debugPen } = useLiquidGlass();

  return (
    <>
      <div className={cls("liquidGlass", className)}>
        {children}
        <svg
          className="liquidGlass__filter"
          xmlns="http://www.w3.org/2000/svg"
          ref={svgEl}
        >
          <defs>
            <filter id="filter" colorInterpolationFilters="sRGB">
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                result="map"
              ></feImage>

              <feDisplacementMap
                in2="map"
                in="SourceGraphic"
                xChannelSelector={settings.x}
                yChannelSelector={settings.y}
                scale={settings.scale}
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                id="redchannel"
                xChannelSelector={settings.x}
                yChannelSelector={settings.y}
                result="dispRed"
                scale={settings.scale + settings.r}
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                result="red"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                id="greenchannel"
                xChannelSelector={settings.x}
                yChannelSelector={settings.y}
                result="dispGreen"
                scale={settings.scale + settings.g}
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                result="green"
              />

              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                id="bluechannel"
                xChannelSelector={settings.x}
                yChannelSelector={settings.y}
                result="dispBlue"
                scale={settings.scale + settings.b}
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                result="blue"
              />

              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />

              <feGaussianBlur in="output" stdDeviation={settings.displace} />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};
