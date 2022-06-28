import client from '../graphql/config'
import { subListLocation } from '../graphql/subscriptions'
import { ILocation } from '../types/types'
import { convertTotable } from '../utils/utils'
import { gql } from '@apollo/client'
import { listLocation } from 'graphql/Location/queries/listLocation'
import { getLocation } from 'graphql/Location/queries/getLocation'
import { createLocation } from 'graphql/Location/mutations/createLocation'
import { updateLocation } from 'graphql/Location/mutations/updateLocation'
import { listLocationActive } from 'graphql/Location/queries/listLocationActive'
import { deleteLocation } from 'graphql/Location/mutations/deleteLocation'
export const getAllLocation = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>(
    await (
      await client.query({ query: gql(listLocation) })
    ).data.listLocation
  )
}

export const getAllLocationActive = async (): Promise<ILocation[]> => {
  client.cache.reset()
  return convertTotable<ILocation>(
    await (
      await client.query({ query: gql(listLocationActive) })
    ).data.listLocationActive
  )
}

export const getLocationFn = async (_id: string) => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getLocation), variables: { _id } })
  ).data.getLocation
}

export const createLocationFn = async (input: ILocation) => {
  return (await client.mutate({ mutation: gql(createLocation), variables: { input } })).data
    .createLocation
}

export const updateLocationFn = async (input: ILocation) => {
  return (await client.mutate({ mutation: gql(updateLocation), variables: { input } })).data
    .updateLocation
}

export const deleteLocationFn = async (_id: string) => {
  return (await client.mutate({ mutation: gql(deleteLocation), variables: { input: { _id } } }))
    .data.deleteLocation
}

export const subscribeLocation = async (
  after: (data: ILocation[], isFirst: boolean) => void
): Promise<ZenObservable.Subscription> => {
  after(await getAllLocation(), true)
  return client.subscribe({ query: gql(subListLocation) }).subscribe({
    next(data) {
      after(data.data.subListLocation, false)
    },
    error(err) {
      console.error('err location', err)
    }
  })
}
