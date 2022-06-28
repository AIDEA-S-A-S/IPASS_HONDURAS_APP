import { gql } from '@apollo/client'
import { analythicsAttemptsApp } from 'graphql/board/queries/analythicsAttemptsApp'
import client from 'graphql/config'
import { iLocationAttemptAnalythics } from 'types/types'

export const analythicsAttemptsAppFn = async (): Promise<iLocationAttemptAnalythics> => {
  await client.cache.reset()
  return await (
    await client.query({ query: gql(analythicsAttemptsApp) })
  ).data.analythicsAttemptsApp
}
