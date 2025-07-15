// This was edited for optitrack purposes

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities'

const badgeVariants = cva(
  'inline-flex gap-1 items-center justify-center h-5 rounded px-2 py-0.5 text-xs text-text-default font-semibold transition-colors focus:outline-none focus-visible:border-ring-offset focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-ring/50 focus-visible:shadow-[0_0_0_4px_rgba(255,255,255,0.5),0_0_0_4px_rgba(0,0,0,0.1)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-button-default text-text-inverse hover:bg-button-default-hover',
        secondary:
          'bg-button-secondary hover:bg-secondary-hover focus-visible:border focus-visible:border-ring',
        destructive: 'bg-button-error text-text-inverse hover:bg-button-error-hover',
        outline:
          'border border-button-outline bg-background-light hover:border-button-outline-hover focus-visible:border-ring',
        primary: 'bg-button-primary text-text-inverse hover:bg-button-primary-hover',
      },
      rounded: {
        true: 'rounded-full shadow-sm h-5 min-w-5 w-auto px-1 py-0',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        rounded: true,
        class: 'shadow-none',
      },
      {
        variant: 'outline',
        rounded: true,
        class: 'shadow-none',
      },
    ],
    defaultVariants: {
      variant: 'default',
      rounded: false,
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  rounded?: boolean
}

function Badge({ className, variant, rounded, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, rounded }), className)} {...props}>
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
