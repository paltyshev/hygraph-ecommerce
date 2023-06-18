import Link from 'next/link';
import {
  FiHomeIcon,
  FiCreditCardIcon,
  FiMenuIcon,
  FiTruckIcon,
  FiShoppingCartIcon,
  ChevronDownSmallIcon,
} from '@/icons';
import { useSettingsContext } from '@/context/settings';

function NavbarBottom() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center bg-white shadow-md px-4 py-2">
      <Link
        href="/"
        className="flex flex-col items-center justify-center text-gray-600 hover:text-gray-900"
      >
        <FiHomeIcon />
        <span className="text-xs mt-1">Главная</span>
      </Link>
    </div>
  );
}

export default NavbarBottom;
