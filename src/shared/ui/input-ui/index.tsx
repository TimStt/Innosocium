/**
 * @file: InputUI.tsx
 * @description: Компонент InputUI для переиспользования
 * @created: 2025-01-27
 */
import React, { useId } from "react";

import { cls } from "@/shared/libs/cls";

export interface InputUIProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  labelClassName?: string;
}

export const InputUI: React.FC<InputUIProps> = ({
  children,
  className,
  label,
  labelClassName,
  ...props
}) => {
  const id = useId();
  return (
    <div className="input-wrapper">
      {label && (
        <label className={cls("input-label", labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <input className={cls("input", className)} {...props} id={id} />
      {children}
    </div>
  );
};
