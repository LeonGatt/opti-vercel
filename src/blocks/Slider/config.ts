import type { Block } from 'payload'
import { blockTheme } from '@/fields/blockTheme'
import { linkGroup } from '@/fields/linkGroup'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SliderBlock: Block = {
  slug: 'sliderBlock',
  interfaceName: 'sliderBlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'sliderTitle',
          label: 'Slider Title',
          type: 'text',
        },
        blockTheme,
      ]
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 3,
      maxRows: 10,
      interfaceName: 'Slide',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'richText',
          label: 'Copy',
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
        },
        linkGroup({
          appearances: ['plain', 'dim', 'outline', 'solid'],
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    },
  ],
}