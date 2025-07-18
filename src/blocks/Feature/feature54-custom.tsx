'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeatureBlock, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { extractPlainText, splitRichText } from '@/utilities/richtext'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

const Feature54Custom: React.FC<FeatureBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  richText,
  USPs,
  publicContext,
  fillFromDescription,
}) => {
  const tabsData = USPs?.filter((usp) => usp.id).map((usp) => {
    return {
      id: usp.id as string,
      richtext: usp.richText,
      image: usp.image as MediaType,
      tagline: usp.tagline,
      links: usp.links,
    }
  })

  const [activeTabId, setActiveTabId] = useState<string | null>(tabsData?.[0]?.id || null)

  if (!tabsData?.length || !activeTabId)
    return <div className="text-red-500">You need to add USPs for the component to work</div>

  return (
    <section className="mx-auto py-16 lg:max-w-[1280px]">
      <div className="mx-6 md:mx-8">
        <div className="flex justify-center">
          <h3 className="text-text-default mb-12 text-center text-5xl font-bold lg:max-w-3xl">
            {tagline}
          </h3>
        </div>
        <div className="text-center">
          <Tabs value={activeTabId} onValueChange={setActiveTabId}>
            {tabsData.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                {feature.image && (
                  <Media
                    resource={feature.image}
                    imgClassName="w-full object-cover object-center rounded-xl h-[233px] md:h-[389px] lg:h-[612px]"
                    htmlElement={null}
                  />
                )}
                <div className="mt-12">
                  <div className="no-scrollbar overflow-auto">
                    <TabsList className="bg-background-dark h-10 p-1">
                      {tabsData.map((feature) => (
                        <TabsTrigger
                          key={feature.id}
                          value={feature.id}
                          className="text-text-light px-3 py-1.5"
                        >
                          {feature.tagline}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {activeTabId &&
                    (() => {
                      const { firstNode, rest } = splitRichText(feature.richtext, {
                        splitOn: ['h2', 'h3', 'h4'],
                        takeFirst: true,
                      })

                      const { firstNode: firstNodeDescription, rest: restDescription } =
                        splitRichText(richText, {
                          splitOn: ['h2', 'h3', 'h4'],
                          takeFirst: true,
                        })

                      return (
                        <div
                          key={feature.id}
                          className="mx-auto max-w-[426px] md:max-w-[564px] mt-12"
                        >
                          {extractPlainText(firstNodeDescription) &&
                            firstNodeDescription &&
                            fillFromDescription && (
                              <RichText
                                publicContext={publicContext}
                                content={firstNodeDescription}
                                overrideStyle={{
                                  h2: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                  h3: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                  h4: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                  p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                                }}
                                withWrapper={false}
                              />
                            )}
                          {extractPlainText(restDescription) &&
                            restDescription &&
                            fillFromDescription && (
                              <RichText
                                publicContext={publicContext}
                                content={restDescription}
                                overrideStyle={{
                                  p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                                }}
                                withWrapper={false}
                              />
                            )}
                          {extractPlainText(firstNode) && firstNode && !fillFromDescription && (
                            <RichText
                              publicContext={publicContext}
                              content={firstNode}
                              overrideStyle={{
                                h2: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                h3: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                h4: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl',
                                p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                              }}
                              withWrapper={false}
                            />
                          )}
                          {extractPlainText(firstNode) && rest && !fillFromDescription && (
                            <RichText
                              publicContext={publicContext}
                              content={rest}
                              overrideStyle={{
                                p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
                              }}
                              withWrapper={false}
                            />
                          )}
                          <div className="mt-12 flex flex-col justify-center gap-4 md:flex-row md:items-center md:gap-6">
                            {feature.links?.map((link) => {
                              return (
                                <CMSLink
                                  key={link.id}
                                  {...link.link}
                                  publicContext={publicContext}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    })()}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Feature54Custom
