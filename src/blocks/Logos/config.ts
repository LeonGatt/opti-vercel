import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { blockSpacings } from '@/fields/spacing'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const allLogosDesignVersions = ['LOGO3-custom', 'LOGOS2', 'LOGOS3'] as const

export type LogosDesignVersion = (typeof allLogosDesignVersions)[number]

export const LogosBlock: Block = {
  slug: 'logos',
  interfaceName: 'LogosBlock',
  labels: {
    singular: 'Logos',
    plural: 'multiple Logos',
  },
  fields: [
    blockSpacings,
    backgroundColor,
    {
      name: 'designVersion',
      type: 'select',
      required: true,
      options: allLogosDesignVersions.map((version) => ({
        label: version,
        value: version,
      })),
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        ],
      }),
    },

    link({
      disableIcon: true,
      appearances: false,
      disableLabel: true,
      overrides: {
        admin: {
          condition: (_, { designVersion } = { designVersion: '' }) =>
            ['LOGOS2', 'LOGO3-custom'].includes(designVersion),
        },
      },
    }),

    {
      name: 'logos',
      type: 'upload',
      relationTo: 'media',
      required: true,
      minRows: 6,
      hasMany: true,
    },
  ],
}
