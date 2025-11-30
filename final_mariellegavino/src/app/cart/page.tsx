"use client"

import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"
import Navbar from "@/components/navbar"
import { useCart } from "@/app/context/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart()

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={items.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium">
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-12">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border p-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </h2>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-6">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-24 h-24 rounded-lg object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?key=cart"
                          }}
                        />

                        <div className="flex-1">
                          <div className="mb-3">
                            <p className="text-xs font-medium text-primary uppercase tracking-wide">
                              {item.product.category}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">{item.product.name}</h3>
                          </div>

                          <p className="text-2xl font-bold text-primary mb-4">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>

                          <div className="flex items-center gap-3 mb-4">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="flex items-center justify-center w-8 h-8 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, Math.max(1, Number.parseInt(e.target.value) || 1))
                              }
                              min="1"
                              className="w-12 text-center py-1 bg-input border border-border rounded text-sm font-medium"
                            />
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex items-center justify-center w-8 h-8 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 text-destructive hover:text-destructive/80 font-medium text-sm"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-2">Unit Price</p>
                          <p className="font-semibold text-foreground">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 border-b border-border pb-6">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-foreground mb-6">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity mb-3">
                  Proceed to Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border border-border rounded-lg py-3 text-foreground font-medium hover:bg-secondary transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
