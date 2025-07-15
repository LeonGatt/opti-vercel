// This was edited for optitrack purposes

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities'
import { Loader2 } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm text-text-default font-medium shadow-xs transition-colors focus:outline-none focus-visible:ring-3 focus-visible:ring-outline-focus/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-button-primary text-text-inverse hover:bg-button-primary-hover/90 disabled:bg-gray-300 disabled:opacity-100',
        destructive:
          'bg-button-error text-text-inverse hover:bg-button-error-hover focus-visible:ring-button-error-hover disabled:bg-button-error-hover disabled:text-bg-destructive-foreground]',
        outline:
          'border border-button-outline hover:border-button-outline-hover hover:bg-secondary-hover focus:border-ring disabled:border-input disabled:text-foreground',
        secondary:
          'bg-button-secondary hover:bg-button-secondary-hover disabled:bg-button-secondary-hover disabled:text-secondary-foreground disabled:opacity-40',
        ghost:
          'shadow-none bg-transparent text-foreground hover:text-accent-foreground hover:bg-button-secondary-hover',
        link: 'shadow-none bg-transparent text-button-primary underline-offset-2 hover:underline disabled:text-primary',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 py-2 text-xs',
        lg: 'h-10 px-8 py-2',
        icon: 'h-9 w-9 px-4 py-2',
      },
      loading: {
        true: 'pointer-events-none opacity-50',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        loading: true,
        class: 'bg-button-primary',
      },
      {
        variant: 'destructive',
        loading: true,
        class: 'bg-button-error-hover text-destructive-foreground',
      },
      {
        variant: 'secondary',
        loading: true,
        class: 'bg-button-secondary-hover text-secondary-foreground',
      },
      {
        variant: 'ghost',
        loading: true,
        class: 'bg-transparent',
      },
      {
        variant: 'outline',
        loading: true,
        class: 'border-input text-foreground',
      },
      {
        variant: 'link',
        loading: true,
        class: 'text-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const content = loading ? (
      <>
        <Loader2 className="animate-spin" />
        {children}
      </>
    ) : (
      children
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        aria-disabled={loading || props.disabled}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
