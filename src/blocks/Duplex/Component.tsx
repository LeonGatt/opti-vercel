import React from 'react'

import type { DuplexBlock as DuplexBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import styles from './index.module.css'

export const DuplexBlock: React.FC<DuplexBlockProps> = ({ layout, emphasis, richText, media }) => {
  return (
    <div className={ styles.duplexWrapper }>
      <div className={[
        styles.contentWrapper, 
        layout && styles[`layout-${layout}`],
        emphasis && styles[`emphasis-${emphasis}`]
      ].filter(Boolean).join(' ')}>

          {media && typeof media === 'object' && (
            <div className={ styles.mediaWrapper}>
              <Media className={ styles.mediaAsset } priority resource={media} />
            </div>
          )}
        
          {richText && (
            <div className={ styles.copyWrapper }> 
              <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} />
            </div>
          )}

      </div>
    </div>
  )
}