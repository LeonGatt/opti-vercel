import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { FeedBlock } from '@/blocks/Feed/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { GridBlock } from '@/blocks/Grid/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DuplexBlock } from '@/blocks/Duplex/Component'
import { SliderBlock } from '@/blocks/Slider/Component'

const blockComponents = {
  feed: FeedBlock,
  grid: GridBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  duplexBlock: DuplexBlock,
  sliderBlock: SliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <>
                  {/* @ts-expect-error */}
                  <Block key={index} {...block} />
                </>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
