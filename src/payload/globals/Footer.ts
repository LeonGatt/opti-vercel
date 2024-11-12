import type { GlobalConfig } from 'payload/types'

import linkGroup from '../fields/linkGroup'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        linkGroup({
          appearances: ['primary', 'secondary'],
        }),
      ],
    },
  ],
}
