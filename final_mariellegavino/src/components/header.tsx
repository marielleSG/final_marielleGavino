"use client"

import type React from "react"
import Link from "next/link"
import { CartDropdown } from "./cart-dropdown"
import { AddProductModal } from "./add-product-modal"

export const Header: React.FC = () => {
  return (
    <header className="border-b bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          ShopHub
        </Link>
        <div className="flex items-center gap-4">
          <AddProductModal />
          <CartDropdown />
        </div>
      </div>
    </header>
  )
}
