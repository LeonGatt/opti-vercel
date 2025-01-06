import type { StaticImageData } from 'next/image'

import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

import styles from './index.module.css'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={[
      styles.mediaBlockWrapper, 
      className && styles[`${className}`],
      position && styles[`position-${position}`]
    ].filter(Boolean).join(' ')}>
      <div className={ styles.mediaWrapper }>
        <Media 
          resource={media} 
          src={staticImage} 
          className={[
            imgClassName && styles[`${imgClassName}`]
          ].filter(Boolean).join(' ')}
        />
      </div>
      {caption && (
        <div className={ styles.captionWrapper }>
          <RichText 
            content={caption} 
            enableGutter={false} 
            className={[
              captionClassName && styles[`${captionClassName}`]
            ].filter(Boolean).join(' ')}
          />
        </div>
      )}
    </div>
  )
}
