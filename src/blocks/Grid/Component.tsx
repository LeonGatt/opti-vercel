import React from 'react'
import RichText from '@/components/RichText'

import type { GridBlock as GridBlockProps } from '@/payload-types'
import styles from './index.module.css'

export const GridBlock: React.FC<GridBlockProps> = (props) => {
  const { columns, blockTheme } = props

  return (
    <div className={[styles.contentWrapper, blockTheme && styles[`theme-${blockTheme}`]].filter(Boolean).join(' ')}>
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