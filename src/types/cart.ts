export interface CartItemOptions {
  costOfGoods: number
  id: number
  cart_id: number
  product_id: number
  group_id: number
  item_id: number
  price: number
  group_name: string
  group_abbreviation: string
  item_name: string
  item_abbreviation: string
  item_part_number: string
}

export interface CartItem {
  lineNumber: number
  id: number
  cart_id: number
  product_id: number
  quantity: number
  unit_price_with_options: number
  unit_price: number
  name: string
  part_number: string
  thumbnail: string
  url: string
  options: CartItemOptions[]
  total_price: number
  part_number_with_options: string
}

export interface CartData {
  id: string
  items: CartItem[]
  subtotal: number
  total_price: number
  total_item_count: number
  store_name: string
  session_id: string
  status: 'shopping' | 'checkout' | 'completed'
  coupon_discount: number
  coupon_hash: string
}
