'use client'

import clsx from 'clsx'
import Link from 'next/link'
import type { ElementType, FC } from 'react'

export type Props = {
  label?: string | null | undefined
  appearance?: 'plain' | 'dim' | 'outline' | 'solid' | null | undefined
  theme?: 'light' | 'dark' | null | undefined
  color?: 'default' | 'blue' | 'orange' | null | undefined
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  size?: string | null | undefined
  variant?: string
}

export const Button: FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance = 'plain',
  color = 'default',
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  theme,
}) => {
  let el = elFromProps

  if (onClick || type === 'submit') el = 'button'

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const baseClasses = 'px-4 py-2 rounded-lg transition-all duration-300 no-underline'

  const colorVar = {
    default: 'text-foreground',
    blue: 'text-blue-1',
    orange: 'text-orange-1',
  }

  const appearanceClasses = {
    plain: clsx('hover:underline'),
    dim: clsx(
      'bg-[#f5f6f9] hover:bg-[var(--gray04)]',
      theme === 'dark' && 'bg-darkGray hover:bg-[#313136]',
    ),
    outline: clsx(
      'border',
      color === 'default' ? 'border-foreground' : 'border-foreground',
      'hover:bg-[var(--gray04)]',
      theme === 'dark' && 'hover:bg-[#313136]',
    ),
    solid: clsx(
      'text-white',
      'bg-foreground',
      color === 'blue' && 'hover:bg-blue-2',
      color === 'orange' && 'hover:bg-orange-2',
      color === 'default' && 'hover:bg-[#717176]',
      theme === 'dark' && 'text-darkGray',
    ),
  } as const

  const className = clsx(
    baseClasses,
    colorVar[color ?? 'default'],
    appearanceClasses[appearance ?? 'plain'],
    classNameFromProps,
  )

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {label}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...newTabProps}
    >
      {label}
    </Element>
  )
}
