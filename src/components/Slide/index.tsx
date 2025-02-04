
import Link from 'next/link'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

import styles from './index.module.css'

type SlideType = {
  media: string | MediaType;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
}


export const Slide: React.FC<SlideType> = (props) => {
  const {
    media,
    richText,
  } = props

  return (
    <article>

      {media && typeof media === 'object' && (
        <div className={ styles.mediaWrapper}>
          <Media className={ styles.mediaAsset } priority resource={media} />
        </div>
      )}


      { richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} /> }
    </article>
  )
}
