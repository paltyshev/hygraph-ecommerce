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
        <div className="group rounded-lg cursor-pointer w-full overflow-hidden relative px-4 py-6 md:px-6 hover:shadow-lg transition duration-200 dark:lg:bg-surface-dark-200">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              height={300}
              width={300}
              alt={name}
              title={name}
              className="object-contain dark:bg-surface-dark-200 rounded-lg"
            />
          ) : null}

          <div className="pt-3 md:pt-6">
          <p className="text-neutral-500 dark:text-slate-300 text-xs font-thin uppercase mb-1">
              {primaryCategory.name}
            </p>
            <h2 className="text-neutral-500 dark:text-white font-semibold text-base group-hover:text-primary-200 mb-1 line-clamp-2 dark:group-hover:text-primary-dark-500 mb-1">
              {name}
            </h2>
            <p className="text-gray-600 dark:text-white text-base">
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
