import { FeatureBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { extractPlainText, splitRichText } from '@/utilities/richtext'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

const Feature111Custom: React.FC<FeatureBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  richText,
  links,
  USPs,
  publicContext,
}) => {
  const { firstNode, rest } = splitRichText(richText, {
    splitOn: ['h2', 'h3', 'h4'],
    takeFirst: true,
  })

  return (
    <section className="mx-auto py-24 lg:max-w-[1280px]">
      <div className="mx-6 md:mx-8">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="max-w-[376px] md:max-w-[768px]">
            <h2 className="text-text-default font-heading mb-5 text-center text-3xl leading-9 font-bold md:text-5xl">
              {tagline}
            </h2>
            {extractPlainText(firstNode) && firstNode && (
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
            {extractPlainText(rest) && rest && (
              <RichText
                publicContext={publicContext}
                content={rest}
                overrideStyle={{
                  p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                }}
                withWrapper={false}
              />
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
            {links?.map((link) => {
              return <CMSLink key={link.id} publicContext={publicContext} {...link.link} />
            })}
          </div>
        </div>
        <div className="mt-20 grid gap-10 md:mt-16 md:grid-cols-2">
          {USPs?.map((card) => {
            const { firstNode, rest } = splitRichText(card.richText, {
              splitOn: ['h2', 'h3', 'h4'],
              takeFirst: true,
            })

            return (
              <div key={card.id} className="bg-card rounded-lg">
                <div>
                  <div>
                    <div className="flex flex-col items-center justify-center gap-4 p-12 md:gap-6">
                      {card.image && card.imagePlacement === 'top' && (
                        <Media
                          resource={card.image}
                          imgClassName="w-full object-cover object-center rounded-lg size-25"
                          htmlElement={null}
                        />
                      )}
                      <h2 className="text-center text-2xl font-bold md:text-3xl">{card.tagline}</h2>
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
                      imgClassName={`w-full object-cover object-center rounded-b-lg h-[280px] md:h-[348px] lg:h-[378px]`}
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
