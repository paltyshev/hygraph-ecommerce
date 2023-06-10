import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSettingsContext } from '@/context/settings'
import { formatCurrencyValue } from '@/utils/format-currency-value'

function PurchasedItems({ items }) {
  const router = useRouter();
  const { activeCurrency } = useSettingsContext()

  if (!items || items.length === 0) return <p>No items purchased</p>;

  return (
    <>
      {items.map((item) => {
        return (
          <div
            className="md:bg-gray-50 md:rounded-lg flex items-center py-3 md:py-6 md:px-6 md:mb-3"
            key={item.id}
          >
            <div className="w-3/5 flex flex-grow items-center">
              <div className="h-16 md:h-20 w-16 md:w-20 mr-4 bg-gray-50 p-1 rounded-lg">
                <Image
                  src={item.product.images[0].url}
                  width={item.product.images[0].width}
                  height={item.product.images[0].height}
                  alt={item.product.name}
                />
              </div>
              <div>
                <Link href={`/products/${item.product.slug}`} className="text-gray-800 font-medium text-sm md:text-base">
                  {item.product.name}
                </Link>
              </div>
            </div>
            <div className="text-right md:w-1/5">
              <p className="font-medium text-gray-800">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: item.total
                })}
              </p>
              {item.quantity > 1 && (
                <p className="text-gray-400 text-sm">
                  {formatCurrencyValue({
                    currency: activeCurrency,
                    value: item.product.price
                  })}{' '}
                  each
                </p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PurchasedItems;
