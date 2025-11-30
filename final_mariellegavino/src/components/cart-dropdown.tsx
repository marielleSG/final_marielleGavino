"use client"

import Link from "next/link"
import { useCart } from "@/app/context/cart-context"
import { X } from "lucide-react"

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { items, removeFromCart } = useCart()

  return (
    <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground text-lg">Cart Preview</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm py-4">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive/80 text-xs font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <Link
            href="/cart"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg text-center text-sm font-semibold hover:opacity-90 transition-opacity"
            onClick={onClose}
          >
            View All Cart
          </Link>
        </>
      )}
    </div>
  )
}
