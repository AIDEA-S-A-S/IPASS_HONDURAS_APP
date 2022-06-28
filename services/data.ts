import client from '../graphql/config'
import { listSection } from '../graphql/queries'
import { Privilege, Sections } from '../types/types'
import { convertTotable } from '../utils/utils'
import gql from 'graphql-tag'
import { listPrivilege } from 'graphql/privilege/queries/listPrivilege'

export const getSections = async (): Promise<Sections[]> => {
  client.cache.reset()
  return convertTotable<Sections>(
    await (
      await client.query({ query: gql(listSection) })
    ).data.listSection
  )
}

export const getPrivileges = async (): Promise<Privilege[]> => {
  client.cache.reset()
  return convertTotable<Privilege>(
    await (
      await client.query({ query: gql(listPrivilege) })
    ).data.listPrivilege
  )
}
