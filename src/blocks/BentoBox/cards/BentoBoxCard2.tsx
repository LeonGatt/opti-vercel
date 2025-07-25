import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { BentoBoxBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { hasRichTextContent } from '@/utilities/richtext'
import { ChevronRight } from 'lucide-react'

export const BentoBoxCard2: React.FC<{
  element: NonNullable<BentoBoxBlock['elements']>[0]
  publicContext: PublicContextProps
  fullSizeImage: boolean | null
}> = ({ element, publicContext }) => {
  return (
    <CMSLink
      publicContext={publicContext}
      {...element.link}
      label=""
      className="group relative flex h-[430px] flex-col justify-end overflow-hidden rounded-lg md:col-span-2"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/0 to-black/65" />
      {element.image && (
        <Media
          resource={element?.image}
          className="absolute size-full"
          fill
          imgClassName="size-full object-cover"
        />
      )}
      <div className="z-20 w-full p-6">
        {element.richText && hasRichTextContent(element.richText) && (
          <div className="transition duration-400 group-hover:translate-y-[-40px]">
            <RichText
              publicContext={publicContext}
              content={element.richText}
              withWrapper={false}
              overrideStyle={{
                h2: 'text-2xl font-heading font-bold text-white pb-1',
                h3: 'text-2xl font-heading font-bold text-white pb-1',
                h4: 'text-2xl font-heading font-bold text-white pb-1',
                p: 'text-gray-400',
              }}
            />
          </div>
        )}
        <Button
          className="absolute bottom-6 left-6 p-0 opacity-0 transition duration-400 group-hover:opacity-100"
          aria-hidden="true"
          variant="link"
        >
          {element.link?.label} <ChevronRight className="size-4" />
        </Button>
      </div>
    </CMSLink>
  )
}
