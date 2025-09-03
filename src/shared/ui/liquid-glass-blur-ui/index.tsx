/**
 * @file: Li.tsx
 * @description: Компонент Li
 * @created: 2025-08-27
 */
import { cls } from "@/shared/libs/cls";
import React from "react";

export const LiquidGlassBlurUI: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <>
      <div className={cls("liquidGlassBlur", className)}>
        <div className="liquidGlassBlur__filter"></div>
        <div className="liquidGlassBlur__overlay"></div>
        <div className="liquidGlassBlur__specular"></div>
        <div className="liquidGlassBlur__content">{children}</div>

        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
          <filter
            id="liquidGlassBlurFilter"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="identity" />
            </feComponentTransfer>

            <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="blur"
              scale="50"
              xChannelSelector="A"
              yChannelSelector="A"
            />
          </filter>
        </svg>
      </div>
    </>
  );
};
