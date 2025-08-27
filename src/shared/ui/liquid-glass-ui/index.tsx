/**
 * @file: Li.tsx
 * @description: Компонент Li
 * @created: 2025-08-27
 */
import { cls } from "@/shared/libs/cls";
import React from "react";

export const LiquidGlassUI: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <>
      <div className={cls("liquidGlass-wrapper", className)}>
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
        {children}
      </div>
    </>
  );
};
