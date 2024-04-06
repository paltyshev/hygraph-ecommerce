import * as React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import dynamic from 'next/dynamic';

import Button from '@/ui/button';
import { ChevronDownSmallIcon, ChevronRight } from '@/icons';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import { useSettingsContext } from '@/context/settings';
import ProductContent from './product-content';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import QuantitySelector from './quantity-selector';
import { Pin } from '@/icons';
import Link from 'next/link';

const ProductReviews = dynamic(() => import('@/components/product-reviews'), {
  loading: () => <p>Загрузка...</p>,
});

const colorMap = {
  BLACK: 'bg-black',
  DEFAULT: 'bg-white',
  PINK: 'bg-pink-500',
  PURPLE: 'bg-purple-500',
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
};

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
  const updateVariant = (id) => setActiveVariantId(id);

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
        color: activeVariant.name,
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

  function dateFormat(date, days) {
    date.setDate(date.getDate() + days);
    let day = date.getDate();
    let month = date.getMonth();
    let fmonth = '';
    switch (month) {
      case 0:
        fmonth = 'января';
        break;
      case 1:
        fmonth = 'февраля';
        break;
      case 2:
        fmonth = 'марта';
        break;
      case 3:
        fmonth = 'апреля';
        break;
      case 4:
        fmonth = 'мае';
        break;
      case 5:
        fmonth = 'июня';
        break;
      case 6:
        fmonth = 'июля';
        break;
      case 7:
        fmonth = 'августа';
        break;
      case 8:
        fmonth = 'сентября';
        break;
      case 9:
        fmonth = 'октября';
        break;
      case 10:
        fmonth = 'ноября';
        break;
      case 11:
        fmonth = 'декабря';
        break;
    }
    return day + ' ' + fmonth;
  }

  return (
    <div className="px-4">
      <div className="lg:flex lg:space-x-4">
        <div className="mb-8 md:mb-0 lg:w-1/2">
          <div className="w-full overflow-hidden relative dark:bg-surface-dark-200 rounded-lg">
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
                  sizes: '(max-width: 404px) 370px, 100vw',
                  priority: true,
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
                  loading='lazy'
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
          <h1 className="font-bold text-xl md:text-6xl mb-3 dark:text-white leading-tight">
            {product.name}
          </h1>
          <div className="mb-3 px-3 py-2 bg-neutral-100 dark:bg-surface-dark-200 rounded-lg">
            <span className="font-bold text-3xl text-accent-200 dark:text-accent-dark-500">
              {formatCurrencyValue({
                currency: activeCurrency,
                value: product.price,
              })}
            </span>
            <div className="border-b my-1 h-0 border-neutral-400 dark:border-surface-dark-400" />
            <Link href="/payment">
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm dark:text-surface-dark-600">оплата при получении</span>
                <ChevronRight className="text-neutral-400 dark:text-surface-dark-600" />
              </div>
            </Link>
          </div>
          <div className="mb-6">
            <p className="text-gray-500 dark:text-white flex-none">{product.description}</p>
          </div>
          <div className=" -mx-3">
            {product.variants.length > 1 ? (
              <div className="md:w-3/4 px-3 mb-6">
                <label
                  className="block mb-2"
                  htmlFor="style"
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-slategray">Цвет:</span> <span>{activeVariant.name}</span>
                </label>
                <div className="flex space-x-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`h-8 w-8 rounded-full border-2 ${activeVariantId === variant.id ? 'border-primary-100 dark:border-primary-dark-500 opacity-100' : 'border-gray-300 opacity-50'} ${colorMap[variant.color]}`}
                      onClick={() => updateVariant(variant.id)}
                    />
                  ))}
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
          <div className="mb-6">
            <label
              className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
              htmlFor="quantity"
            >
              Информация о доставке
            </label>
            <div className="flex items-center">
              <div className="mr-4">
                <Pin />
              </div>
              <div class="flex-1 border-b-2 pb-1 dark:border-surface-dark-400">
                <span className="font-semibold">
                  Почта России
                </span>
                <br />
                <span className="text-sm text-gray-600 dark:text-surface-dark-600">
                  с {dateFormat(new Date(), 7)} по {dateFormat(new Date(), 14)}{' '}
                  -{' '}
                  <span className="text-accent-200 dark:text-accent-dark-500 font-semibold">от 350 ₽</span>
                </span>
              </div>
            </div>
            <div className="flex items-center pt-1">
              <div className="mr-10"></div>
              <div className="flex-1">
                <span className="font-semibold">Бесплатная доствка</span>
                <br />
                <span className="text-sm text-gray-600 dark:text-surface-dark-600">
                  При покупке от{' '}
                  <span className="text-accent-200 dark:text-accent-dark-500 font-semibold">1 900 ₽</span> -{' '}
                  <Link href="/" className="text-gray-600 dark:text-surface-dark-600 font-semibold">
                    подробнее
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="lg:hidden absolute left-0 w-full h-6 bg-neutral-100 dark:bg-surface-dark-200"></div>
        </div>
      </div>
      {product.content && <ProductContent product={product} />}
      <div className="lg:hidden absolute left-0 w-full h-6 bg-neutral-100 dark:bg-surface-dark-200"></div>
      <div className="my-4">
        <ProductReviews product={product} />
      </div>
      <div className="lg:hidden absolute left-0 w-full h-6 bg-neutral-100 dark:bg-surface-dark-200"></div>
      <div className="mb-14 md:hidden px-4 z-10 fixed inset-x-0 bottom-0 pt-2 bg-white dark:bg-surface-dark-200">
        <Button
          onClick={addToCart}
          className="w-full h-12 bg-primary-100 dark:bg-primary-dark-500 rounded-lg font-medium items-center justify-center text-gray-900 text-sm"
        >
          В корзину
          <br />
          <span className="text-xs">
            Доставим с {dateFormat(new Date(), 7)}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default ProductPageUI;
