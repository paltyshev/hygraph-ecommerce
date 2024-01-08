import ProductCard from '@/components/product-card'

function ProductGrid({ products }) {
  return (
    <div className="lg:gap-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {products.map(ProductCard)}
    </div>
  )
}

export default ProductGrid
