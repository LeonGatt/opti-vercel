import { FeatureBlock } from '@/payload-types'
import deepMerge from '@/utilities/deepMerge'
import type { ArrayField, Field, Option } from 'payload'

type SpacingType = (options?: { overrides?: Partial<ArrayField> }) => Field

export type Spacings = FeatureBlock['spacings']
export type Spacing = NonNullable<Spacings>['spacingBottom']

export const spacingOptions: Option[] = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: 'xs (8px)',
    value: 'xs',
  },
  {
    label: 'sm (16px)',
    value: 'sm',
  },
  {
    label: 'md (32px)',
    value: 'md',
  },
  {
    label: 'lg (64px)',
    value: 'lg',
  },
]

const spacingField = (name = 'spacingTop', label = 'Spacing Top'): Field => ({
  name,
  label,
  type: 'select',
  options: spacingOptions,
  defaultValue: 'md',
  admin: { width: '50%' },
})

export const spacing: SpacingType = ({ overrides = {} } = {}) => {
  const spacings: Field = {
    label: 'Spacings',
    type: 'group',
    name: 'spacings',
    virtual: true,
    fields: [
      {
        type: 'row',
        fields: [spacingField(), spacingField('spacingBottom', 'Spacing Bottom')],
      },
    ],
  }

  return deepMerge(spacings, overrides)
}

export const blockSpacings = spacing({
  overrides: {
    label: 'Block Spacings',
    admin: {
      description: 'Define the spacing for the top and bottom of the block.',
    },
  },
})
