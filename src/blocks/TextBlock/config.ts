import {
  lexicalEditor,
  HeadingFeature,
  AlignFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  InlineCodeFeature,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { Block } from 'payload'
import { backgroundColor } from '@/fields/color'
import { blockSpacings } from '@/fields/spacing'

export const TextBlock: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',
  fields: [
    blockSpacings,
    backgroundColor,
    {
      name: 'textAlignment',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'headingSize',
      type: 'select',
      options: [
        { label: 'L', value: 'l' },
        { label: 'XL', value: 'xl' },
      ],
      defaultValue: 'l',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            AlignFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
            InlineCodeFeature(),
            TextStateFeature({
              state: {
                color: {
                  'text-text-light': { css: { color: `#52575b` }, label: 'Text Light' },
                  'text-text-default': { css: { color: `#ffffff` }, label: 'Text Default' },
                },
              },
            }),
          ]
        },
      }),
    },
    linkGroup(),
  ],
}
