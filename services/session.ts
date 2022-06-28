import gql from 'graphql-tag'
import { getPrivilege } from 'graphql/queries'
import { loginApp } from 'graphql/Session/loginApp'
import { Privilege } from 'types/types'
import client from '../graphql/config'
import { confirmLogin } from '../graphql/mutation'

export const loginService = async (input: any): Promise<{ response: string; token: string }> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(loginApp), variables: { input } })).data.loginApp
}

export const confirmToken = async (input: any): Promise<{ token: string }> => {
  client.cache.reset()
  return (await client.mutate({ mutation: gql(confirmLogin), variables: { input } })).data.confirmLogin
}

export const getUserPrivilege = async (_id: any): Promise<Privilege> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getPrivilege), variables: { _id } })
  ).data.getPrivilege
}
