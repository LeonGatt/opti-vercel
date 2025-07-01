import { cn } from '@/utilities/ui'
import type React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('mx-auto w-full px-3 sm:px-6 max-w-[1400px]', className)}>{children}</div>
  )
}
