import { BentoBoxDesignVersion } from './config'
import BentoBox1 from './bentobox1'

// Extract the value property from BentoBoxDesignVersion for use as keys
type BentoBoxVersionValue = BentoBoxDesignVersion['value']

type BentoBox<T extends string = string> = Required<Record<BentoBoxVersionValue, React.FC<any>>> &
  Record<T, React.FC<any>>

const bentoBox: BentoBox = {
  BENTOBOX1: BentoBox1,
  BENTOBOX2: BentoBox1,
}

export const BentoBoxBlock: React.FC<any> = (props) => {
  const { designVersion } = props || {}
  if (props.blockType !== 'bentobox') return null
  if (!designVersion) return null

  const BentoBoxToRender = bentoBox[designVersion as BentoBoxVersionValue]

  if (!BentoBoxToRender) return null

  return <BentoBoxToRender {...props} />
}

export default BentoBoxBlock
