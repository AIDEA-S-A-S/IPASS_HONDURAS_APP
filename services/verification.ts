import { gql } from '@apollo/client'
import client from 'graphql2/config'
import { uploadMRZ } from 'graphql/mutation'
import { ReadedMRZ, ReadedPDF } from 'types/types'
import { uploadPass, uploadPDF } from 'graphql2/mutation'

export const sendVerificationMRZ = async (input: any): Promise<ReadedMRZ> => {
  return (await client.mutate({ mutation: gql(uploadMRZ), variables: { input } })).data.uploadMRZ
}

export const serVerificationPass = async (input: any): Promise<ReadedMRZ> => {
  return (await client.mutate({ mutation: gql(uploadPass), variables: { input } })).data.uploadPass
}

export const serVerificationPDF = async (input: any): Promise<ReadedPDF> => {
  return (await client.mutate({ mutation: gql(uploadPDF), variables: { input } })).data.uploadPDF
}
