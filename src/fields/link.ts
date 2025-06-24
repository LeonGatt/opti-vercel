import type { Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'plain' | 'dim' | 'outline' | 'solid'
export type LinkColors = 'default' | 'blue' | 'orange'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  plain: {
    label: 'Plain',
    value: 'plain',
  },
  dim: {
    label: 'Dim',
    value: 'dim',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  solid: {
    label: 'Solid',
    value: 'solid',
  },
}
export const colorOptions: Record<LinkColors, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  blue: {
    label: 'Blue',
    value: 'blue',
  },
  orange: {
    label: 'Orange',
    value: 'orange',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  colors?: LinkColors[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({
  appearances,
  colors,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.plain,
      appearanceOptions.dim,
      appearanceOptions.outline,
      appearanceOptions.solid,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'plain',
      options: appearanceOptionsToUse,
    })
  }
  if (colors !== false) {
    let colorOptionsToUse = [colorOptions.default, colorOptions.blue, colorOptions.orange]

    if (colors) {
      colorOptionsToUse = colors.map((color) => colorOptions[color])
    }

    linkResult.fields.push({
      name: 'color',
      type: 'select',
      admin: {
        description: 'Color of the link.',
      },
      defaultValue: 'default',
      options: colorOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
