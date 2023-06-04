import hygraphClient, { gql } from '@/lib/hygraph-client'
import {
  CollectionFragment,
  ProductCardFragment
} from '@/lib/graphql-fragments'

export const getCollectionSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    collections(where: { slug: $slug }, locales: [$locale, ru]) {
      ...CollectionFragment
      products {
        ...ProductCardFragment
      }
    }
  }

  ${[CollectionFragment, ProductCardFragment]}
`

async function getCollectionBySlug({ locale = 'ru', slug }) {
  const {
    collections: [collection]
  } = await hygraphClient.request(getCollectionSlugQuery, {
    locale,
    slug
  })

  return {
    collection
  }
}

export default getCollectionBySlug
