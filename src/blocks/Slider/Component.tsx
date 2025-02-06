'use client'

import React from 'react'
import { useRef } from 'react'
import type { SliderBlock as SliderBlockProps } from '@/payload-types'
import { Slide } from '@/components/Slide'

import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'


import 'swiper/css';


import styles from './index.module.css'

export const SliderBlock: React.FC<SliderBlockProps> = ({ blockTheme, slides, sliderTitle }) => {

  const navPrevRef = React.useRef(null);
  const navNextRef = React.useRef(null);
  const paginationRef = React.useRef(null);

  return (
    <div className={[styles.sliderWrapper, blockTheme && styles[`theme-${blockTheme}`]].filter(Boolean).join(' ')}>
      { sliderTitle && <h2 className={ styles.title }>{sliderTitle}</h2> }
      <div className={styles.contentWrapper}>
        {Array.isArray(slides) && slides.length > 0 && (
            <Swiper
              className={ styles.swiperWrapper }
              modules={[Navigation, Pagination, Autoplay, A11y]}
              spaceBetween={ 24 }
              slidesPerView={ 'auto' }
              slideActiveClass={ styles.slideActive }
              slideNextClass={ styles.slideNext }
              slidePrevClass={ styles.slidePrev }
              autoplay={{ 
                delay: 10000,
                pauseOnMouseEnter: true,
              }}
              centeredSlides={ true }
              loop={ true }
              lazyPreloadPrevNext={ 1 }
              navigation={{
                nextEl: navNextRef.current,
                prevEl: navPrevRef.current,
              }}
              pagination={{ 
                clickable: true,
                el: paginationRef.current,
                bulletClass: styles.bullet,
                bulletActiveClass: styles.bulletActive,
              }}
            >
              {slides.map((slide, i) => {
                return (<SwiperSlide className={ styles.swiperSlide } key={ i }><Slide theme={ blockTheme } {...slide} /></SwiperSlide>)
              })}
            </Swiper>
          )}

        <div className={ styles.navWrapper }>
          <div ref={ navPrevRef } className={ styles.sliderPrev }>
            <svg className={ styles.navElement } version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 36 36">
              <path className={ styles.navBGCircle } d="M18,0L18,0c9.9,0,18,8.1,18,18l0,0c0,9.9-8.1,18-18,18l0,0C8.1,36,0,27.9,0,18l0,0C0,8.1,8.1,0,18,0z"/>
              <path className={ styles.navArrow } d="M22,11l-8,6.5l8,6.5"/>
            </svg>
          </div>
          <div ref={ navNextRef } className={ styles.sliderNext }>
            <svg className={ styles.navElement } version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 36 36">
              <path className={ styles.navBGCircle } d="M18,0L18,0c9.9,0,18,8.1,18,18l0,0c0,9.9-8.1,18-18,18l0,0C8.1,36,0,27.9,0,18l0,0C0,8.1,8.1,0,18,0z"/>
              <path className={ styles.navArrow } d="M14,24l8-6.5L14,11"/>
            </svg>
          </div>
        </div>

        <div ref={ paginationRef } className={ styles.paginationWrapper }></div>

      </div>

    </div>
  )
}