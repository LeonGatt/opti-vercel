import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import styles from './index.module.css'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className={ styles.ctaWrapper }>
      <div className={ styles.contentWrapper }>
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
