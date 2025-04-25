
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'
import MediaGallery from './components/MediaGallery'
import ProductList from './components/ProductList'

import config from '@/payload.config'
import './styles.css'
import AddProductForm from './components/AddProductForm'


export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

  

      <div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
       
        <AddProductForm/>
      </div>
    </div>
    </div>
  )
}
