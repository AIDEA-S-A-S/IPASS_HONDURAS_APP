import { gql } from '@apollo/client'
import client from 'graphql/config'
import { createMassiveWorker } from 'graphql/worker/mutation/createMassiveWorker'
import { deleteTemporalQR } from 'graphql/worker/mutation/deleteTemporalQR'
import { generateNewTemporalQR } from 'graphql/worker/mutation/generateNewTemporalQR'
import { loginAppWorker } from 'graphql/worker/mutation/loginAppWorker'
import { signUpWorker } from 'graphql/worker/mutation/signUpWorker'
import { getWorker } from 'graphql/worker/queries/getWorker'
import { listGroupWorkerIfExist } from 'graphql/worker/queries/listGroupWorkerIfExist'
import { listWorker } from 'graphql/worker/queries/listWorker'
import { IGroupWorker, IWorker, IWorker_qr_temporal, Paginated } from 'types/types'
import { convertTotable } from 'utils/utils'

export const listWorkerFn = async (
  page: number,
  limit: number,
  filters: any
): Promise<Paginated<IWorker>> => {
  client.cache.reset()
  const paginated = (
    await client.query({ query: gql(listWorker), variables: { limit, page, filters } })
  ).data.listWorker as Paginated<IWorker>
  return paginated
}

export const confirmSignUpWorkerFn = async (input: any) => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(signUpWorker), variables: { input } })).data
    .signUpWorker
}

export const getWorkerFn = async (_id: string) => {
  await client.cache.reset()
  return (await client.query({ query: gql(getWorker), variables: { _id } })).data.getWorker
}

export const createMassiveWorkerFn = async (input: any): Promise<any[]> => {
  client.cache.reset()
  return convertTotable<IWorker>(
    await (
      await client.mutate({ mutation: gql(createMassiveWorker), variables: { input } })
    ).data.createMassiveWorker
  )
}

export const generateNewTemporalQRFn = async (
  _id: string,
  location: string
): Promise<IWorker_qr_temporal> => {
  client.cache.reset()
  return (
    await client.mutate({ mutation: gql(generateNewTemporalQR), variables: { _id, location } })
  ).data.generateNewTemporalQR
}

export const deleteTemporalQRFn = async (_id: string): Promise<boolean> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(deleteTemporalQR), variables: { _id } })).data
    .deleteTemporalQR
}

export const listGroupWorkerIfExistFn = async (): Promise<IGroupWorker[]> => {
  client.cache.reset()
  return convertTotable(
    (await client.query({ query: gql(listGroupWorkerIfExist) })).data.listGroupWorkerIfExist
  )
}

export const loginWorkerFn = async (input: any): Promise<{ response: string; token: string }> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(loginAppWorker), variables: { input } })).data
    .loginAppWorker
}
