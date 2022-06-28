import { gql } from '@apollo/client'
import client from 'graphql/config'
import { listAttemptsAllExternal } from 'graphql/locationAttempt/queries/listAttemptsAllExternal'
import { listAttemptsAllInternal } from 'graphql/locationAttempt/queries/listAttemptsAllInternal'
import { listAttemptsToday } from 'graphql/locationAttempt/queries/listAttemptsToday'
import { listAttemptsYesterday } from 'graphql/locationAttempt/queries/listAttemptsYesterday'
import { listLocationAttempt } from 'graphql/locationAttempt/queries/listLocationAttempt'
import { ILocationAttempt } from 'types/types'

export const listLocationAttempts = async (): Promise<ILocationAttempt[]> => {
  return (await client.query({ query: gql(listLocationAttempt) })).data.listLocationAttempt
}

export const listLocationAttemptsToday = async (): Promise<ILocationAttempt[]> => {
  return (await client.query({ query: gql(listAttemptsToday) })).data.listAttemptsToday
}

export const listLocationAttemptsYesterday = async (): Promise<ILocationAttempt[]> => {
  return (await client.query({ query: gql(listAttemptsYesterday) })).data.listAttemptsYesterday
}

export const listAttemptsAllInternalFn = async (): Promise<ILocationAttempt[]> => {
  return (await client.query({ query: gql(listAttemptsAllInternal) })).data.listAttemptsAllInternal
}

export const listAttemptsAllExternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()

  return (await client.query({ query: gql(listAttemptsAllExternal) })).data.listAttemptsAllExternal
}
