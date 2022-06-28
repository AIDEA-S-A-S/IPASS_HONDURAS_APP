import { gql } from '@apollo/client'
import { createUser } from 'graphql/users/mutation/createUser'
import { deleteUser } from 'graphql/users/mutation/deleteUser'
import { setPushToken } from 'graphql/users/mutation/setPushToken'
import { updateUser } from 'graphql/users/mutation/updateUser'
import { getUser } from 'graphql/users/queries.ts/getUser'
import { getUsersAdmin } from 'graphql/users/queries.ts/getUsersAdmin'
import { listAllUsers } from 'graphql/users/queries.ts/listAllUsers'
import client from '../graphql/config'
import { getUserHost, getUsersSecurity } from '../graphql/queries'
import { User, userSecurity } from '../types/types'
import { convertTotable } from '../utils/utils'

export const getUsersAdminFn = async (): Promise<User[]> => {
  return convertTotable<User>(
    await (
      await client.query({ query: gql(getUsersAdmin) })
    ).data.getUsersAdmin
  )
}

export const listUserFn = async (): Promise<User[]> => {
  client.cache.reset()
  return convertTotable<User>((await client.query({ query: gql(listAllUsers) })).data.listAllUsers)
}

export const getAllAdminUser = async (): Promise<User[]> => {
  client.cache.reset()
  return convertTotable<User>(
    await (
      await client.query({ query: gql(getUsersAdmin) })
    ).data.getUsersAdmin
  )
}

export const deleteUserFn = async (input: { _id: string }): Promise<User[]> => {
  return (await client.mutate({ mutation: gql(deleteUser), variables: { input } })).data.deleteUser
}

export const getAllSecurityUsers = async (): Promise<userSecurity[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(getUsersSecurity) })).data.getUsersSecurity
}

export const getAllHostUsers = async (): Promise<User[]> => {
  client.cache.reset()
  return convertTotable<User>(
    await (
      await client.query({ query: gql(getUserHost) })
    ).data.getUserHost
  )
}

export const createUserFn = async (input: User): Promise<User[]> => {
  return await (
    await client.mutate({ mutation: gql(createUser), variables: { input } })
  ).data.createUser
}

export const updateUserFn = async (input: User): Promise<User[]> => {
  return (await client.mutate({ mutation: gql(updateUser), variables: { input } })).data.updateUser
}

export const getUserFn = async (_id: String): Promise<User> => {
  return (await client.query({ query: gql(getUser), variables: { _id } })).data.getUser
}

export const setPushTokenFn = async (_id: String, token: String, type: String) => {
  return (
    await client.mutate({
      mutation: gql(setPushToken),
      variables: { _id, token, type }
    })
  ).data.setPushToken
}
