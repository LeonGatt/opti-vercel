import React from 'react'

import type { SliderBlock as SliderBlockProps, Slide as SlideType } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Slide } from '@/components/Slide'
import styles from './index.module.css'

export const SliderBlock: React.FC<SliderBlockProps> = ({ blockTheme, slider }) => {
  return (
    <div className={[styles.sliderWrapper, blockTheme && styles[`theme-${blockTheme}`]].filter(Boolean).join(' ')}>
      <div className={styles.contentWrapper}>

        Slider goes here
        { slider && slider.length }


        {Array.isArray(slider) && slider.length > 0 && (
            <div className={ styles.slideWrapper }>
              {slider.map((slide, i) => {
                return (<Slide key={i} {...slide} />)
              })}
            </div>
          )}

      </div>
    </div>
  )
}