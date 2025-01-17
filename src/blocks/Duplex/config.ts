import type { Block } from 'payload'
import { blockTheme } from '@/fields/blockTheme'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const DuplexBlock: Block = {
  slug: 'duplexBlock',
  interfaceName: 'duplexBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'default',
          options: [
            {
              label: 'Default',
              value: 'default',
            },
            {
              label: 'Reverse',
              value: 'reverse',
            },
            {
              label: 'Vertical',
              value: 'vertical',
            },
          ],
        },
        {
          name: 'emphasis',
          type: 'select',
          defaultValue: 'equal',
          options: [
            {
              label: 'Equal',
              value: 'equal',
            },
            {
              label: 'Copy',
              value: 'copy',
            },
            {
              label: 'Media',
              value: 'media',
            },
          ],
          admin: {
            condition: (_, { layout } = {}) => ['default', 'reverse'].includes(layout),
          },
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
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
  ],
}