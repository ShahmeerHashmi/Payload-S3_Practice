import ProductList from '../components/ProductList'

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductList />
    </div>
  )
}
