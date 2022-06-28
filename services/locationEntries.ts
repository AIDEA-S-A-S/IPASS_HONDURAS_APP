import { gql } from '@apollo/client'
import client from 'graphql/config'
import { listLocationEntriesExternal } from 'graphql/locationEntries/queries/listLocationEntriesExternal'
import { filterLocationEntries } from 'graphql/report/queries/filterLocationEntries'
import { ILocationEntries } from 'types/types'
import { convertTotable } from 'utils/utils'

export const getAllLocationEntries = async (filter: any): Promise<ILocationEntries[]> => {
  return convertTotable(
    (await client.query({ query: gql(filterLocationEntries), variables: { filter } })).data
      .filterLocationEntries
  )
}

export const getAllLocationEntriesExternal = async (): Promise<ILocationEntries[]> => {
  return convertTotable(
    (await client.query({ query: gql(listLocationEntriesExternal) })).data
      .listLocationEntriesExternal
  )
}
