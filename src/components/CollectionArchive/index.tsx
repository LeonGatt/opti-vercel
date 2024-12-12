import React from 'react'
import type { Post } from '@/payload-types'
import { Card } from '@/components/Card'
import styles from './index.module.css'

export type Props = {
  posts: Post[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={ styles.caWrapper }>
      <div>
        <div className={ styles.caGrid }>
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <Card doc={result} relationTo="posts" showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
