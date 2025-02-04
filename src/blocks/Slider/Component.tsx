import React from 'react'
import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import { Slide } from '@/components/Slide'
import styles from './index.module.css'

export const SliderBlock: React.FC<SliderBlockProps> = ({ blockTheme, slides, sliderTitle }) => {
  return (
    <div className={[styles.sliderWrapper, blockTheme && styles[`theme-${blockTheme}`]].filter(Boolean).join(' ')}>
      { sliderTitle && <h2 className={ styles.title }>{sliderTitle}</h2> }
      <div className={styles.contentWrapper}>
        {Array.isArray(slides) && slides.length > 0 && (
            <div className={ styles.slidesWrapper }>
              {slides.map((slide, i) => {
                return (<div key={i} className={ styles.slideWrapper }><Slide {...slide} /></div>)
              })}
            </div>
          )}

      </div>
    </div>
  )
}