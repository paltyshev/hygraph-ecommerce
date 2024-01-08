import Link from 'next/link'
import Image from 'next/image'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'

function ProductCard({ id, images, name, price, slug, categories }) {
  const { activeCurrency } = useSettingsContext()

  const [primaryImage] = images
  const [primaryCategory] = categories

  return (
    <article key={id}>
      <Link href={`/products/${slug}`} className="group no-underline w-full h-full flex">
        <div className=" rounded-lg cursor-pointer w-full overflow-hidden relative px-4 py-6 md:px-6">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              height={primaryImage.height}
              width={primaryImage.width}
              alt={name}
              title={name}
            />
          ) : null}

          <div className="pt-3 md:pt-6">
          <p className="text-gray-800 font-semibold text-xs font-thin uppercase group-hover:text-amber-700 mb-1 line-clamp-2">
              {primaryCategory.name}
            </p>
            <p className="text-gray-800 font-semibold text-base group-hover:text-amber-700 mb-1 line-clamp-2">
              {name}
            </p>
            <p className="text-gray-600 text-base">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: price
              })}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
