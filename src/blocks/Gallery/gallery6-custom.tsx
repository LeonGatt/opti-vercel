'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { GalleryBlock } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { splitRichText } from '@/utilities/richtext'

import { PublicContextProps } from '@/utilities/publicContextProps'
import { cn } from '@/utilities'
import { getSpacings } from '@/utilities/spacings'

const Gallery6Custom: React.FC<GalleryBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  link,
  elements,
  publicContext,
  spacings,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setSelectedIndex(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  const activeElement = elements?.[selectedIndex]
  const activeRichText = activeElement
    ? splitRichText(activeElement.richText, {
        splitOn: ['h2', 'h3', 'h4'],
        takeFirst: true,
      })
    : null

  return (
    <section className={cn('mx-auto py-16 lg:max-w-[1280px]', getSpacings(spacings))}>
      <div>
        <div className="mx-6 mb-0 sm:mx-8 md:mb-12">
          {tagline && <h2 className="font-heading text-3xl font-bold sm:text-5xl">{tagline}</h2>}

          {link && (
            <CMSLink
              publicContext={publicContext}
              className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
              {...link}
              iconClassName="ml-2 size-4 transition-transform group-hover:translate-x-1"
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))] flex gap-6 px-6 py-8 sm:px-8 sm:pt-14">
            {elements &&
              elements.map((item) => {
                return (
                  <CarouselItem
                    key={item.id}
                    className="max-w-[380px] p-0 sm:max-w-[596px] md:max-w-[956px]"
                  >
                    <CMSLink
                      publicContext={publicContext}
                      {...item.link}
                      appearance="inline"
                      label={null}
                      iconAfter={null}
                      iconBefore={null}
                      className="group flex flex-col justify-between"
                    >
                      <div className="flex rounded-xl text-clip">
                        <div className="flex-1">
                          <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-103">
                            {item.image && (
                              <Media
                                resource={item.image}
                                imgClassName="size-full object-cover object-center rounded-xl w-[380px] sm:w-[596px] md:w-[956px] h-[253px] sm:h-[355px] md:h-[569px]"
                                htmlElement={null}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CMSLink>
                  </CarouselItem>
                )
              })}
          </CarouselContent>
        </Carousel>
        {activeRichText && (
          <div className="ml-[calc(theme(container.padding)-20px)] mr-[calc(theme(container.padding))] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] 2xl:mr-[calc(50vw-700px+theme(container.padding))] flex items-start justify-between gap-6 px-6 md:px-8">
            <div className="max-w-[356px] sm:max-w-[500px] md:max-w-[700px]">
              {activeRichText.firstNode && (
                <RichText
                  publicContext={publicContext}
                  content={activeRichText.firstNode}
                  overrideStyle={{
                    h2: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                    h3: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                    h4: 'mb-2 line-clamp-3 break-words text-lg font-medium md:mb-3 md:text-xl lg:text-2xl font-heading',
                    p: 'line-clamp-4 leading-6 text-muted-foreground text-base',
                  }}
                  withWrapper={false}
                  className="rich-text-strong"
                />
              )}
              {activeRichText.rest && (
                <RichText
                  publicContext={publicContext}
                  content={activeRichText.rest}
                  overrideStyle={{
                    p: 'line-clamp-2 text-sm text-muted-foreground md:text-base mt-4',
                  }}
                  withWrapper={false}
                />
              )}

              {activeElement?.link && (
                <CMSLink
                  {...activeElement.link}
                  publicContext={publicContext}
                  className="mt-8 justify-start text-sm"
                />
              )}
            </div>
            {elements && elements?.length > 1 && (
              <div className="mx-6 mt-14 hidden shrink-0 items-center justify-end gap-4 sm:mt-0 sm:flex">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    carouselApi?.scrollPrev()
                  }}
                  disabled={!canScrollPrev}
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    carouselApi?.scrollNext()
                  }}
                  disabled={!canScrollNext}
                >
                  <ChevronRight className="size-6" />
                </Button>
              </div>
            )}
          </div>
        )}
        <div className="mx-6 mt-14 flex shrink-0 items-center justify-end gap-4 sm:mt-0 sm:hidden">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              carouselApi?.scrollPrev()
            }}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => {
              carouselApi?.scrollNext()
            }}
            disabled={!canScrollNext}
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Gallery6Custom
