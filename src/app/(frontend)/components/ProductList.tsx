import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'

export default async function ProductList() {
  const payload = await getPayload({ config: await config })

  const { docs: products } = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 10,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          {product.image && typeof product.image !== 'string' && (
            <div className="relative aspect-square mb-4">
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  )
}
