'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function createProduct(formData: FormData) {
  try {
    const payload = await getPayload({ config })
    
    // Check if we're using an existing media ID or a new image URL
    const imageInput = formData.get('image') as string
    let imageId: string

    if (imageInput.startsWith('http')) {
      // If it's a URL, create new media document
      const mediaResponse = await payload.create({
        collection: 'media',
        data: {
          alt: formData.get('name') as string,
          url: imageInput
        }
      })
      imageId = mediaResponse.id
    } else {
      // Otherwise assume it's an existing media ID
      imageId = imageInput
    }

    return await payload.create({
      collection: 'products',
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        image: imageId
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}