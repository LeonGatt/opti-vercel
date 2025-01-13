import React from 'react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import styles from './index.module.css'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<Page['hero']> = ({ links, richText }) => {
  return (
    <div className={ styles.contentWrapper }>
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
  )
}
