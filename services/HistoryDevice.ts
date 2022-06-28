import { gql } from '@apollo/client'
import client from 'graphql/config'
import { listHistoryDevice } from 'graphql/HistoryDevice/queries/listHistoryDevice'

export const listHistoryDeviceFn = async () => {
  client.cache.reset()
  return (await client.query({ query: gql(listHistoryDevice) })).data.listHistoryDevice
}
