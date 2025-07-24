import type { ArrayField, Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'
import { CustomButtonVariants } from '@/types/button'

type LinkGroupType = (options?: {
  appearances?: false | CustomButtonVariants[]
  overrides?: Partial<ArrayField>
  disableIcon?: boolean
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {}, disableIcon } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
        disableIcon,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}
