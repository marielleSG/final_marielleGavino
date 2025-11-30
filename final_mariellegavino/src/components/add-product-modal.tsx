"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import type { Product } from "@/lib/types"

interface AddProductModalProps {
  onClose: () => void
  onAddProduct: (product: Product) => void
}

export default function AddProductModal({ onClose, onAddProduct }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: 5,
    price: 0,
    quantity: 10,
    image: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" || name === "rating" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category.trim()) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.specification.trim()) newErrors.specification = "Specification is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.quantity < 0) newErrors.quantity = "Quantity cannot be negative"
    if (!formData.image.trim()) newErrors.image = "Image URL is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      ...formData,
      rating: Math.min(5, Math.max(1, formData.rating)),
    }

    onAddProduct(newProduct)
    setFormData({
      name: "",
      category: "",
      description: "",
      specification: "",
      rating: 5,
      price: 0,
      quantity: 10,
      image: "",
    })
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-border bg-card">
          <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-destructive" : "border-border"
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.category ? "border-destructive" : "border-border"
                }`}
                placeholder="e.g., Electronics, Clothing"
              />
              {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.price ? "border-destructive" : "border-border"
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.quantity ? "border-destructive" : "border-border"
                }`}
                placeholder="10"
              />
              {errors.quantity && <p className="text-xs text-destructive mt-1">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Rating (1-5) *</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.5"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.image ? "border-destructive" : "border-border"
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-xs text-destructive mt-1">{errors.image}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.description ? "border-destructive" : "border-border"
              }`}
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Specification *</label>
            <textarea
              name="specification"
              value={formData.specification}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.specification ? "border-destructive" : "border-border"
              }`}
              placeholder="Enter product specifications"
            />
            {errors.specification && <p className="text-xs text-destructive mt-1">{errors.specification}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
