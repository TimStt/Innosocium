"use client";
/**
 * @file: WaveAnimationUI.tsx
 * @description: Компонент Wave
 * @created: 2025-08-29
 */
import React from "react";
import { useAnimationWave } from "./use-animation-wave";
import { cls } from "@/shared/libs/cls";

const WaveAnimationUI: React.FC<{
  reversed?: boolean;
  noAnimation?: boolean;
}> = ({ noAnimation = false, reversed = false }) => {
  const { bgRef } = useAnimationWave({
    noAnimation,
  });
  return (
    <div
      className={cls("wave-background", { reversed: reversed })}
      ref={bgRef}
    />
  );
};

export default WaveAnimationUI;
