import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import styles from './index.module.css'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, meta: { image: metaImage } = {}, publishedAt, title } = post

  return (
    <div className={ styles.heroWrapper }>
      <div className={ styles.copyWrapper }>
        <div className={ styles.categoriesWrapper }>
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              const { title: categoryTitle } = category

              const titleToUse = categoryTitle || 'Untitled category'
              return (
                <div key={index}>{titleToUse}</div>
              )
            }
            return null
          })}
        </div>

        <div className={ styles.titleWrapper }>
          <h1>{title}</h1>
        </div>


        {publishedAt && (
          <div className={ styles.publishedWrapper }>
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          </div>
        )}

      </div>

        {metaImage && typeof metaImage !== 'string' && (
          <div className={ styles.mediaWrapper }>
            <Media resource={metaImage} />
          </div>
        )}
    </div>
  )
}
