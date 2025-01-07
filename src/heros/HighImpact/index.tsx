import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import styles from './index.module.css'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {

  return (
    <div className={ styles.heroHigh }>
      <div className={ styles.contentWrapper }>
        <div className={ styles.visualWrapper}>
          {media && typeof media === 'object' && (
            <Media className={ styles.imageWrapper } priority resource={media} />
          )}
        </div>
        <div className={ styles.copyWrapper }>
          {richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={ styles.linksList }>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
