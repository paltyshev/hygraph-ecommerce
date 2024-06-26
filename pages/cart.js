import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import Button from '@/components/ui/button';
import AccentButton from '@/components/ui/accent-button';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
  ShoppingCartIcon,
} from '@/components/icons';
import { formatCurrencyValue } from '@/utils/format-currency-value';
import getPageData from '@/lib/get-page-data';
import SEO from '@/components/seo';
import { useSettingsContext } from '@/context/settings';
import useSubmissionState from 'hooks/use-form-submission';
import FreeShippingBanner from '@/components/free-shipping-banner';

function Cart() {
  const { cartTotal, isEmpty, items, removeItem, updateItemQuantity } =
    useCart();
  const router = useRouter();
  const { activeCurrency } = useSettingsContext();
  const {
    setSubmissionError,
    setSubmissionLoading,
    submissionError,
    submissionLoading,
    submissionState,
  } = useSubmissionState();

  const decrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity - 1);

  const incrementItemQuantity = (item) =>
    updateItemQuantity(item.id, item.quantity + 1);

  const handleClick = async () => {
    router.push('/checkout');
  };

  if (isEmpty)
    return (
      <div className="flex flex-col justify-center min-h-screen px-4 text-center -mt-16">
        <SEO title="Корзина" />
        <div className="mx-auto mb-4">
          <ShoppingCartIcon className="w-16 h-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Ваша корзина пуста</h2>
        <p className="text-gray-500 mb-6">
          Похоже, вы еще не добавили игрушки в корзину.
          <br />
          Самое время начать покупки и порадовать себя и своих близких!
        </p>
        <Link href="/">
          <AccentButton>Продолжить покупки</AccentButton>
        </Link>
      </div>
    );

  return (
    <React.Fragment>
      <div className="px-4">
        <SEO title="Корзина" />
        {items.map((item) => {
          return (
            <div
              className="md:bg-gray-50 dark:md:bg-surface-dark-200 md:rounded-lg flex items-center pb-3 md:py-6 md:px-6 md:mb-3"
              key={item.id}
            >
              <div className="w-3/5 flex flex-grow items-center">
                <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 dark:bg-surface-dark-300 p-1 rounded-lg">
                  <Image
                    src={item.image.url}
                    width={item.image.width}
                    height={item.image.height}
                    alt={item[router.locale].name}
                  />
                </div>
                <div className="w-4/5">
                  <div className="grid">
                    <Link
                      href={`/products/${item[router.locale].slug}`}
                      className="truncate text-gray-800 dark:text-white font-medium text-sm md:text-base pr-5 pb-2"
                    >
                      {item[router.locale].name}
                    </Link>
                    <div className="text-xs text-gray-400">{item.color}</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-center ml-auto">
                <button
                  className="text-gray-400 hover:text-primary-100 dark:hover:text-primary-dark-500 focus:outline-none p-1"
                  onClick={() => incrementItemQuantity(item)}
                  disabled={submissionLoading}
                >
                  <ChevronUpSmallIcon className="h-4 w-4" />
                </button>
                <span className="mx-3 md:mx-6 p-1">{item.quantity}</span>
                <button
                  className="text-gray-400 hover:text-primary-100 dark:hover:text-primary-dark-500 focus:outline-none p-1"
                  onClick={() => decrementItemQuantity(item)}
                  disabled={submissionLoading}
                >
                  <ChevronDownSmallIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right md:w-1/5">
                <p className="font-medium text-gray-800 dark:text-white">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: item.itemTotal,
                  })}
                </p>
                {item.quantity > 1 && (
                  <p className="text-gray-400 text-sm">
                    {formatCurrencyValue({
                      currency: activeCurrency,
                      value: item.price,
                    })}{' '}
                    за шт.
                  </p>
                )}
                <button
                  className="text-gray-400 hover:text-primary-100 dark:hover:text-primary-dark-500 text-xs "
                  onClick={() => removeItem(item.id)}
                  disabled={submissionLoading}
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
        <FreeShippingBanner />
        <div className="mt-3 md:mt-6 py-3 md:py-6 border-t-2 border-gray-50 dark:border-surface-dark-300">
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-end mb-3">
              <span className="text-gray-700 dark:text-gray-200">Итого:</span>
              <span className="text-xl font-bold ">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
            </div>
            <Button onClick={handleClick} disabled={submissionLoading}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale });

  return {
    props: {
      ...pageData,
    },
  };
}

export default Cart;
