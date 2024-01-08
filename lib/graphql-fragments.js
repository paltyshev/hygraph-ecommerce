import { gql } from '@/lib/hygraph-client'

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    description
    name
    slug
  }
`
export const FirstCategoryFragment = gql`
  fragment FirstCategoryFragment on Category {
    name
  }
`
export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    description
    name
    slug
  }
`

export const ImageFragment = gql`
  fragment ImageFragment on Asset {
    id
    height
    url
    width
    altText
  }
`

export const ProductVariantFragment = gql`
  fragment ProductVariantFragment on ProductVariants {
    __typename
    ... on ProductColorVariant {
      id
      name
    }
    ... on ProductSizeColorVariant {
      id
      name
    }
    ... on ProductSizeVariant {
      id
      name
    }
  }
`

export const ProductFragment = gql`
  fragment ProductFragment on Product {
    id
    description
    content {
      html
      json
      markdown
    }
    images {
      ...ImageFragment
    }
    name
    price
    slug
    variants {
      ...ProductVariantFragment
    }
  }

  ${[ImageFragment, ProductVariantFragment]}
`

export const ProductCardFragment = gql`
  fragment ProductCardFragment on Product {
    id
    images(first: 1) {
      ...ImageFragment
    }
    name
    price
    slug
    variants(first: 1) {
      ...ProductVariantFragment
    }
    categories(first: 1) {
      ...FirstCategoryFragment
    }
  }

  ${[ImageFragment, ProductVariantFragment, FirstCategoryFragment]}
`
