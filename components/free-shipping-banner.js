import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { Progress } from "@nextui-org/react";

function FreeShippingBanner() {
  const { cartTotal } = useCart();
  const freeShippingThreshold = 1900; // Порог бесплатной доставки
  let progress = (cartTotal / freeShippingThreshold) * 100; // Прогресс в процентах
  progress = Math.min(progress, 100); // Ограничиваем значение до 100
  const isFreeShipping = cartTotal >= freeShippingThreshold; // Флаг, указывающий, достигнут ли порог бесплатной доставки

  let message;
  if (cartTotal < 1000) {
    message = (
      <p>
        Получите <strong>бесплатную доставку</strong> при заказе на сумму более
        <strong className="text-green-500">{' '}{freeShippingThreshold} ₽</strong>{' '}
        <br />
        <Link href="/">
          <strong className="underline">
            Продолжить покупки
          </strong>
        </Link>
      </p>
    );
  } else if (cartTotal >= 1000 && cartTotal < freeShippingThreshold) {
    message = (
      <p>
        Вам осталось{' '}
        <strong className="text-green-500">
          {freeShippingThreshold - cartTotal} ₽
        </strong>{' '}
        до бесплатной доставки
        <br />
        <Link href="/">
          <strong className="underline">
            Продолжить покупки
          </strong>
        </Link>
      </p>
    );
  } else {
    message = 'Для вас будет бесплатная доставка.';
  }

  return (
    <div>
      <Progress
        size="sm"
        aria-label="Прогресс достижения бесплатной доставки"
        aria-valuetext={`${Math.round(progress)}%`}
        value={progress}
      />
      <div className="text-center text-xs text-gray-500 pt-1">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default FreeShippingBanner;