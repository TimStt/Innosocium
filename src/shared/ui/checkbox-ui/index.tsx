import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

import { cls } from '@/shared/libs/cls'

export type ICheckbox = ComponentPropsWithoutRef<'input'> & {
  /** Текст лейбла */
  label?: string
  /** Тип чекбокса */
  type?: 'checkbox' | 'radio'
  /** Дополнительные классы для враппера */
  wrapperClassName?: string
  /** Дополнительные классы для лейбла */
  labelClassName?: string
  /** Обработчик изменения */
  onChangeCheckbox?: (checked?: boolean) => void
}

export const CheckboxUI = ({
  label,
  type = 'checkbox',
  className,
  wrapperClassName,
  labelClassName,
  children,
  checked,
  onChange,
  onChangeCheckbox,
  ...rest
}: ICheckbox) => {
  const controlClasses = cls('control', `control-${type}`, wrapperClassName)

  const inputClasses = cls('control__input', className)

  const labelClasses = cls('control__label', labelClassName)

  const id = useId()

  const handleChange = (checked?: boolean) => {
    onChangeCheckbox?.(checked)
  }

  return (
    <label className={controlClasses} htmlFor={id} id={id + '-label'}>
      <input
        type={type}
        className={inputClasses}
        id={id}
        name={id}
        checked={!!checked}
        onChange={!checked ? (e) => handleChange(e.target.checked) : (e) => {}}
        onClick={checked ? () => handleChange(false) : undefined}
        {...rest}
      />
      <div className="control__indicator"></div>
      {label && <span className={labelClasses} dangerouslySetInnerHTML={{ __html: label || '' }} />}
      {children && <span className={labelClasses}>{children}</span>}
    </label>
  )
}

CheckboxUI.displayName = 'CheckboxUI'
