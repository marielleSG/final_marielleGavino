"use client"

import Link from "next/link"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/types"
import { useCart } from "@/app/context/cart-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const isLowStock = product.quantity < 5

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-secondary overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/modern-tech-product.png"
          }}
        />
        {isLowStock && (
          <div className="absolute top-2 right-2 bg-destructive text-white-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</p>
          <h3 className="font-semibold text-foreground text-lg truncate">{product.name}</h3>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < product.rating ? "text-accent" : "text-muted"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.rating}/5)</span>
          </div>
          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <Link
          href={`/product/${product.id}`}
          className="block w-full text-center py-2 mb-3 text-sm font-medium text-primary hover:text-primary/80 border border-primary rounded-lg transition-colors"
        >
          View Details
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="flex-1 flex items-center justify-center py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors disabled:opacity-50"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            min="1"
            max={product.quantity}
            className="w-12 text-center py-2 bg-input border border-border rounded-lg text-sm font-medium"
          />
          <button
            onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
            disabled={quantity >= product.quantity}
            className="flex-1 flex items-center justify-center py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
