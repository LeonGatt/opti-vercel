import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { backgroundColor } from '@/fields/color'
import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { createBlockItemCondition } from '@/utilities/findParentFeatureVersion'
import { HeadingFeature, lexicalEditor, ParagraphFeature } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const allBentoBoxDesignVersions = [
  {
    label: 'BENTOBOX1',
    value: 'BENTOBOX1',
    image: '/admin/previews/bentobox/bentobox1.jpg',
  },
  {
    label: 'BENTOBOX2',
    value: 'BENTOBOX2',
    image: '/admin/previews/bentobox/bentobox2.jpg',
  },
] as const

const bentoBoxDesignVersions: string[] = allBentoBoxDesignVersions.map((item) => item.value)

export type BentoBoxDesignVersion = (typeof allBentoBoxDesignVersions)[number]

export const BentoBoxBlock: Block = {
  slug: 'bentobox',
  interfaceName: 'BentoBoxBlock',
  labels: {
    singular: 'BentoBox',
    plural: 'BentoBoxes',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allBentoBoxDesignVersions),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional heading and description for the bento box.',
        condition: (_, { designVersion = '' } = {}) =>
          ['BENTOBOX1', 'BENTOBOX2'].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          ParagraphFeature(),
        ],
      }),
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { designVersion = '' } = {}) =>
            ['BENTOBOX1', 'BENTOBOX2'].includes(designVersion),
        },
      },
    }),
    {
      name: 'fullSizeImage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If this image should be displayed in full size.',
        condition: (_, { designVersion = '' } = {}) => ['BENTOBOX1'].includes(designVersion),
      },
    },
    {
      name: 'elements',
      label: 'Bento Box Items',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 5,
      admin: {
        description: 'Add images to the bento box',
        condition: (_, { designVersion = '' } = {}) =>
          bentoBoxDesignVersions.includes(designVersion),
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
          type: 'richText',
          localized: true,
          admin: {
            condition: createBlockItemCondition(['BENTOBOX1', 'BENTOBOX2']),
          },
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              ParagraphFeature(),
            ],
          }),
        },
        linkGroup({
          overrides: {
            label: 'Buttons',
            maxRows: 2,
            admin: {
              condition: createBlockItemCondition(['BENTOBOX2']),
            },
          },
        }),
        link({
          appearances: false,
          disableIcon: true,
          disableLabel: true,
          overrides: {
            admin: {
              condition: createBlockItemCondition(['BENTOBOX1', 'BENTOBOX2']),
            },
          },
        }),
      ],
    },
  ],
}
