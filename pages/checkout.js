import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Button from '@/components/ui/button'
import Form from '@/ui/form'
import { useForm } from 'react-hook-form'
import { createOrder } from '@/lib/create-order'
import React from 'react' 

export default function Checkout() {

  const { items, cartTotal, emptyCart } = useCart()
  const router = useRouter()
  const formMethods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required().email(),
        address: yup.string().required()
      })
    )
  })
  const { errors } = formMethods.formState;

  React.useEffect(() => {
    console.log('Form errors:', errors);
  }, [errors]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log('onSubmit called');

    try {
      const orderData = {
        name: data.name,
        address: data.address,
        email: data.email,
        total: cartTotal,
        items: items
      }

      console.log('Submitting order:', orderData);

      const orderId = await createOrder(orderData)
      emptyCart()
      router.push(`/success?id=${orderId}`)
    } catch (error) {
      console.error('Error while submitting the order:', error)
    }
  }

  return (
    <div>
      <h1>Оформление заказа</h1>
      <Form
        className="space-y-4"
        methods={formMethods}
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <Form.Input field="name" label="Имя" placeholder="Введите ваше имя" />
      <Form.Error error={errors.name} />
      <Form.Input field="address" label="Адрес" placeholder="Введите ваш адрес" />
      <Form.Error error={errors.address} />
      <Form.Input field="email" label="Email" placeholder="Введите ваш email" />
      <Form.Error error={errors.email} />
        <Button type="submit">Оформить заказ</Button>
      </Form>
    </div>
  )
}