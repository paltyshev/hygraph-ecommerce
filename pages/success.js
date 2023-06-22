import * as React from 'react';
// import { useRouter } from 'next/router';
// import getOrderBySessionId from '@/lib/get-order-session-id';
// import PurchasedItems from '@/components/purchased-items';
import { Check } from '@/icons';
import Link from 'next/link';
import Button from '@/components/ui/button';

function SuccessPage() {
  // const router = useRouter();
  // const [loading, setLoading] = React.useState(true);
  // const [order, setOrder] = React.useState(null);

  // React.useEffect(() => {
  //   const fetchOrder = async () => {
  //     const { order } = await getOrderBySessionId({ id: router.query.id });

  //     setLoading(false);
  //     setOrder(order);
  //   };

  //   if (router.query.id) fetchOrder();
  // }, [router.query.id]);

  // if (loading) return 'loading';

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-200">
      <div className="p-6">
        <div className="flex items-center justify-center">
          <Check style={{ color: '#4caf50' }} />
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Заказ успешно оформлен!
          </h1>
          <p className="mt-2 text-gray-600">
            Спасибо, что выбрали наш магазин. Ваш заказ был успешно оформлен и
            скоро будет доставлен.
          </p>
          <div className="absolute bottom-0 left-0 right-0 m-4">
            <Link href="/">
              <Button className="w-full h-12 bg-white rounded-lg font-medium flex items-center justify-center text-gray-900">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
