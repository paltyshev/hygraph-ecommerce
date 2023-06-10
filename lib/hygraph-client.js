import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    ...(process.env.NEXT_PUBLIC_HYGRAPH_QUERY_TOKEN && {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_QUERY_TOKEN}`
    })
  }
})

export { gql }
