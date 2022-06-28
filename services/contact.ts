import { gql } from '@apollo/client'
import { createContact } from 'graphql/Contacts/mutations/createContact'
import { deleteContact } from 'graphql/Contacts/mutations/deleteContact'
import { sendDataVerification } from 'graphql/Contacts/mutations/sendDataVerification'
import { sendDataVerificationPass } from 'graphql/Contacts/mutations/sendDataVerificationPass'
import { sendDataVerificationPDF } from 'graphql/Contacts/mutations/sendDataVerificationPDF'
import { sendVerification as sendVerificationMutate } from 'graphql/Contacts/mutations/sendVerification'
import { updateContact } from 'graphql/Contacts/mutations/updateContact'
import { verifyContact } from 'graphql/Contacts/mutations/verifyContant'
import { getContact } from 'graphql/Contacts/queries/getContact'
import { getEventContact } from 'graphql/Contacts/queries/getEventContact'
import { listContact } from 'graphql/Contacts/queries/listContact'
import { listContactWithOutVerify } from 'graphql/Contacts/queries/listContactWithOutVerify'
import { subListContact } from 'graphql/Contacts/suscriptions/subListContact'
import client from '../graphql/config'
import { uploadMRZ, verifyPhoto } from '../graphql/mutation'
import { IContact, InvitationEvent, ReadedMRZ } from '../types/types'
import { convertTotable } from '../utils/utils'

export const getAllContactUser = async (): Promise<IContact[]> => {
  await client.cache.reset()
  return convertTotable<IContact>(
    await (
      await client.query({ query: gql(listContact) })
    ).data.listContact
  )
}

export const listContactWithOutVerifyFn = async () => {
  client.cache.reset()
  return convertTotable<IContact>(
    await (
      await client.query({ query: gql(listContactWithOutVerify) })
    ).data.listContactWithOutVerify
  )
}

export const updateContactFn = async (input: IContact): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(updateContact), variables: { input } })).data
    .updateContact
}

export const delContact = async (input: { _id: string }): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(deleteContact), variables: { input } })).data
    .deleteContact
}

export const createContactFn = async (input: IContact): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(createContact), variables: { input } })).data
    .createContact
}

export const serVerificationMRZ = async (input: any): Promise<ReadedMRZ> => {
  return (await client.mutate({ mutation: gql(uploadMRZ), variables: { input } })).data.uploadMRZ
}

export const serVerificationPhoto = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(verifyPhoto), variables: { input } })).data
    .verifyPhoto
}

export const sendVerification = async (input: any, ID: string): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(sendDataVerification), variables: { input, ID } }))
    .data.sendDataVerification
}
export const sendVerificationPDF = async (input: any, ID: string): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(sendDataVerificationPDF), variables: { input, ID } }))
    .data.sendDataVerification
}

export const updateContactMutation = async (input: IContact): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(updateContact), variables: { input } })).data
    .updateContact
}

export const verifyContactID = async (contactID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(verifyContact), variables: { contactID } })).data
    .updateContact
}

export const getContactbyId = async (_id: string): Promise<IContact> => {
  client.cache.reset()
  return (await client.query({ query: gql(getContact), variables: { _id } })).data.getContact
}
export const getAllEventByContact = async (_id: string): Promise<InvitationEvent[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(getEventContact), variables: { _id } })).data
    .getEventContact
}

export const resendVerification = async (contactID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendVerificationMutate), variables: { contactID } }))
    .data.sendVerificationMutate
}

export const sendDataVerificationPassFn = async (input: any, ID: string): Promise<IContact[]> => {
  return (
    await client.mutate({ mutation: gql(sendDataVerificationPass), variables: { input, ID } })
  ).data.sendDataVerificationPass
}

export const subscribeContactUser = async (
  after: (data: boolean) => void,
  hostID?: any
): Promise<ZenObservable.Subscription> => {
  after(true)
  return client.subscribe({ query: gql(subListContact), variables: { hostID } }).subscribe({
    next(data) {
      after(data.data.subListContact)
    },
    error(err) {
      console.log('err', err)
    }
  })
}
