import { Field } from 'payload'
import { HeroHorizontalAlignment, HeroVerticalAlignment } from '@/components/uiCustom/HeroCustom'
import { darkMode } from '@/fields/darkMode'
import { blockSpacings } from '@/fields/spacing'

/**
 * We define here just additional config fields for the custom heros, that gets merged with the default ones
 */
export const customHeroFields: Field[] = [
  blockSpacings,
  {
    name: 'horizontalAlignment',
    label: 'Horizontal Alignment',
    type: 'select',
    options: Object.entries(HeroHorizontalAlignment).map(([label, value]) => ({
      label,
      value,
    })),
    defaultValue: HeroHorizontalAlignment.left,
    admin: {
      description: 'Choose the horizontal alignment of the hero content.',

      condition: (_, { designVersion = '' } = {}) => ['customHighImpact'].includes(designVersion),
    },
  },
  {
    name: 'verticalAlignment',
    label: 'Vertical Alignment',
    type: 'select',
    options: Object.entries(HeroVerticalAlignment).map(([label, value]) => ({
      label,
      value,
    })),
    defaultValue: HeroVerticalAlignment.middle,
    admin: {
      description: 'Choose the vertical alignment of the hero content.',
      condition: (_, { designVersion = '' } = {}) => ['customHighImpact'].includes(designVersion),
    },
  },
  {
    name: 'highImpact',
    label: 'High Impact',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Enable high impact mode for the hero section.',
      condition: (_, { designVersion = '' } = {}) => ['customHighImpact'].includes(designVersion),
    },
  },
  darkMode({
    overrides: {
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['customHighImpact'].includes(designVersion),
      },
    },
  }),
]
