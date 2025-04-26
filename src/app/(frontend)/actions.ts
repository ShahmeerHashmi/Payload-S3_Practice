'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function createProduct(formData: FormData) {
  try {
    const payload = await getPayload({ config })

    const imageId = formData.get('image') as string

    return await payload.create({
      collection: 'products',
      data: {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        image: imageId // directly link existing media ID
      }
    })
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}