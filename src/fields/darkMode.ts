import type { Field, Condition } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type DarkModeType = (options?: { overrides?: Partial<Field> }) => Field

export const darkMode: DarkModeType = ({ overrides = {} } = {}) => {
  const generatedDarkMode: Field = {
    name: 'darkMode',
    label: 'Dark Mode',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Enable dark mode for the hero section.',
    },
  }

  return deepMerge(generatedDarkMode, overrides)
}
