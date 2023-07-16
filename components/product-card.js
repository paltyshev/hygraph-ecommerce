import Link from 'next/link';
import Image from 'next/image';

import { formatCurrencyValue } from '@/utils/format-currency-value';
import { useSettingsContext } from '@/context/settings';
import Button from './ui/button';

function ProductCard({ id, images, name, price, slug }) {
  const { activeCurrency } = useSettingsContext();

  const [primaryImage] = images;

  return (
    <article key={id}>
      <Link
        href={`/products/${slug}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="rounded-lg cursor-pointer w-full overflow-hidden relative px-4 py-6 md:px-6">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              height={primaryImage.height}
              width={primaryImage.width}
              alt={name}
              title={name}
            />
          ) : null}
          <p className="text-gray-600 font-bold text-md pt-3 md:pt-6">
            {formatCurrencyValue({
              currency: activeCurrency,
              value: price,
            })}
          </p>
          <div className="">
            <p className="text-gray-800 text-sm group-hover:text-amber-700 mb-1 line-clamp-2 md:line-clamp-1">
              {name}
            </p>
          </div>
          <div className="flex-auto pt-2">
            <button className="w-full h-8 bg-amber-400 rounded-lg font-medium text-sm flex items-center justify-center text-gray-900">
              <svg
                className="mr-1"
                width="21"
                height="20"
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
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
