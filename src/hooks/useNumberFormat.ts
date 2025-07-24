import isNumber from 'lodash/isNumber'
// import { useFormatter } from 'next-intl'

export const usePriceFormat = () => {
  // const format = useFormatter()
  // const formatPrice = (price?: number): string => {
  //   const safePrice = isNumber(price) ? price : 0

  //   return format.number(safePrice, {
  //     style: 'currency',
  //     currency: 'USD',
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   })
  // }

  const formatPrice = (price?: number): string => {
    const safePrice = isNumber(price) ? price : 0
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(safePrice)
  }

  return { formatPrice }
}
