import { Block } from 'payload'
import { backgroundColor } from '@/fields/color'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { HeroHorizontalAlignment, HeroVerticalAlignment } from '@/components/uiCustom/HeroCustom'
import { darkMode } from '@/fields/darkMode'
import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'
import { blockSpacings } from '@/fields/spacing'

export const allHeroDesignVersions = [
  {
    label: 'Hero',
    value: 'HERO1-custom',
    image: '/admin/previews/hero/customHighImpact.jpg',
  },
] as const

export type HeroDesignVersion = (typeof allHeroDesignVersions)[number]

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Hero Blocks',
  },
  fields: [
    blockSpacings,
    backgroundColor,
    designVersionPreview(allHeroDesignVersions),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({
              enabledHeadingSizes: ['h2', 'h3', 'h4'],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
        },
      },
    }),
    {
      name: 'images',
      type: 'upload',
      admin: {
        condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
      },
      relationTo: 'media',
      hasMany: true,
      maxRows: 3,
    },
    {
      name: 'horizontalAlignment',
      label: 'Horizontal Alignment',
      type: 'select',
      options: Object.entries(HeroHorizontalAlignment).map(([label, value]) => ({
        label,
        value,
      })),
      defaultValue: HeroHorizontalAlignment.left,
      admin: {
        description: 'Choose the horizontal alignment of the hero content.',

        condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
      },
    },
    {
      name: 'verticalAlignment',
      label: 'Vertical Alignment',
      type: 'select',
      options: Object.entries(HeroVerticalAlignment).map(([label, value]) => ({
        label,
        value,
      })),
      defaultValue: HeroVerticalAlignment.middle,
      admin: {
        description: 'Choose the vertical alignment of the hero content.',
        condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
      },
    },
    {
      name: 'highImpact',
      label: 'High Impact',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable high impact mode for the hero section.',
        condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
      },
    },
    darkMode({
      overrides: {
        admin: {
          condition: (_, { designVersion = '' } = {}) => ['HERO1-custom'].includes(designVersion),
        },
      },
    }),
  ],
}
