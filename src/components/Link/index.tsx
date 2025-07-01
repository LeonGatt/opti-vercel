import { Button, type Props as ButtonProps } from '../Button'

import Link from 'next/link'

import type { Page, Post } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '../ui/button'
import type { VariantProps } from 'class-variance-authority'

type CMSLinkType = {
  appearance?: 'plain' | 'dim' | 'outline' | 'solid' | null | undefined
  color?: 'default' | 'blue' | 'orange' | null | undefined
  theme?: 'dark' | 'light' | null | undefined
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  variant?: VariantProps<typeof buttonVariants>['variant'] | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    color,
    children,
    className,
    theme,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    variant = 'none',
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'plain' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const combinedClassName = cn(buttonVariants({ variant }), className)
  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(combinedClassName)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      className={className}
      size={size}
      href={href}
      theme={theme}
      color={color}
      appearance={appearance}
      label={label}
    />
  )
}
