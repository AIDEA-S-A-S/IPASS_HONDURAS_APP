import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createUploadLink } from 'apollo-upload-client'

var token = ''
export const setToken = (value: string | null) => {
  token = value ? value : ''
}

const authLink = setContext((_: any, { headers }) => {
  return {
    headers: {
      headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// const baseURL = '192.168.0.4:4000'
// const isSSL = false

// const baseURL = __DEV__ ? '192.168.0.4:4000' : 'renapbackend.ipass.com.gt'
// const isSSL = !__DEV__

const baseURL = 'backend2.ipass.com.gt'
const isSSL = true

const httpLink = authLink.concat(
  createUploadLink({
    uri: `${isSSL ? 'https' : 'http'}://${baseURL}/graphql`
  })
)

let myLink = split(
  ({ query }: any) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  new WebSocketLink({
    uri: `${isSSL ? 'wss' : 'ws'}://${baseURL}/subscriptions`,
    options: {
      reconnect: true,
      // connectionParams: {
      //   Authorization: token ? `${token}` : ''
      // }
      connectionParams: () =>
        new Promise((resolve, reject) => {
          AsyncStorage.getItem('token')
            .then(token => {
              resolve({ Authorization: JSON.parse(token as string) })
            })
            .catch(e => {
              resolve({ Authorization: '' })
            })
        })
    }
  }),
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  ssrMode: typeof window === 'undefined',
  link: myLink
})

export default client
