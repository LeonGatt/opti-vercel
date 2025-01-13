import React from 'react'
import RichText from '@/components/RichText'

import type { GridBlock as ContentBlockProps } from '@/payload-types'
import styles from './index.module.css'

export const GridBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className={ styles.contentWrapper }>
      <div className={ styles.contentGrid }>
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {richText, size } = col

            return (
              <div
                className={[styles.contentCol, size && styles[`size-${size}`]].filter(Boolean).join(' ')}
                key={index}
              >
                {richText && <RichText content={richText} enableGutter={false} />}

              </div>
            )
          })}
      </div>
    </div>
  )
}