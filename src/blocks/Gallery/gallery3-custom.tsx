'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { CarouselApi } from '@/components/ui/carousel'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { GalleryBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { splitRichText } from '@/utilities/richtext'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

const Gallery3Custom: React.FC<GalleryBlock & { publicContext: PublicContextProps }> = ({
  tagline,
  elements,
  publicContext,
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
    <section className="lg:max-w-[1280px] mx-auto py-16">
      <div>
        <div className="mb-12 mx-6 flex items-center justify-between">
          {tagline && <h2 className="text-4xl font-bold max-w-[340px] sm:max-w-full">{tagline}</h2>}
          {elements && elements?.length > 1 && (
            <div className="shrink-0 flex gap-4 md:flex">
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
          <CarouselContent className="flex px-5 gap-6 sm:gap-5 ml-[calc(theme(container.padding)-20px)] 2xl:ml-[calc(50vw-700px+theme(container.padding)-20px)]">
            {elements &&
              elements.map((item) => {
                const { firstNode, rest } = splitRichText(item.richText, {
                  splitOn: ['h2', 'h3', 'h4'],
                  takeFirst: true,
                })
                return (
                  <CarouselItem
                    key={item.id}
                    className="p-0 max-w-[380px] sm:max-w-[305px] lg:max-w-[340px]"
                  >
                    <CMSLink
                      publicContext={publicContext}
                      {...item.link}
                      label={''}
                      className="group flex flex-col justify-between items-start rounded-xl py-6"
                    >
                      <div>
                        <div className="flex text-clip rounded-xl">
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

                      {firstNode && (
                        <RichText
                          publicContext={publicContext}
                          content={firstNode}
                          overrideStyle={{
                            h2: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4',
                            h3: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4',
                            h4: 'mb-3 line-clamp-2 min-h-[80px] break-words pt-4 text-xl font-bold leading-8 md:pt-4 lg:pt-4',
                            p: 'mb-3 line-clamp-2 min-h-[80px] text-sm text-muted-foreground md:text-base pt-4',
                          }}
                          withWrapper={false}
                        />
                      )}

                      {rest && (
                        <RichText
                          publicContext={publicContext}
                          content={rest}
                          overrideStyle={{
                            p: 'mb-3 line-clamp-2 text-sm text-muted-foreground md:text-base pt-4',
                          }}
                          withWrapper={false}
                        />
                      )}

                      <div className="flex items-center text-sm">
                        Read more{' '}
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
