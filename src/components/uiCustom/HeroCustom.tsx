import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities'
import { PublicContextProps } from '@/utilities/publicContextProps'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export enum HeroHorizontalAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export enum HeroVerticalAlignment {
  top = 'top',
  middle = 'middle',
  bottom = 'bottom',
}

export interface HeroProps {
  richText: Page['hero']['richText'] | null
  links?: Page['hero']['links'] | null
  images?: Page['hero']['images']
  publicContext: PublicContextProps
  highImpact?: boolean | null
  verticalAlignment?: keyof typeof HeroVerticalAlignment | null
  horizontalAlignment?: keyof typeof HeroHorizontalAlignment | null
  darkMode?: boolean | null
}

const horizontalAlignmentClasses = {
  [HeroHorizontalAlignment.left]: 'text-left items-start',
  [HeroHorizontalAlignment.center]: 'text-center items-center',
  [HeroHorizontalAlignment.right]: 'text-right items-end',
}

const verticalAlignmentClasses = {
  [HeroVerticalAlignment.top]: 'justify-start',
  [HeroVerticalAlignment.middle]: 'justify-center',
  [HeroVerticalAlignment.bottom]: 'justify-end',
}

const HeroBlockComponent: React.FC<HeroProps & { publicContext: PublicContextProps }> = ({
  richText,
  links,
  images,
  publicContext,
  highImpact,
  verticalAlignment,
  horizontalAlignment,
  darkMode = false,
}) => {
  const horizontalClasses =
    horizontalAlignmentClasses[horizontalAlignment ?? HeroHorizontalAlignment.left]
  const verticalClasses =
    verticalAlignmentClasses[verticalAlignment ?? HeroVerticalAlignment.middle]

  const headingClasses = highImpact
    ? 'font-heading font-bold text-5xl md:text-6xl lg:text-5xl text-foreground'
    : 'font-heading font-bold text-5xl text-foreground'
  return (
    <section
      className="container py-6"
      data-theme={darkMode ? 'dark' : ''}
      role="banner"
      aria-label="Hero section"
    >
      <div
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-lg p-6',
          verticalClasses,
          highImpact ? 'min-h-[673px]' : 'min-h-[350px]',
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
            'relative z-10 flex w-full flex-col gap-6',
            highImpact && 'px-6 md:px-12',
            horizontalClasses,
          )}
        >
          <header
            className={cn(
              'text-text-color max-w-full space-y-6',
              highImpact ? 'md:max-w-[540px]' : 'md:max-w-[700px]',
            )}
          >
            {richText && (
              <RichText
                publicContext={publicContext}
                className="flex flex-col gap-6"
                content={richText}
                enableGutter={false}
                overrideStyle={{
                  h1: headingClasses,
                  h2: headingClasses,
                  h3: headingClasses,
                  h4: headingClasses,
                  p: cn(
                    'text-foreground',
                    horizontalAlignment !== HeroHorizontalAlignment.center ? 'max-w-[500px]' : '',
                  ),
                }}
              />
            )}
          </header>

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex gap-4">
              {links.map(({ link }, i) => (
                <CMSLink publicContext={publicContext} key={i} {...link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
export default HeroBlockComponent
