import * as React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import dynamic from 'next/dynamic';

import Button from '@/ui/button';
import { ChevronDownSmallIcon } from '@/icons';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import { useSettingsContext } from '@/context/settings';
import ProductContent from './product-content';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import QuantitySelector from './quantity-selector';

const ProductReviews = dynamic(() => import('@/components/product-reviews'), {
  loading: () => <p>Загрузка...</p>,
});

function ProductPageUI({ product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const { activeCurrency } = useSettingsContext();
  const [activeVariantId, setActiveVariantId] = React.useState(
    router.query.variantId || (product.variants && product.variants[0]?.id)
  );
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  React.useEffect(() => {
    const url = `/products/${product.slug}?variant=${activeVariantId}`;

    router.replace(url, url, { shallow: true });
  }, [activeVariantId]);

  const activeVariant = product.variants.find(
    (variant) => variant.id === activeVariantId
  );
  const updateVariant = (event) => setActiveVariantId(event.target.value);

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...product.localizations.find(
            (localization) => localization.locale === locale
          ),
        },
      }),
      {}
    );

    addItem(
      {
        id: activeVariantId,
        productId: product.id,
        image: product.images[0],
        price: product.price,
        ...itemMetadata,
      },
      selectedQuantity
    );

    router.push('/cart');
  };

  const images = product.images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
    originalHeight: image.height,
    originalWidth: image.width,
    originalTitle: product.name,
    originalAlt: image.altText,
  }));

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

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
              items={[
                {
                  original: images[0].original,
                  originalAlt: images[0].originalAlt,
                  originalWidth: images[0].originalWidth,
                  originalHeight: images[0].originalHeight,
                  originalTitle: images[0].originalTitle,
                  sizes: '100vw',
                  lazyLoad: false, // отключаем ленивую загрузку только для первой картинки
                },
                ...images.slice(1), // остальные картинки
              ]}
              lazyLoad={true}
              renderItem={(item) => (
                <Image
                  src={item.original}
                  alt={item.originalAlt}
                  width={item.originalWidth}
                  height={item.originalHeight}
                  title={item.originalTitle}
                  sizes="100vw"
                  priority
                />
              )}
              showThumbnails={false}
              showNav={false}
              useBrowserFullscreen={false}
              showPlayButton={false}
              showBullets={false}
            />
          </div>
        </div>
        <div className="md:py-3 lg:w-1/2">
          <h1 className="font-bold text-xl md:text-6xl mb-3 text-primary leading-tight">
            {product.name}
          </h1>
          <div className="mb-6">
            <p className="font-semibold text-xl leading-8">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: product.price,
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
                <QuantitySelector
                  onChange={handleQuantityChange}
                  defaultValue={1}
                />
                <div className="flex-auto">
                  <Button onClick={addToCart}>
                    <svg
                      className="mr-1"
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
                    </svg>
                    В корзину
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {product.content && <ProductContent product={product} />}
      <div className="my-8">
        <ProductReviews product={product} />
      </div>
      <div className="mb-14 md:hidden px-3 z-10 fixed inset-x-0 bottom-0 pt-2 bg-white">
        <Button
          onClick={addToCart}
          className="w-full h-12 bg-yellow-400 rounded-lg font-medium items-center justify-center text-gray-900 text-sm"
        >
          В корзину
          <br />
          <span className="text-xs">Доставим с 26 июня</span>
        </Button>
      </div>
    </div>
  );
}

export default ProductPageUI;
