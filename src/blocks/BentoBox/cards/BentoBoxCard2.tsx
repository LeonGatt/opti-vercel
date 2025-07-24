import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { BentoBoxBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import { hasRichTextContent } from '@/utilities/richtext'

export const BentoBoxCard2: React.FC<{
  element: NonNullable<BentoBoxBlock['elements']>[0]
  publicContext: PublicContextProps
  fullSizeImage: boolean | null
}> = ({ element, publicContext }) => {
  return (
    <CMSLink
      publicContext={publicContext}
      {...element.link}
      className="flex flex-col justify-end rounded-lg md:col-span-2 overflow-hidden h-[430px] relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/65 z-10" />
      {element.image && (
        <Media
          resource={element?.image}
          className="size-full absolute"
          fill
          imgClassName="size-full object-cover"
        />
      )}
      <div className="w-full p-6 z-20">
        {element.richText && hasRichTextContent(element.richText) && (
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
        )}
        {(element?.links?.length ?? 0) > 0 && (
          <div className="pt-3">
            {element.links?.map((link) => (
              <CMSLink
                publicContext={publicContext}
                key={link.id}
                {...link.link}
                className="gap-2 text-lg font-medium"
                iconClassName="h-auto w-4"
              />
            ))}
          </div>
        )}
      </div>
    </CMSLink>
  )
}
