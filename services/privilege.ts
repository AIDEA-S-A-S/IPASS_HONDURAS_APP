import gql from 'graphql-tag'
import client from 'graphql/config'
import { listPrivilege } from 'graphql/queries'
import { Privilege } from 'types/types'

export const getAllPrivilege = async (): Promise<Privilege[]> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(listPrivilege) })
  ).data.listPrivilege
}
