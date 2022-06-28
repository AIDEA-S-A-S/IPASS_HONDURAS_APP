import client from '../graphql/config'
import { deleteInvitationEvent, updateInvitationEvent } from '../graphql/mutation'
import { getInvitationEvent } from '../graphql/queries'
import { InvitationEvent, IWorker_qr_temporal } from '../types/types'
import { gql } from '@apollo/client'
import { generateHostQR } from 'graphql/invitationEvent/mutations/generateHostQR'
import { listInvitationEventByEvent } from 'graphql/invitationEvent/queries/listInvitationEventByEvent'
import { createInvitationEvent } from 'graphql/invitationEvent/mutations/createInvitationEvent'

export const getAllInvitationByEvent = async (_id: string): Promise<InvitationEvent[]> => {
  client.cache.reset()
  return (await client.query({ query: gql(listInvitationEventByEvent), variables: { _id } })).data
    .listInvitationEventByEvent
}

export const createInvitation = async (input: InvitationEvent): Promise<InvitationEvent> => {
  return (await client.mutate({ mutation: gql(createInvitationEvent), variables: { input } })).data
    .createInvitationEvent
}

export const deleteInvitation = async (_id: string): Promise<InvitationEvent> => {
  return (
    await client.mutate({ mutation: gql(deleteInvitationEvent), variables: { input: { _id } } })
  ).data.deleteInvitationEvent
}

export const getinvitation = async (_id: string): Promise<InvitationEvent> => {
  return (await client.query({ query: gql(getInvitationEvent), variables: { _id } })).data
    .getInvitationEvent
}

export const updateInvitation = async (input: InvitationEvent): Promise<InvitationEvent> => {
  return (await client.mutate({ mutation: gql(updateInvitationEvent), variables: { input } })).data
    .updateInvitationEvent
}

export const getInfoQRHost = async (
  _id: string,
  location: string
): Promise<IWorker_qr_temporal> => {
  return (await client.mutate({ mutation: gql(generateHostQR), variables: { _id, location } })).data
    .generateHostQR
}
