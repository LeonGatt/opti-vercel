'use client'
import { FeatureBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { extractPlainText, splitRichText } from '@/utilities/richtext'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities'
import { getSpacings } from '@/utilities/spacings'
import { useMemo } from 'react'

const Feature111Custom: React.FC<FeatureBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  richText,
  links,
  USPs,
  publicContext,
  spacings,
  threeColumnLayout,
  fullImageWidth,
}) => {
  const { firstNode, rest } = splitRichText(richText, {
    splitOn: ['h2', 'h3', 'h4'],
    takeFirst: true,
  })

  const fullImagePadding = threeColumnLayout ? 'px-6 pb-6' : 'px-14 pb-12'
  const fullImageSize = threeColumnLayout
    ? 'h-[280px] md:h-[348px]'
    : 'h-[280px] md:h-[348px] lg:h-[378px]'

  const hasContent = useMemo(() => {
    return Boolean(tagline || extractPlainText(firstNode) || (links?.length ?? 0) > 0)
  }, [tagline, firstNode, links])

  return (
    <section className={cn('mx-auto lg:max-w-[1280px]', getSpacings(spacings))}>
      <div className="mx-6 md:mx-8">
        {hasContent && (
          <div className="mx-auto mb-20 flex max-w-[376px] flex-col gap-5 md:mb-16 md:max-w-[768px]">
            {tagline && (
              <h2 className="text-text-default font-heading text-center text-3xl leading-9 font-bold md:text-5xl">
                {tagline}
              </h2>
            )}
            {firstNode && extractPlainText(firstNode) && (
              <RichText
                publicContext={publicContext}
                content={firstNode}
                overrideStyle={{
                  h2: 'line-clamp-3 break-words text-lg font-medium md:text-xl lg:text-2xl font-heading',
                  h3: 'line-clamp-3 break-words text-lg font-medium md:text-xl lg:text-2xl font-heading',
                  h4: 'line-clamp-3 break-words text-lg font-medium md:text-xl lg:text-2xl font-heading',
                  p: 'line-clamp-4 text-center text-[#86868B] leading-8 text-text-light md:text-xl',
                }}
                withWrapper={false}
              />
            )}
            {rest && extractPlainText(rest) && (
              <RichText
                publicContext={publicContext}
                content={rest}
                overrideStyle={{
                  p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                }}
                withWrapper={false}
              />
            )}
            {links && links.length > 0 && (
              <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
                {links?.map((link) => {
                  return <CMSLink key={link.id} publicContext={publicContext} {...link.link} />
                })}
              </div>
            )}
          </div>
        )}
        <div className={cn('grid gap-7', threeColumnLayout ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
          {USPs?.map((card) => {
            const { firstNode, rest } = splitRichText(card.richText, {
              splitOn: ['h2', 'h3', 'h4'],
              takeFirst: true,
            })

            return (
              <div key={card.id} className="bg-card rounded-lg">
                <div>
                  <div>
                    <div className="flex flex-col items-center justify-center gap-4 p-12 pb-[30px] md:gap-6">
                      {card.image && card.imagePlacement === 'top' && (
                        <Media
                          resource={card.image}
                          imgClassName="w-full object-cover object-center rounded-lg size-25"
                          htmlElement={null}
                        />
                      )}
                      <h2
                        className={cn(
                          'text-center font-bold',
                          threeColumnLayout ? 'text-2xl' : 'md:text-3xl lg:text-2xl',
                        )}
                      >
                        {card.tagline}
                      </h2>
                      {extractPlainText(firstNode) && firstNode && (
                        <RichText
                          publicContext={publicContext}
                          content={firstNode}
                          overrideStyle={{
                            h2: 'line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                            h3: 'line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                            h4: 'line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                            p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-text-light text-center',
                          }}
                          withWrapper={false}
                        />
                      )}
                      {extractPlainText(rest) && rest && (
                        <RichText
                          publicContext={publicContext}
                          content={rest}
                          overrideStyle={{
                            p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-text-light md:max-w-[244px] text-center',
                          }}
                          withWrapper={false}
                        />
                      )}

                      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
                        {card.links?.map((link, index) => {
                          return (
                            <CMSLink
                              key={link.id}
                              publicContext={publicContext}
                              {...link.link}
                              className={
                                index === 0 && card.links?.length === 3
                                  ? 'w-full md:w-auto'
                                  : 'flex-1 md:flex-none'
                              }
                            />
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  {card.image && card.imagePlacement === 'bottom' && (
                    <Media
                      resource={card.image}
                      imgClassName={cn(
                        'w-full object-contain object-center rounded-b-lg',
                        fullImageWidth ? 'p-0' : fullImagePadding,
                        fullImageWidth ? fullImageSize : 'h-[250px]',
                      )}
                      htmlElement={null}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Feature111Custom
