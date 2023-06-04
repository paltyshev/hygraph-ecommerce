import hygraphClient, { gql } from '@/lib/hygraph-client'
import { CollectionFragment } from '@/lib/graphql-fragments'

export const getAllCollectionsQuery = gql`
  query AllCollectionsQuery($locale: Locale!) {
    collections(locales: [$locale, ru]) {
      ...CollectionFragment
    }
  }

  ${CollectionFragment}
`

async function getAllCollections({ locale = 'ru' } = {}) {
  const { collections } = await hygraphClient.request(getAllCollectionsQuery, {
    locale
  })

  return { collections }
}

export default getAllCollections
