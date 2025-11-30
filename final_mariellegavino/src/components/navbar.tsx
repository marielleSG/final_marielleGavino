"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import CartDropdown from "./cart-dropdown"

interface NavbarProps {
  cartCount: number
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [showCartDropdown, setShowCartDropdown] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ProductHub
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ShoppingCart size={20} className="text-primary" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {showCartDropdown && <CartDropdown onClose={() => setShowCartDropdown(false)} />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
