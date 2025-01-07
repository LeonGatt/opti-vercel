import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'small',
        width: 600,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },

      },
      {
        name: 'medium',
        width: 900,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'large',
        width: 1400,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },
      },
      {
        name: 'xlarge',
        width: 1920,
        generateImageName: ({ originalName, sizeName, extension}) => {
          return `${originalName}-${sizeName}.${extension}`
        },
      },
    ],
  },
}
