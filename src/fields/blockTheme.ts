import type { Field } from 'payload'

export const blockTheme: Field = {
  name: 'blockTheme',
  label: 'Block Theme',
  type: 'select',
  defaultValue: 'light',
  options: [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ],
}
