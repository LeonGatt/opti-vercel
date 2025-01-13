import type { ArrayField, Field } from 'payload'

import type { LinkAppearances, LinkColors } from './link'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  colors?: LinkColors[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, colors, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
        colors,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
