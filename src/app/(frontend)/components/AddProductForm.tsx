'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct } from '../actions'
import MediaGallery from './MediaGallery'

export default function AddProductForm() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('image', selectedImage) // Use selected image instead of input
    try {
      await createProduct(formData)
      router.refresh()
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Product Name</label>
        <input 
          type="text" 
          name="name" 
          required 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Description</label>
        <textarea 
          name="description" 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Price</label>
        <input 
          type="number" 
          name="price" 
          step="0.01" 
          required 
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Selected Image</label>
        {selectedImage && (
          <img 
            src={selectedImage} 
            alt="Selected product" 
            className="w-32 h-32 object-cover mb-2"
          />
        )}
        <MediaGallery onSelect={handleImageSelect} />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
    </form>
  )
}