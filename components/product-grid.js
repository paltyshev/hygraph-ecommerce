import ProductCard from '@/components/product-card';

function ProductGrid({ products }) {
  return (
    <div className="sm:gap-8 grid grid-cols-2 lg:grid-cols-3">
      {products.map(ProductCard)}
    </div>
  );
}

export default ProductGrid;
