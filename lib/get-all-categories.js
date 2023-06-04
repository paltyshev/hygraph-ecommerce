import hygraphClient, { gql } from '@/lib/hygraph-client'
import { CategoryFragment } from '@/lib/graphql-fragments'

export const getAllCategoriesQuery = gql`
  query AllCategoriesQuery($locale: Locale!) {
    categories(locales: [$locale, ru]) {
      ...CategoryFragment
    }
  }

  ${CategoryFragment}
`

async function getAllCategories({ locale = 'ru' } = {}) {
  const { categories } = await hygraphClient.request(getAllCategoriesQuery, {
    locale
  })

  return { categories }
}

export default getAllCategories
