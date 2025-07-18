import { Block } from 'payload'
import { HeadingFeature, ParagraphFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { backgroundColor } from '@/fields/color'
import { designVersionPreview } from '@/components/AdminDashboard/DesignVersionPreview/config'
import { createBlockItemCondition } from '@/utilities/findParentFeatureVersion'

export const allGalleryDesignVersions = [
  // 'GALLERY1',
  // 'GALLERY2',
  {
    label: 'Gallery 3',
    value: 'GALLERY3',
    image: '/admin/previews/gallery/gallery3.jpg',
  },
  {
    label: 'Gallery 3 (Custom)',
    value: 'GALLERY3-custom',
    image: '/admin/previews/gallery/gallery3-custom.jpg',
  },
  {
    label: 'Gallery 4 (Large Images with Overlay)',
    value: 'GALLERY4',
    image: '/admin/previews/gallery/gallery4.jpeg',
  },
  {
    label: 'Gallery 5 (Carousel)',
    value: 'GALLERY5',
    image: '/admin/previews/gallery/gallery5.jpeg',
  },
  {
    label: 'Gallery 6 (Card Layout)',
    value: 'GALLERY6',
    image: '/admin/previews/gallery/gallery6.jpeg',
  },
  {
    label: 'Gallery 6 (Custom)',
    value: 'GALLERY6-custom',
    image: '/admin/previews/gallery/gallery6-custom.jpg',
  },
  {
    label: 'Gallery 25 (4 Column Grid)',
    value: 'GALLERY25',
    image: '/admin/previews/gallery/gallery25.webp',
    description:
      'A 4-column animated image gallery, each column with varying image heights and animated transitions on view. (Grid - Number of images should be in multiples of 4)',
  },
  {
    label: 'Gallery 26 (Blur Vignette)',
    value: 'GALLERY26',
    image: '/admin/previews/gallery/gallery26.webp',
  },
] as const

/**
 * mutable copy of allGalleryDesignVersions as payload needs this type
 */
const galleryDesignVersions: string[] = allGalleryDesignVersions.map((item) => item.value)

export type GalleryDesignVersion = (typeof allGalleryDesignVersions)[number]

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Gallery Blocks',
  },
  fields: [
    backgroundColor,
    designVersionPreview(allGalleryDesignVersions),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional heading and description for the gallery',
        condition: (_, { designVersion = '' } = {}) =>
          ![
            'GALLERY1',
            'GALLERY3',
            'GALLERY25',
            'GALLERY26',
            'GALLERY3-custom',
            'GALLERY6-custom',
          ].includes(designVersion),
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          ParagraphFeature(),
        ],
      }),
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, { designVersion = '' } = {}) =>
          ['GALLERY3', 'GALLERY6', 'GALLERY3-custom', 'GALLERY6-custom'].includes(designVersion),
      },
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          description: 'Single link for this gallery. Might look best with arrowRight icon',
          condition: (_, { designVersion }: any) => ['GALLERY6'].includes(designVersion),
        },
      },
    }),
    {
      name: 'elements',
      label: 'Gallery Items',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add images to the gallery',
        condition: (_, { designVersion = '' } = {}) =>
          galleryDesignVersions.includes(designVersion),
      },
      validate: (value, { siblingData }: any) => {
        if (['GALLERY6-custom'].includes(siblingData?.designVersion)) {
          return (Array.isArray(value) && value?.length <= 5) || 'You can only add up to 5 items.'
        }
        if (['GALLERY3-custom'].includes(siblingData?.designVersion)) {
          return (Array.isArray(value) && value?.length <= 8) || 'You can only add up to 8 items.'
        }
        return true
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageHeight',
          type: 'select',
          options: [
            '12rem',
            '13rem',
            '14rem',
            '15rem',
            '16rem',
            '17rem',
            '18rem',
            '19rem',
            '20rem',
            '21rem',
            '22rem',
            '23rem',
            '24rem',
            '25rem',
            '26rem',
            '27rem',
            '28rem',
            '29rem',
            '30rem',
            '31rem',
            '32rem',
          ],
          defaultValue: '21rem',
          admin: {
            description: 'Select the height of the image. This is only applicable to Gallery 25.',
            condition: createBlockItemCondition(['GALLERY25']),
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Select an icon to display with this item',
            condition: createBlockItemCondition(['GALLERY4', 'GALLERY5', 'GALLERY6']),
            components: {
              Field: {
                path: '@/components/AdminDashboard/IconSelect',
              },
            },
          },
        },
        {
          name: 'richText',
          type: 'richText',
          localized: true,
          admin: {
            condition: createBlockItemCondition([
              'GALLERY3',
              'GALLERY4',
              'GALLERY5',
              'GALLERY6',
              'GALLERY6-custom',
              'GALLERY3-custom',
            ]),
          },
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              ParagraphFeature(),
            ],
          }),
        },
        link({
          overrides: {
            admin: {
              condition: createBlockItemCondition([
                'GALLERY3',
                'GALLERY4',
                'GALLERY5',
                'GALLERY6',
                'GALLERY6-custom',
                'GALLERY3-custom',
              ]),
            },
          },
        }),
        {
          name: 'label',
          type: 'text',
          label: 'Badge',
          localized: true,
          admin: {
            condition: createBlockItemCondition(['GALLERY3', 'GALLERY3-custom']),
          },
        },
        {
          name: 'cta_button',
          label: 'CTA Button',
          type: 'group',
          required: false,
          admin: {
            description: 'Optional button',
            condition: createBlockItemCondition(['GALLERY6-custom']),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: false,
            },
            {
              name: 'url',
              label: 'Custom URL',
              type: 'text',
              required: false,
            },
            {
              name: 'variant',
              type: 'select',
              options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
