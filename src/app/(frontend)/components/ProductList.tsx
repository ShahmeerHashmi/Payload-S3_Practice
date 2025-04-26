'use client'
import useSWR from 'swr'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: {
    url: string
  } | string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function ProductList() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`,
    fetcher
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">Failed to load products</div>

  const products = data?.docs || []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: Product) => (
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
