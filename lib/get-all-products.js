import hygraphClient, { gql } from '@/lib/hygraph-client'
import { ProductCardFragment } from '@/lib/graphql-fragments'

export const getAllProductsQuery = gql`
  query AllProductsQuery($locale: Locale!) {
    products(locales: [$locale, ru]) {
      ...ProductCardFragment
    }
  }

  ${ProductCardFragment}
`

async function getAllProducts({ locale = 'ru' }) {
  const { products } = await hygraphClient.request(getAllProductsQuery, {
    locale
  })

  return {
    products
  }
}

export default getAllProducts
