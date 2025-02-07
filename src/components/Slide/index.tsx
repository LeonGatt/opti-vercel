
import Link from 'next/link'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Page, Media as MediaType } from '@/payload-types'

import styles from './index.module.css'

type SlideType = {
  
  theme?: 'dark' | 'light' | null | undefined;
  media: string | MediaType;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string | null;
          label: string;
          /**
           * Choose how the link should be rendered.
           */
          appearance?: ('plain' | 'dim' | 'outline' | 'solid') | null;
          /**
           * Color of the link.
           */
          color?: ('default' | 'blue' | 'orange') | null;
        };
        id?: string | null;
      }[]
    | null;
}


export const Slide: React.FC<SlideType> = (props) => {
  const {
    media,
    theme,
    links,
    richText,
  } = props

  return (
    <article className={[styles.slideWrapper, theme && styles[`theme-${theme}`]].filter(Boolean).join(' ')}>

      {media && typeof media === 'object' && (
        <div className={ styles.mediaWrapper}>
          <Media className={ styles.mediaAsset } priority resource={media} />
        </div>
      )}


      { richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} /> }

      <div className={ styles.linksWrapper }>
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} theme={ theme } size="lg" {...link} />
          })}
        </div>
      
    </article>
  )
}
