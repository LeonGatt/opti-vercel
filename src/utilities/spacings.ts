import type { Spacing, Spacings } from '@/fields/spacing'
import { cn } from './cn'

export const spacings = {
  none: 0,
  xs: '2',
  sm: '4',
  md: '8',
  lg: '16',
}

export const getSpacing = (spacing: Spacing, isTop?: boolean) =>
  spacing ? `${isTop ? 'pt' : 'pb'}-${spacings[spacing]}` : ''

export const getSpacings = (spacings: Spacings) =>
  cn(getSpacing(spacings?.spacingTop, true), getSpacing(spacings?.spacingBottom))
