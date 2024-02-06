import Link from 'next/link'
import Image from 'next/image'
import {Button} from '@nextui-org/react'

import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'

function ProductCard({ id, images, name, price, slug, categories }) {
  const { activeCurrency } = useSettingsContext()

  const [primaryImage] = images
  const [primaryCategory] = categories

  return (
    <article key={id}>
      <Link href={`/products/${slug}`} className="group no-underline w-full h-full flex">
        <div className="group rounded-lg cursor-pointer w-full overflow-hidden relative px-4 py-6 md:px-6 hover:shadow-lg transition duration-200">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              height={300}
              width={300}
              alt={name}
              title={name}
              className="object-contain"
            />
          ) : null}

          <div className="pt-3 md:pt-6">
          <p className="font-semibold text-xs font-thin uppercase mb-1">
              {primaryCategory.name}
            </p>
            <h2 className="font-semibold text-base mb-1 line-clamp-2">
              {name}
            </h2>
            <p className="text-base">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: price
              })}
            </p>
            <div className="mt-4 h-8 flex items-center justify-center">
              <Button color='primary' className="hidden group-hover:block w-full font-semibold px-4 py-2 rounded-lg">
                В корзину
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
