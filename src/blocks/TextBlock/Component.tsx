import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { TextBlock as TextBlockProps } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'
import { getSpacings } from '@/utilities/spacings'

export const TextBlock: React.FC<
  TextBlockProps & {
    publicContext: PublicContextProps
    disableContainer?: boolean
  }
> = (props) => {
  const { content, links, publicContext, disableContainer, spacings, headingSize, textAlignment } =
    props

  const headingClasses = `font-heading font-bold ${headingSize === 'xl' ? 'text-5xl' : 'text-4xl'}`

  return (
    <div className={cn(!disableContainer ? 'container' : '', getSpacings(spacings))}>
      <div
        className={cn(
          'xxl:max-w-[919px] md:max-w-[760px]',
          textAlignment === 'center' ? 'mx-auto' : '',
        )}
      >
        {content && (
          <RichText
            publicContext={publicContext}
            content={content}
            className={`${textAlignment === 'center' ? 'text-center' : 'text-left'}`}
            overrideStyle={{
              h2: headingClasses,
              h3: headingClasses,
              h4: headingClasses,
              p: 'text-muted-foreground lg:text-lg',
            }}
          />
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          {Array.isArray(links) &&
            links.length > 0 &&
            links.map(({ link }, i) => <CMSLink publicContext={publicContext} key={i} {...link} />)}
        </div>
      </div>
    </div>
  )
}
