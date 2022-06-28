import client from '../graphql/config'
import { filterLocationEntries, generateReportLocationEntries } from '../graphql/queries'
import { LocationEntries } from '../types/types'
import { convertTotable } from '../utils/utils'
import { gql } from '@apollo/client'

export const getAllReport = async (filter: any): Promise<LocationEntries[]> => {
  client.cache.reset()
  return convertTotable<LocationEntries>(
    await (
      await client.query({ query: gql(filterLocationEntries), variables: filter })
    ).data.filterLocationEntries
  )
}

export const generateReport = async (filter: any): Promise<LocationEntries[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(generateReportLocationEntries), variables: filter })).data.generateReportLocationEntries
}
