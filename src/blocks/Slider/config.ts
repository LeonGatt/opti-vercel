import type { Block } from 'payload'
import { blockTheme } from '@/fields/blockTheme'

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
    blockTheme,
    {
      name: 'slider',
      type: 'array',
      label: 'Slider',
      minRows: 3,
      maxRows: 10,
      interfaceName: 'Slide',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
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
      ],
    },
  ],
}