
import Link from 'next/link'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { Slide as SlideType } from '@/payload-types'


import styles from './index.module.css'




export const Slide: React.FC<SlideType> = ({ image, richText }) => {

  return (
    <article>Slide Here!

      {image && typeof image === 'object' && (
        <div className={ styles.mediaWrapper}>
          <Media className={ styles.mediaAsset } priority resource={image} />
        </div>
      )}



      {richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} />}
    </article>
  )
}