"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export default function MediaGallery() {
    
  const [loading, setLoading] = useState(true)
  const [mediaData, setMediaData] = useState<any[]>([])

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()
        setMediaData(data.docs)
      } catch (error) {
        console.error('Error fetching media:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Media Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaData.map((item) => (
          <div key={item.id} className="rounded-lg overflow-hidden shadow-lg">
            {item.url ? (
              <Image 
                src={item.url}
                alt={item.alt ? String(item.alt) : 'Media image'}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span>No image available</span>
              </div>
            )}
            <div className="px-6 py-4">
             
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

