import gql from 'graphql-tag'
import { unBanUser } from 'graphql/breach/mutations/unBanUser'
import { listBreach } from 'graphql/breach/queries/listBreach'
import { listBreachLast2DaysApp } from 'graphql/breach/queries/listBreachLast2DaysApp'
import client from 'graphql/config'
import { IBreach } from 'types/types'
import { convertTotable } from 'utils/utils'

export const getAllBreach = async (): Promise<IBreach[]> => {
  client.cache.reset()
  return convertTotable<IBreach>(
    await (
      await client.query({ query: gql(listBreach) })
    ).data.listBreach
  )
}

export const getAllBreach2Days = async (): Promise<IBreach[]> => {
  client.cache.reset()
  return convertTotable<IBreach>(
    await (
      await client.query({ query: gql(listBreachLast2DaysApp) })
    ).data.listBreachLast2DaysApp
  )
}

export const unBanUserFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(unBanUser), variables: { input } })).data.unBanUser
}
