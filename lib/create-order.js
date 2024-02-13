import hygraphMutationClient, { gql } from '@/lib/hygraph-mutation-client'

export const createOrderMutation = gql`
  mutation CreateOrderMutation($order: OrderCreateInput!) {
    order: createOrder(data: $order) {
      id
    }
  }
`

//async function createOrder({ name, address, email, total, items }) {
async function createOrder({ name, address, phone, total, items }) {
  const response = await hygraphMutationClient.request(createOrderMutation, {
    order: {
      name,
      address,
      //email,
      phone,
      total,
      orderItems: {
        create: items.map((item) => ({
          quantity: item.quantity,
          total: item.itemTotal,
          product: {
            connect: {
              id: item.productId
            }
          }
        }))
      }
    }
  })

  return response.order.id;
}

export { createOrder };