import type { GlobalConfig } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navGroup',
      type: 'array',
      fields: [
        linkGroup({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
