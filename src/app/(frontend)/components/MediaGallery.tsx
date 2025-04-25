"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface MediaGalleryProps {
  onSelect?: (imageUrl: string) => void
}

interface MediaItem {
  id: string
  url: string
  alt?: string
  width?: number
  height?: number
}

export default function MediaGallery({ onSelect }: MediaGalleryProps) {
  const [loading, setLoading] = useState(true)
  const [mediaData, setMediaData] = useState<MediaItem[]>([])

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
    <div className="grid grid-cols-4 gap-4">
      {mediaData.map((image) => (
        <div 
          key={image.id} 
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelect?.(image.url)}
        >
          <Image
            src={image.url}
            alt={image.alt || 'Media item'}
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}

