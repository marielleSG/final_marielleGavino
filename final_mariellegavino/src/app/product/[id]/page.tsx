"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react"
import Navbar from "@/components/navbar"
import type { Product } from "@/lib/types"
import { useCart } from "@/app/context/cart-context"

// Mock products database
const allProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    quantity: 8,
    image: "/wireless-headphones-premium-audio.jpg",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
    specification: "Bluetooth 5.0, 40mm drivers, 20Hz-20kHz frequency response, Active Noise Cancellation",
    rating: 5,
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 34.99,
    quantity: 25,
    image: "/organic-cotton-t-shirt.jpg",
    description: "Comfortable and eco-friendly organic cotton t-shirt for everyday wear",
    specification: "100% organic cotton, machine washable, available in multiple colors, Size: XS-3XL",
    rating: 4,
  },
  {
    id: "3",
    name: "4K Webcam",
    category: "Electronics",
    price: 199.99,
    quantity: 3,
    image: "/4k-webcam-professional.jpg",
    description: "Ultra HD webcam perfect for streaming and video conferencing",
    specification: "4K UHD 2160p, Auto-focus, Built-in microphone, USB 3.0, Works with all major platforms",
    rating: 4,
  },
]

interface PageParams {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetailPage({ params }: PageParams) {
  const { id } = use(params)
  const product = allProducts.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, items } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartCount={items.length} />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft size={20} />
            Back to Products
          </Link>
          <p className="text-foreground text-lg">Product not found</p>
        </main>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const isLowStock = product.quantity < 5

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={items.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium">
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full rounded-lg object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/modern-tech-product.png"
              }}
            />
            {isLowStock && (
              <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-semibold">
                Low Stock ({product.quantity} left)
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < product.rating ? "text-accent" : "text-muted"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{product.rating}/5 Rating</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Price</p>
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">Description</h2>
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Specification */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-foreground mb-2">Specification</h2>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="text-foreground leading-relaxed">{product.specification}</p>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Availability</p>
                <p className={`font-semibold ${isLowStock ? "text-destructive" : "text-accent"}`}>
                  {product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
                </p>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="flex items-end gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      min="1"
                      max={product.quantity}
                      className="w-16 text-center py-2 bg-input border border-border rounded-lg font-medium"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      disabled={quantity >= product.quantity}
                      className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
