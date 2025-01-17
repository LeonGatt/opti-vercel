import type { Block } from 'payload'
import { blockTheme } from '@/fields/blockTheme'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'position',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Fullscreen',
              value: 'fullscreen',
            },
          ],
        },
        blockTheme,
      ]
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
