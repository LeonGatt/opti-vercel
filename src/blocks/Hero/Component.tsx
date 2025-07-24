import Hero1Custom from './Hero1-custom'
import { Page } from '@/payload-types'
import { allHeroDesignVersions } from './config'

// Extract just the value property from the design version objects
type HeroDesignVersionValue = (typeof allHeroDesignVersions)[number]['value']

type Hero<T extends string = string> = Required<Record<HeroDesignVersionValue, React.FC<any>>> &
  Record<T, React.FC<any>>

const heroes: Hero = {
  'HERO1-custom': Hero1Custom,
}

export const HeroBlock: React.FC<Page['layout'][0]> = (props) => {
  if (props.blockType !== 'hero') return null

  const { designVersion } = props || {}

  if (!designVersion) return null

  const HeroToRender = heroes[designVersion]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}

export default HeroBlock
