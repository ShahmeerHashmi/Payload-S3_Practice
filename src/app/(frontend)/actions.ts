'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function createProduct(formData: FormData) {
  try {
    const payload = await getPayload({ config })
    
    // First upload the image if needed (or get existing media doc)
    const mediaResponse = await payload.create({
      collection: 'media',
      data: {
        alt: formData.get('name') as string,
        url: formData.get('image') as string
      }
    })

    return await payload.create({
      collection: 'products',
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        image: mediaResponse.id // Use the media document ID
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}