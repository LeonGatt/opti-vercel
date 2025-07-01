import { cn } from '@/utilities/ui'
import type React from 'react'

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
}

type Size = keyof typeof sizes

interface Props {
  children: React.ReactNode
  className?: string
  size?: Size
}

export const Paragraph: React.FC<Props> = (props) => {
  const { children, className, size = 'base' } = props
  const sizeClass = sizes[size]
  return <p className={cn(sizeClass, className, 'font-body')}>{children}</p>
}
