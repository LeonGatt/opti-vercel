import type { Page } from '@/payload-types'
import { PublicContextProps } from '@/utilities/publicContextProps'
import HeroBlockComponent from '@/components/uiCustom/HeroCustom'

const HeroBlock: React.FC<Page['hero'] & { publicContext: PublicContextProps }> = ({
  richText,
  links,
  images,
  publicContext,
  highImpact,
  verticalAlignment,
  horizontalAlignment,
  darkMode = false,
}) => (
  <HeroBlockComponent
    richText={richText}
    links={links}
    images={images}
    publicContext={publicContext}
    highImpact={highImpact}
    verticalAlignment={verticalAlignment}
    horizontalAlignment={horizontalAlignment}
    darkMode={darkMode}
  />
)

export default HeroBlock
