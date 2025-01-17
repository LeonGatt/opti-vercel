'use client'

import React, { ElementType } from 'react'
import Link from 'next/link'

import styles from './index.module.css'

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

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  color,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
  theme,
  size,
  variant,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    styles.button,
    classNameFromProps,
    styles[`appearance-${appearance}`],
    styles[`color-${color}`],
    theme && styles[`theme-${theme}`],
    invert && styles[`${appearance}--invert`],
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={styles.content}>
      <span className={styles.label}>{label}</span>
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

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
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Element>
  )
}