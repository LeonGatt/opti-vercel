import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import styles from './index.module.css'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, media }) => {
  return (
    <div className={ styles.ctaWrapper }>
      <div className={ styles.contentWrapper }>

          {media && typeof media === 'object' && (
            <div className={ styles.visualWrapper}>
              <Media className={ styles.imageWrapper } priority resource={media} />
            </div>
          )}
        
          {richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} />}

        <div className={ styles.linksWrapper }>
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
