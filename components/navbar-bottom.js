import Link from 'next/link';
import {
  FiHomeIcon,
  FiCreditCardIcon,
  FiMenuIcon,
  FiTruckIcon,
  FiShoppingCartIcon,
} from '@/icons';
import { useCart } from 'react-use-cart';

function NavbarBottom() {
  const { totalItems } = useCart();
  const cartItemsCount = totalItems;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center transition-colors duration-500 bg-white dark:bg-surface-dark-200 p-2">
      <Link
        href="/"
        className="flex basis-full flex-col items-center justify-center text-gray-600 dark:text-white hover:text-gray-900"
      >
        <FiHomeIcon size={20} />
        <span className="text-xs mt-1">Главная</span>
      </Link>
      <Link
        href="/payment"
        className="flex basis-full flex-col items-center justify-center text-gray-600 dark:text-white hover:text-gray-900"
      >
        <FiCreditCardIcon size={20} />
        <span className="text-xs mt-1">Оплата</span>
      </Link>
      <Link
        href="/"
        className="flex basis-full flex-col items-center justify-center text-gray-600 dark:text-white hover:text-gray-900"
      >
        <FiMenuIcon size={20} />
        <span className="text-xs mt-1">Меню</span>
      </Link>
      <Link
        href="/delivery"
        className="flex basis-full flex-col items-center justify-center text-gray-600 dark:text-white hover:text-gray-900"
      >
        <FiTruckIcon size={20} />
        <span className="text-xs mt-1">Доставка</span>
      </Link>
      <Link
        href="/cart"
        className="flex relative basis-full flex-col items-center justify-center text-gray-600 dark:text-white hover:text-gray-900"
      >
        <FiShoppingCartIcon size={20} />

        <div className="top-0 absolute left-10">
          {cartItemsCount > 0 && (
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-dark-500 p-2 text-xs text-neutral-500">
              {cartItemsCount}
            </p>
          )}
        </div>
        <span className="text-xs mt-1">Корзина</span>
      </Link>
    </div>
  );
}

export default NavbarBottom;
