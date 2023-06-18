import * as React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useCart } from 'react-use-cart'
import dynamic from 'next/dynamic'

import Button from '@/ui/button'
import { ChevronDownSmallIcon } from '@/icons'
import { formatCurrencyValue } from '@/utils/format-currency-value'
import { useSettingsContext } from '@/context/settings'
import ProductContent from './product-content'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import QuantitySelector from './quantity-selector'
import { SfButton, SfIconAddShoppingCart } from '@storefront-ui/react';

const ProductReviews = dynamic(() => import('@/components/product-reviews'), {
  loading: () => <p>Загрузка...</p>
})

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

    router.push('/cart')
  }

  const images = product.images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
    originalHeight: image.height,
    originalWidth: image.width,
    originalTitle: product.name,
    originalAlt: product.name,
  }))

  return (
    <div>
      <div className="lg:flex lg:space-x-4">
        <div className="mb-8 md:mb-0 lg:w-1/2">
          <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
            {/* <Image
              src={product.images[1].url}
              height={product.images[1].height}
              width={product.images[1].width}
              alt={product.name}
              title={product.name}
            /> */}
            <style jsx global>{`
              .image-gallery.fullscreen-modal {background: #fff}
              .image-gallery-content.fullscreen{background:#fff}
            `}</style>
            <ImageGallery
              items={images}
              renderItem={(item) => (
                <Image
                  src={item.original}
                  alt={item.originalAlt}
                  width={item.originalWidth}
                  height={item.originalHeight}
                  title={item.originalTitle}
                  sizes='100vw'
                />
              )}
              showThumbnails={false}
              showNav={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
              showBullets={true}
            />
          </div>
        </div>
        <div className="md:py-3 lg:w-1/2">
          <h1 className="font-bold text-xl md:text-6xl mb-3 text-primary leading-tight">
            {product.name}
          </h1>
          <div className="mb-6">
            <p className="font-semibold text-xl leading-8 text-yellow-500">
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
                <QuantitySelector onChange={updateQuantity} />
                <div className="flex-auto">
                  <SfButton onClick={addToCart} className="w-full" slotSuffix={<SfIconAddShoppingCart />}>В корзину</SfButton>
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
