'use client'

import { useCallback, useMemo, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FeatureBlock, Media as MediaType } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { extractPlainText, splitRichText } from '@/utilities/richtext'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities'
import { getSpacings } from '@/utilities/spacings'

type FeatureUSPItem = NonNullable<FeatureBlock['USPs']>[number]

const ActiveTabContent: React.FC<{
  feature: FeatureUSPItem
  richtext: FeatureBlock['richText']
  publicContext: PublicContextProps
  fillFromDescription?: boolean | null
}> = ({ feature, richtext, publicContext, fillFromDescription }) => {
  const { firstNode, rest } = splitRichText(feature.richText, {
    splitOn: ['h2', 'h3', 'h4'],
    takeFirst: true,
  })

  const { firstNode: firstNodeDescription, rest: restDescription } =
    splitRichText(richtext, {
      splitOn: ['h2', 'h3', 'h4'],
      takeFirst: true,
    })

  return (
    <div
      key={feature.id}
      className="mx-auto mt-12 max-w-[426px] md:max-w-[564px]"
    >
      {
        firstNodeDescription &&
        fillFromDescription && extractPlainText(firstNodeDescription) && (
          <RichText
            publicContext={publicContext}
            content={firstNodeDescription}
            overrideStyle={{
              h2: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              h3: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              h4: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
            }}
            withWrapper={false}
          />
        )}
      {
        restDescription &&
        fillFromDescription && extractPlainText(restDescription) && (
          <RichText
            publicContext={publicContext}
            content={restDescription}
            overrideStyle={{
              p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
            }}
            withWrapper={false}
          />
        )}
      {
        firstNode && !fillFromDescription && extractPlainText(firstNode) && (
          <RichText
            publicContext={publicContext}
            content={firstNode}
            overrideStyle={{
              h2: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              h3: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              h4: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
              p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
            }}
            withWrapper={false}
          />
        )}
      {rest && !fillFromDescription && extractPlainText(firstNode) && (
        <RichText
          publicContext={publicContext}
          content={rest}
          overrideStyle={{
            p: 'line-clamp-4 text-center text-[#86868B] leading-6 text-base',
          }}
          withWrapper={false}
        />
      )}
      {feature.links && feature.links.length > 0 && <div className={cn("mt-12 flex flex-col justify-center gap-4 md:flex-row md:items-center md:gap-6", feature.links?.length === 1 && 'items-center')}>
        {feature.links?.map((link) => {
          return (
            <CMSLink
              key={link.id}
              {...link.link}
              publicContext={publicContext}
            />
          )
        })}
      </div>}
    </div>
  );
}

const Feature54Custom: React.FC<FeatureBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  richText,
  USPs,
  publicContext,
  fillFromDescription,
  spacings,
}) => {
  const tabsData = useMemo(() => USPs?.filter((usp) => usp.id).map((usp) => {
    return {
      id: usp.id as string,
      richText: usp.richText,
      image: usp.image as MediaType,
      tagline: usp.tagline,
      links: usp.links,
    }
  }), [USPs])

  const [activeTab, setActiveTab] = useState<FeatureUSPItem | null>(() => tabsData?.[0] || null)

  const selectActiveFeature = useCallback((tabId: string) => {
    const feature = tabsData?.find((feature) => feature.id === tabId)
    if (feature) {
      setActiveTab(feature)
    }
  }, [tabsData])

  if (!tabsData?.length || !activeTab?.id)
    return <div className="text-red-500">You need to add USPs for the component to work</div>

  return (
    <section className={cn('mx-auto py-16 lg:max-w-[1280px]', getSpacings(spacings))}>
      <div className="mx-6 md:mx-8">
        <div className="flex justify-center">
          <h3 className="text-text-default font-heading mb-12 text-center text-5xl font-bold lg:max-w-3xl">
            {tagline}
          </h3>
        </div>
        <div className="text-center">
          <Tabs value={activeTab.id} onValueChange={selectActiveFeature}>
            {tabsData.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                {feature.image && (
                  <Media
                    resource={feature.image}
                    imgClassName="w-full object-cover object-center rounded-xl h-[233px] md:h-[389px] lg:h-[612px]"
                    htmlElement={null}
                  />
                )}
              </TabsContent>
            ))}
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
              {activeTab &&
                <ActiveTabContent
                  feature={activeTab}
                  richtext={richText}
                  publicContext={publicContext}
                  fillFromDescription={fillFromDescription}
                />
              }
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default Feature54Custom
