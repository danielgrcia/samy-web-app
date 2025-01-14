import axios from 'axios'

const API_URL = 'https://sandbox-api-test.samyroad.com/graphql'

export const fetchImages = async (limit = 10, after = null, searchTerm = '') => {
  const query = `
    query GetImages($first: Int, $after: String, $title: String) {
      images(first: $first, after: $after, title: $title) {
        edges {
          node {
            id
            title
            author
            picture
            price
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `

  const variables = {
    first: limit,
    after,
    title: searchTerm || null
  }

  const response = await axios.post(API_URL, { query, variables })
  return response.data.data.images
}
