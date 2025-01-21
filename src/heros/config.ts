import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          defaultValue: 'lowImpact',
          label: 'Type',
          options: [
            {
              label: 'None',
              value: 'none',
            },
            {
              label: 'High Impact',
              value: 'highImpact',
            },
            {
              label: 'Medium Impact',
              value: 'mediumImpact',
            },
            {
              label: 'Low Impact',
              value: 'lowImpact',
            },
          ],
          required: true,
        },
        {
          name: 'theme',
          label: 'Theme',
          type: 'select',
          defaultValue: 'light',
          options: [
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Dark',
              value: 'dark',
            }
          ],
        },
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'valign',
          label: 'Copy Vertical Alignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            }
          ]
        },
        {
          name: 'halign',
          label: 'Copy Horizontal Alignment',
          type: 'select',
          defaultValue: 'center',
          options: [
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Left',
              value: 'left',
            },
          ]
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
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
          condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        },
      },
    }),
  ],
  label: false,
}
