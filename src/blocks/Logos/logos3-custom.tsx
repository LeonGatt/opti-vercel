// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

'use client'

import AutoScroll from 'embla-carousel-auto-scroll'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import type { LogosBlock, Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { hasRichTextContent } from '@/utilities/richtext'
import { cn } from '@/utilities'

const Logos3Custom: React.FC<LogosBlock & { publicContext: PublicContextProps }> = ({
  richText,
  logos,
  publicContext,
}) => {
  const hasRichText = richText && hasRichTextContent(richText)
  return (
    <section className="mx-auto max-w-[1440px]">
      <div className="container flex flex-col items-center text-center">
        {hasRichText && (
          <RichText
            publicContext={publicContext}
            content={richText}
            withWrapper={false}
            overrideStyle={{
              h2: 'my-6 text-pretty text-2xl font-bold lg:text-4xl',
              h3: 'my-6 text-pretty text-2xl font-bold lg:text-3xl',
              h4: 'my-6 text-pretty text-2xl font-bold lg:text-2xl',
              p: 'mb-6 text-lg',
            }}
          />
        )}
      </div>
      <div className={cn(hasRichText ? 'pt-10 md:pt-16 lg:pt-20' : 'pt-0')}>
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
            className="overflow-hidden"
          >
            <CarouselContent className="ml-0 gap-6">
              {logos?.map((logo: MediaType) => (
                <CarouselItem
                  key={logo.id}
                  className="basis-1/3 pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/8"
                >
                  <div className="flex shrink-0 items-center justify-center">
                    <Media imgClassName="h-20 w-auto object-contain" priority resource={logo} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="from-background absolute inset-y-0 left-0 w-12 bg-linear-to-r to-transparent"></div>
            <div className="from-background absolute inset-y-0 right-0 w-12 bg-linear-to-l to-transparent"></div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default Logos3Custom
