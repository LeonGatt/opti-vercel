import type { HeroBlock } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import HeroBlockComponent from '@/components/uiCustom/HeroCustom'
import { Spacings } from '@/fields/spacing'

const HeroBlock: React.FC<
  HeroBlock & { publicContext: PublicContextProps } & { spacings: Spacings }
> = ({
  richText,
  links,
  images,
  publicContext,
  highImpact,
  verticalAlignment,
  horizontalAlignment,
  darkMode = false,
  spacings,
}) => {
  return (
    <HeroBlockComponent
      richText={richText}
      links={links}
      images={images}
      publicContext={publicContext}
      highImpact={highImpact}
      verticalAlignment={verticalAlignment}
      horizontalAlignment={horizontalAlignment}
      darkMode={darkMode}
      spacings={spacings}
    />
  )
}

export default HeroBlock
