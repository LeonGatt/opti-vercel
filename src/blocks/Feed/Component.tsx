import type { Post, FeedBlock as FeedBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { FeedGrid } from '@/components/FeedGrid'
import styles from './index.module.css'

export const FeedBlock: React.FC<
  FeedBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, blockTheme, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className={[styles.feedWrapper, blockTheme && styles[`theme-${blockTheme}`]].filter(Boolean).join(' ')} id={`block-${id}`}>
      {introContent && (
        <div className={ styles.introWrapper }>
          <RichText className={ styles.richTextWrapper } content={introContent} enableGutter={false} />
        </div>
      )}

      {posts && (
        <div className={ styles.gridWrapper}>
          <FeedGrid posts={posts} />
        </div>
      )}
    </div>
  )
}