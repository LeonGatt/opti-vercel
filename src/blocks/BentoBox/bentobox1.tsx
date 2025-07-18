import RichText from '@/components/RichText'
import { BentoLayout } from '@/components/uiCustom/Layout'
import { BentoBoxBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'

import { BentoBoxCard1 } from './cards/BentoBoxCard1'
import { BentoBoxCard2 } from './cards/BentoBoxCard2'
import { CMSLink } from '@/components/Link'

const BentoBox1: React.FC<BentoBoxBlock & { publicContext: PublicContextProps }> = ({
  richText,
  publicContext,
  elements,
  fullSizeImage = false,
  designVersion,
  links,
}) => {
  const Card = designVersion === 'BENTOBOX1' ? BentoBoxCard1 : BentoBoxCard2

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pb-14">
          {richText && (
            <RichText
              publicContext={publicContext}
              content={richText}
              withWrapper={true}
              overrideStyle={{
                h2: 'text-center text-5xl font-heading font-bold lg:text-4xl pb-5',
                h3: 'text-center text-5xl font-heading font-bold lg:text-4xl pb-5',
                h4: 'text-center text-5xl font-heading font-bold lg:text-4xl pb-5',
                p: 'text-center text-muted-foreground lg:text-lg',
              }}
            />
          )}

          {links?.map((link) => (
            <CMSLink
              publicContext={publicContext}
              key={link.id}
              {...link.link}
              className="flex items-center gap-2 text-lg font-medium"
              iconClassName="h-auto w-4"
            />
          ))}
        </div>
        <BentoLayout>
          {elements &&
            elements.map((element) => (
              <Card
                key={element.id}
                element={element}
                publicContext={publicContext}
                fullSizeImage={fullSizeImage}
              />
            ))}
        </BentoLayout>
      </div>
    </section>
  )
}

export default BentoBox1
