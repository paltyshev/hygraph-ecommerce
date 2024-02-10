import AccentButton from '@/components/ui/accent-button';
import Link from 'next/link';
import Image from 'next/image';
import terminal from '/components/images/terminal.jpg';
import { Quality } from '@/icons';

export default function Payment() {
  return (
    <div>
      <div className=" dark:bg-surface-dark-100 text-gray-800 dark:text-gray-100 h-5/6 mb-6">
        <div className="container mx-auto p-4">
          <img
            src="https://cdn2.ozone.ru/s3/ob-frontend/prod/release/all/static/assets/images/installment-hero-main.png"
            alt="Оплата"
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold mb-4 dark:text-gray-100">Оплата</h1>
          <p className="text-lg mb-8 dark:text-gray-100">
            Оплатите заказ при получении и осмотре товара
          </p>
          <Link href="/">
            <AccentButton>Продолжить покупки</AccentButton>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <p className="mb-4">Уважаемые клиенты!</p>
        <p className="mb-4">
          Рады сообщить, что наш интернет-магазин предоставляет удобную и
          безопасную систему оплаты товаров. Мы понимаем, что каждый покупатель
          имеет свои предпочтения и потребности, поэтому предлагаем следующий
          вариант оплаты:
        </p>
        <h2 className="text-lg font-bold mb-2">
          Оплата при получении на Почте России
        </h2>
        <p className="mb-4">
          Данная опция позволяет оплатить заказ при получении товара на Почте
          России. Вы можете осмотреть товар и убедиться в его качестве перед
          оплатой. Оплата производится наличными или банковской картой.
        </p>
        <div className="flex justify-center">
          <Image
            src={terminal}
            width={412}
            height={550}
            alt="Терминал оплаты Почты России"
            className="mb-4"
          />
        </div>
        <p className="mb-4 font-bold">
          Важно! При выборе данного варианта оплаты необходимо учитывать, что
          наложенный платеж взимается за услугу пересылки денежных средств и
          может составлять до 5% от стоимости заказа. Кроме того, наложенный
          платеж может быть недоступен в некоторых регионах России.
        </p>
        <p className="mb-4">
          Мы гарантируем, что все наши товары соответствуют заявленным
          характеристикам и качеству. Если вы обнаружили какие-либо недостатки
          или дефекты при получении товара, мы готовы принять его обратно и
          вернуть вам деньги.
        </p>
        <div className="flex justify-center">
          <Quality />
        </div>
        <p className="mb-4">
          Если у вас возникли какие-либо вопросы или проблемы с оплатой, наши
          менеджеры всегда готовы помочь вам. Свяжитесь с нами любым удобным для
          вас способом и мы ответим на все ваши вопросы.
        </p>
        <p className="font-bold">Спасибо за покупку в нашем магазине!</p>
      </div>
    </div>
  );
}
