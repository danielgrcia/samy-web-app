import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://sandbox-api-test.samyroad.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
