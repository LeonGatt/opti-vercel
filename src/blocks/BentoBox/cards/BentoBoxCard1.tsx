import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { BentoBoxBlock } from '@/payload-types'
import { cn } from '@/utilities'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { hasRichTextContent } from '@/utilities/richtext'

export const BentoBoxCard1: React.FC<{
  element: NonNullable<BentoBoxBlock['elements']>[0]
  publicContext: PublicContextProps
  fullSizeImage: boolean | null
}> = ({ element, publicContext, fullSizeImage = false }) => {
  return (
    <CMSLink
      publicContext={publicContext}
      {...element.link}
      className="flex flex-col justify-between rounded-lg bg-accent md:col-span-2 overflow-hidden h-full"
    >
      {element.image && (
        <Media
          resource={element?.image}
          className={cn('w-full', !fullSizeImage ? 'px-6 pt-6 h-[260px]' : 'h-[290px]')}
          imgClassName={cn(' size-full max-h-72 object-cover', !fullSizeImage ? 'rounded-lg' : '')}
        />
      )}

      {element.richText && hasRichTextContent(element.richText) && (
        <RichText
          publicContext={publicContext}
          content={element.richText}
          withWrapper={false}
          className="w-full p-6"
          overrideStyle={{
            h2: 'text-2xl font-heading font-bold',
            h3: 'text-2xl font-heading font-bold',
            h4: 'text-2xl font-heading font-bold',
          }}
        />
      )}
    </CMSLink>
  )
}
