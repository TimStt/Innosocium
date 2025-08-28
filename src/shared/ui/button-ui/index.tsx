/**
 * @file: ButtonUI.tsx
 * @description: Компонент ButtonUI
 * @created: 2025-08-27
 */
import { cls } from "@/shared/libs/cls";
import React from "react";
import { LoaderUI } from "../loader-ui";

export interface ButtonUIProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: "primary";
  isLoading?: boolean;
}

export const ButtonUI: React.FC<ButtonUIProps> = ({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={cls("button", className, {
        "button--full-width": fullWidth,
        [variant]: variant,
      })}
      {...props}
    >
      {children}
      {isLoading && <LoaderUI />}
    </button>
  );
};
