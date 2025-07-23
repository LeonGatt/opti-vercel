'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { GalleryBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { extractPlainText, splitRichText } from '@/utilities/richtext'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { getSpacings } from '@/utilities/spacings'
import { cn } from '@/utilities'

const Gallery3Custom: React.FC<GalleryBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  elements,
  publicContext,
  spacings,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }
    updateSelection()
    carouselApi.on('select', updateSelection)
    return () => {
      carouselApi.off('select', updateSelection)
    }
  }, [carouselApi])

  return (
    <section className={cn('mx-auto lg:max-w-[1280px]', getSpacings(spacings))}>
      <div>
        <div className="mx-6 mb-12 flex items-center justify-between">
          {tagline && (
            <h2 className="font-heading max-w-[340px] text-4xl font-bold sm:max-w-full">
              {tagline}
            </h2>
          )}
          {elements && elements?.length > 1 && (
            <div className="flex shrink-0 gap-4 md:flex">
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
      </div>
      <div className="w-full pl-5">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: 'start',
            breakpoints: {
              '(max-width: 768px)': {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-[calc(theme(container.padding)-20px)] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)] flex gap-6 sm:gap-5">
            {elements &&
              elements.map((item) => {
                const { firstNode, rest } = splitRichText(item.richText, {
                  splitOn: ['h2', 'h3', 'h4'],
                  takeFirst: true,
                })
                return (
                  <CarouselItem
                    key={item.id}
                    className="max-w-[380px] p-0 sm:max-w-[305px] lg:max-w-[340px]"
                  >
                    <CMSLink
                      publicContext={publicContext}
                      {...item.oneLink}
                      label={''}
                      appearance={'inline'}
                      className="group flex flex-col items-start justify-between rounded-xl py-6"
                    >
                      <div className="w-full">
                        <div className="flex rounded-xl text-clip">
                          <div className="flex-1">
                            <div className="relative size-full origin-bottom transition duration-300 group-hover:scale-105">
                              {item.image && (
                                <Media
                                  resource={item.image}
                                  imgClassName="size-full object-cover object-center rounded-lg h-[253px] sm:h-[205px] lg:h-[227px]"
                                  htmlElement={null}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        {item.label && (
                          <Badge className="rounded-md font-normal">{item.label}</Badge>
                        )}
                      </div>

                      {firstNode && extractPlainText(firstNode) && (
                        <RichText
                          publicContext={publicContext}
                          content={firstNode}
                          overrideStyle={{
                            h2: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4 font-heading',
                            h3: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4 font-heading',
                            h4: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4 font-heading',
                            p: 'mb-3 line-clamp-2 min-h-[80px] text-sm text-muted-foreground md:text-base pt-4',
                          }}
                          withWrapper={false}
                        />
                      )}

                      {rest && extractPlainText(rest) && (
                        <RichText
                          publicContext={publicContext}
                          content={rest}
                          overrideStyle={{
                            h2: 'mb-3 line-clamp-2 break-words text-xl font-bold leading-8 font-heading',
                            h3: 'mb-3 line-clamp-2 break-words text-xl font-bold leading-8 font-heading',
                            h4: 'mb-3 line-clamp-2 break-words text-xl font-bold leading-8 font-heading',
                            p: 'mb-3 line-clamp-2 text-sm text-muted-foreground md:text-base',
                          }}
                          withWrapper={false}
                        />
                      )}

                      <div className="flex items-center text-sm">
                        {item.oneLink?.label}
                        <ChevronRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CMSLink>
                  </CarouselItem>
                )
              })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default Gallery3Custom
