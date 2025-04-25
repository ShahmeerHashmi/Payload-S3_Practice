import { getPayload } from 'payload'
import config from '@/payload.config'

export const GET = async () => {
  const payload = await getPayload({ config })
  
  const products = await payload.find({
    collection: 'products',
    depth: 1
  })

  return Response.json(products)
}