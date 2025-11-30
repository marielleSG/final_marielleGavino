"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Navbar from "@/components/navbar"
import ProductCard from "@/components/product-card"
import AddProductModal from "@/components/add-product-modal"
import type { Product } from "@/lib/types"
import { useCart } from "./context/cart-context"

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    quantity: 8,
    image: "/wireless-headphones-premium-audio.jpg",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
    specification: "Bluetooth 5.0, 40mm drivers, 20Hz-20kHz frequency response",
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
    specification: "100% organic cotton, machine washable, available in multiple colors",
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
    specification: "4K UHD 2160p, Auto-focus, Built-in microphone, USB 3.0",
    rating: 4,
  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const { items } = useCart()

  const categories = ["All", ...new Set(products.map((p) => p.category))]
  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={items.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-2">
              Discover Quality Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our curated collection of premium products across multiple categories
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </main>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} onAddProduct={handleAddProduct} />}
    </div>
  )
}
