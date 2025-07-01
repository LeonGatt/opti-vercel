import type { VariantProps } from 'class-variance-authority'
import type React from 'react'

import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

export interface Props
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string
  children?: React.ReactNode
}

export const AppLink: React.FC<Props> = ({
  href,
  className,
  children,
  variant = 'none',
  size,
  ...props
}) => {
  const defaultSize = size || variant !== 'none' ? 'default' : 'clear'
  const combinedClassName = cn(buttonVariants({ variant, size: defaultSize }), className)
  return (
    <Link href={href} className={cn(combinedClassName)} {...props}>
      {children}
    </Link>
  )
}
