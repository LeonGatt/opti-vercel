import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import styles from './index.module.css'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, theme, richText }) => {
  return (
    <div className={[
      styles.heroMedium, 
      theme && styles[`theme-${theme}`]
      ].filter(Boolean).join(' ')}>
      <div className={ styles.contentWrapper }>
        <div className={ styles.copyWrapper }>
          {richText && <RichText content={richText} enableGutter={false} />}

          {Array.isArray(links) && links.length > 0 && (
            <div className={ styles.linksWrapper }>
              {links.map(({ link }, i) => {
                return (<CMSLink theme={ theme } key={i} {...link} />)
              })}
            </div>
          )}
        </div>
        <div className={ styles.visualWrapper }>
          {media && typeof media === 'object' && (
            <div className={ styles.visualContent }>
              <Media
                imgClassName=""
                priority
                resource={media}
              />
              {media?.caption && (
                <div className={ styles.visualCaption }>
                  <RichText content={media.caption} enableGutter={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
