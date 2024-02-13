import AccentButton from '@/components/ui/accent-button';
import Link from 'next/link';
import { DeliveryIcon } from '@/icons';

export default function Delivery() {
  return (
    <div>
      <div className=" dark:bg-surface-dark-100 text-gray-800 dark:text-gray-100 h-5/6 mb-6">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-center">
            <DeliveryIcon className="mx-auto m-16 w-32 h-32 fill-primary-100 dark:fill-primary-dark-200" />
          </div>
          <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">Доставка</h1>
          <p className="text-lg mb-8 dark:text-gray-100">
            Мы отправляем заказы через Почту России
          </p>
          <Link href="/">
            <AccentButton>Продолжить покупки</AccentButton>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4">Уважаемые клиенты!</p>
        <p className="mb-4">
          Мы рады сообщить, что наш интернет-магазин предлагает удобную и безопасную систему доставки товаров через Почту России. Мы понимаем, что каждый покупатель имеет свои предпочтения и потребности, поэтому предлагаем следующий вариант доставки:
        </p>
        <h2 className="text-lg font-bold mb-2">
          Доставка через Почту России
        </h2>
        <p className="mb-4">
          Этот вариант позволяет вам получить заказ прямо на вашем почтовом отделении. Вы можете осмотреть товар и убедиться в его качестве перед оплатой. Оплата производится наличными или банковской картой.
        </p>
        <p className="mb-4 font-bold">
          Важно! При выборе данного варианта доставки необходимо учитывать, что наложенный платеж взимается за услугу пересылки денежных средств и может составлять до 5% от стоимости заказа. Кроме того, наложенный платеж может быть недоступен в некоторых регионах России.
        </p>
        <p className="mb-4">
          Мы гарантируем, что все наши товары соответствуют заявленным характеристикам и качеству. Если вы обнаружили какие-либо недостатки или дефекты при получении товара, мы готовы принять его обратно и вернуть вам деньги.
        </p>
        <p className="mb-4">
          Если у вас возникли какие-либо вопросы или проблемы с доставкой, наши менеджеры всегда готовы помочь вам. Свяжитесь с нами любым удобным для вас способом и мы ответим на все ваши вопросы.
        </p>
        <p className="font-bold">Спасибо за покупку в нашем магазине!</p>
      </div>
    </div>
  );
}
