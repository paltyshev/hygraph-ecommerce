import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'

import Button from '@/ui/button'
import { ChevronDownSmallIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import ProductReviews from '@/components/product-reviews'
import { useSettingsContext } from '@/context/settings'
import ProductContent from './product-content'

function ProductPageUI({ product }) {
  const { addItem } = useCart()
  const router = useRouter()
  const { activeCurrency } = useSettingsContext()
  const [variantQuantity, setVariantQuantity] = React.useState(1)
  const [activeVariantId, setActiveVariantId] = React.useState(
    router.query.variantId || (product.variants && product.variants[0]?.id)
  )

  React.useEffect(() => {
    const url = `/products/${product.slug}?variant=${activeVariantId}`

    router.replace(url, url, { shallow: true })
  }, [activeVariantId])

  const activeVariant = product.variants.find(
    (variant) => variant.id === activeVariantId
  )
  const updateQuantity = (event) =>
    setVariantQuantity(Number(event.target.value))
  const updateVariant = (event) => setActiveVariantId(event.target.value)

  const [primaryImage] = product.images

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...product.localizations.find(
            (localization) => localization.locale === locale
          )
        }
      }),
      {}
    )

    addItem(
      {
        id: activeVariantId,
        productId: product.id,
        image: product.images[0],
        price: product.price,
        ...itemMetadata
      },
      variantQuantity
    )
  }

  return (
    <div>
      <div className="lg:flex">
        <div className="mb-8 md:mb-0 lg:w-1/2">
          <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
            <Image
              src={primaryImage.url}
              height={primaryImage.height}
              width={primaryImage.width}
              alt={product.name}
              title={product.name}
            />
          </div>
        </div>
        <div className="md:py-3 lg:w-1/2">
          <h1 className="font-bold text-2xl md:text-6xl mb-3 text-primary leading-tight">
            {product.name}
          </h1>
          <div className="mb-6">
            <p className="font-semibold text-2xl leading-8 text-gray-900">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: product.price
              })}
            </p>
          </div>
          <div className="mb-6">
            <p className="text-gray-500 flex-none">{product.description}</p>
          </div>
          <div className=" -mx-3">
            {product.variants.length > 1 ? (
              <div className="md:w-3/4 px-3 mb-6">
                <label
                  className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                  htmlFor="style"
                >
                  Style
                </label>
                <div className="relative">
                  <select
                    id="style"
                    name="style"
                    value={activeVariantId}
                    className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                    onChange={updateVariant}
                  >
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <ChevronDownSmallIcon
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="quantity"
              >
                Количество
              </label>

              <div className="flex space-x-2">
                <div className="flex-none relative">
                  <select
                    id="quantity"
                    name="quantity"
                    value={variantQuantity}
                    className="h-12 block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                    onChange={updateQuantity}
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      const value = Number(i + 1)

                      return (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      )
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                    <ChevronDownSmallIcon
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="flex-auto">
                  <Button onClick={addToCart}>В корзину <svg
                    className="ml-2"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5 2C10.2909 2 8.5 3.79086 8.5 6V7H7.5C5.84315 7 4.5 8.34315 4.5 10V19C4.5 20.6569 5.84315 22 7.5 22H17.5C19.1569 22 20.5 20.6569 20.5 19V10C20.5 8.34315 19.1569 7 17.5 7H16.5V6C16.5 3.79086 14.7091 2 12.5 2ZM14.5 9V11H16.5V9H17.5C18.0523 9 18.5 9.44772 18.5 10V19C18.5 19.5523 18.0523 20 17.5 20H7.5C6.94772 20 6.5 19.5523 6.5 19V10C6.5 9.44772 6.94772 9 7.5 9H8.5V11H10.5V9H14.5ZM14.5 7V6C14.5 4.89543 13.6046 4 12.5 4C11.3954 4 10.5 4.89543 10.5 6V7H14.5Z"
                      fill="#212121"
                    />
                  </svg></Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {product.content && (
        <ProductContent product={product} />
      )}
      <div className="my-8">
        <ProductReviews product={product} />
      </div>
    </div>
  )
}

export default ProductPageUI
