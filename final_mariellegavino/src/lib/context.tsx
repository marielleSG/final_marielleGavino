"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode, useCallback } from "react"
import type { Product, CartItem } from "./types"
import { DEFAULT_PRODUCTS } from "./constants"

interface ProductContextType {
  products: Product[]
  cart: CartItem[]
  addProduct: (product: Product) => void
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  getCartTotal: () => number
  getCartSubtotal: (productId: string) => number
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [cart, setCart] = useState<CartItem[]>([])

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }])
  }, [])

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + quantity } : item,
        )
      }
      return [...prev, { ...product, cartQuantity: quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, cartQuantity: quantity } : item)))
      }
    },
    [removeFromCart],
  )

  const getCartSubtotal = useCallback(
    (productId: string): number => {
      const item = cart.find((item) => item.id === productId)
      return item ? item.price * item.cartQuantity : 0
    },
    [cart],
  )

  const getCartTotal = useCallback((): number => {
    return cart.reduce((total, item) => total + item.price * item.cartQuantity, 0)
  }, [cart])

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        getCartTotal,
        getCartSubtotal,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within ProductProvider")
  }
  return context
}
