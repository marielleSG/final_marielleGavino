export interface Product {
  id: string
  image: string
  name: string
  category: string
  description: string
  specification: string
  rating: number
  price: number
  quantity: number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}
