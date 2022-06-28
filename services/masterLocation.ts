import client from '../graphql/config'
import { subListMasterLocation } from '../graphql/subscriptions'
import { IMasterLocation } from '../types/types'
import { convertTotable } from '../utils/utils'
import { gql } from '@apollo/client'
import { listMasterLocation } from 'graphql/MasterLocations/queries/listMasterLocation'
import { getMasterLocation } from 'graphql/MasterLocations/queries/getMasterLocation'
import { createMasterLocation } from 'graphql/MasterLocations/mutation/createMasterLocation'
import { updateMasterLocation } from 'graphql/MasterLocations/mutation/updateMasterLocation'
import { deleteMasterLocation } from 'graphql/MasterLocations/mutation/deleteMasterLocation'
import { listMasterLocationActive } from 'graphql/MasterLocations/queries/listMasterLocationActive'

export const getAllMasterLocation = async (): Promise<IMasterLocation[]> => {
  return convertTotable<IMasterLocation>(
    await (
      await client.query({ query: gql(listMasterLocation) })
    ).data.listMasterLocation
  )
}

export const listMasterLocationActiveFn = async (): Promise<IMasterLocation[]> => {
  return convertTotable<IMasterLocation>(
    await (
      await client.query({ query: gql(listMasterLocationActive) })
    ).data.listMasterLocationActive
  )
}

export const getMasterLocationFn = async (_id: string): Promise<IMasterLocation> => {
  return (await client.query({ query: gql(getMasterLocation), variables: { _id } })).data
    .getMasterLocation
}

export const createMasterLocationFn = async (input: IMasterLocation): Promise<IMasterLocation> => {
  return (await client.mutate({ mutation: gql(createMasterLocation), variables: { input } })).data
    .createMasterLocation
}

export const updateMasterLocationFn = async (input: IMasterLocation): Promise<IMasterLocation> => {
  return (await client.mutate({ mutation: gql(updateMasterLocation), variables: { input } })).data
    .updateMasterLocation
}

export const deleteMasterLocationFn = async (input: { _id: string }): Promise<IMasterLocation> => {
  return (await client.mutate({ mutation: gql(deleteMasterLocation), variables: { input } })).data
    .deleteMasterLocation
}

export const subscribeMasterLocation = async (
  after: (data: IMasterLocation[], isFirst?: boolean) => void
): Promise<ZenObservable.Subscription> => {
  after(await getAllMasterLocation(), true)

  return client.subscribe({ query: gql(subListMasterLocation) }).subscribe({
    next(result) {
      after(result.data.subListMasterLocation, false)
    },
    error(err) {
      console.error('err', err)
    }
  })
}
