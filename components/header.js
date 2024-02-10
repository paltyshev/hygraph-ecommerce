import Link from 'next/link';
import { useCart } from 'react-use-cart';

import { formatCurrencyValue } from '@/utils/format-currency-value';
import { HygraphSVG } from '@/svgs';
import { ShoppingCartIcon } from '@/icons';
import { useSettingsContext } from '@/context/settings';

function Header({ pages = [] }) {
  const { cartTotal } = useCart();
  const { activeCurrency } = useSettingsContext();

  return (
    <header className="max-w-7xl mx-auto flex-grow flex items-center justify-between px-4 sm:px-6">
      <div className="py-4 w-full">
        <nav className="flex items-center justify-between flex-wrap space-x-4">
          <Link
            href="/"
            className="flex items-center text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full pr-3 font-medium"
          >
            <HygraphSVG className="h-auto text-primary w-5 flex-shrink-0" />{' '}
            ToyBeary
          </Link>
          {pages.length ? (
            <ul className="hidden md:mx-auto md:block md:flex-grow">
              {pages.map((page) => (
                <li
                  key={page.id}
                  className="block my-4 md:inline-block md:my-0"
                >
                  <Link
                    href={`/${page.type.toLowerCase()}/${page.slug}`}
                    className="text-lightgray hover:text-slategray hover:bg-gainsboro rounded-full py-2 px-3 font-medium"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex items-center">
            <Link href="/cart" className="flex space-x-2">
              <ShoppingCartIcon
                className="h-6 w-6 text-gray-400 dark:text-white"
                aria-hidden="true"
              />
              <span className="text-gray-900 dark:text-slate-100">
                {formatCurrencyValue({
                  currency: activeCurrency,
                  value: cartTotal,
                })}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
