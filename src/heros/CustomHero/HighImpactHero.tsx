import type { Media as MediaType, Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities'
import { PublicContextProps } from '@/utilities/publicContextProps'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export interface HeroProps {
  title: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  horizontalAlignment?: HorizontalAlignment
  verticalAlignment?: VerticalAlignment
  className?: string
  highImpact?: boolean
  media: MediaType
}

export enum HeroHorizontalAlignment {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export enum HeroVerticalAlignment {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}

export type HorizontalAlignment = HeroHorizontalAlignment
export type VerticalAlignment = HeroVerticalAlignment

const horizontalAlignmentClasses = {
  [HeroHorizontalAlignment.Left]: 'text-left items-start',
  [HeroHorizontalAlignment.Center]: 'text-center items-center',
  [HeroHorizontalAlignment.Right]: 'text-right items-end',
}

const verticalAlignmentClasses = {
  [HeroVerticalAlignment.Top]: 'justify-start',
  [HeroVerticalAlignment.Middle]: 'justify-center',
  [HeroVerticalAlignment.Bottom]: 'justify-end',
}

const HeroBlock: React.FC<Page['hero'] & { publicContext: PublicContextProps }> = ({
  richText,
  links,
  images,
  publicContext,
  highImpact,
  verticalAlignment,
  horizontalAlignment,
}) => {
  const horizontalClasses =
    horizontalAlignmentClasses[horizontalAlignment ?? HeroHorizontalAlignment.Left]
  const verticalClasses =
    verticalAlignmentClasses[verticalAlignment ?? HeroVerticalAlignment.Middle]
  return (
    <section className="container py-6" role="banner" aria-label="Hero section">
      <div
        className={cn(
          'relative min-h-[673px] w-full flex flex-col rounded-lg overflow-hidden p-6',
          verticalClasses,
          highImpact ? 'min-h-[673px]' : 'min-h-[546px]',
        )}
      >
        {/* Background Image/video */}
        {images && images.length > 0 && (
          <Media
            priority
            fill
            resource={images[0]}
            videoClassName="absolute inset-0 object-cover w-full h-full"
            imgClassName="absolute inset-0 object-cover w-full h-full"
            aria-hidden="true"
          />
        )}

        {/* Overlay for better text readability */}
        {!!images?.length && <div className="absolute inset-0 bg-black/20" aria-hidden="true" />}

        {/* Content */}
        <div
          className={cn(
            'relative z-10 flex flex-col gap-6 md:px-12 px-6 w-full',
            horizontalClasses,
          )}
        >
          <header className="space-y-6">
            {richText && (
              <RichText
                publicContext={publicContext}
                className="flex flex-col gap-6"
                content={richText}
                enableGutter={false}
                overrideStyle={{
                  h1: 'md:max-w-[600px] max-w-full md:font-body font-display lg:text-6xl md:text-6xl text-5xl text-white',
                  p: cn(
                    'text-white',
                    horizontalAlignment !== HeroHorizontalAlignment.Center ? 'max-w-[500px]' : '',
                  ),
                }}
              />
            )}
          </header>

          {Array.isArray(links) &&
            links.length > 0 &&
            links.map(({ link }, i) => <CMSLink publicContext={publicContext} key={i} {...link} />)}
        </div>
      </div>
    </section>
  )
}
export default HeroBlock
