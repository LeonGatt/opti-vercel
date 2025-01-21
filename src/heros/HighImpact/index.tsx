import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import styles from './index.module.css'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, theme, valign, halign, richText }) => {

  return (
    <div className={[
      styles.heroHigh, 
      theme && styles[`theme-${theme}`],
      valign && styles[`valign-${valign}`],
      halign && styles[`halign-${halign}`]
      ].filter(Boolean).join(' ')}>
      <div className={ styles.contentWrapper }>
        <div className={ styles.visualWrapper}>
          {media && typeof media === 'object' && (
            <Media className={ styles.imageWrapper } priority resource={media} />
            
          )}
        </div>
        <div className={ styles.copyWrapper }>
          {richText && <RichText className={ styles.richTextWrapper } content={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <div className={ styles.linksWrapper }>
              {links.map(({ link }, i) => {
                return (<CMSLink key={i} theme={ theme } {...link} />)
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
