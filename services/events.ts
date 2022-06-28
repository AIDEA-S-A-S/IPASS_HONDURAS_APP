import client from '../graphql/config'
import { eventacceptReject } from '../graphql/mutation'

import { listEvent } from '../graphql/events/listEvent'
import { subEvent, subListEvent } from '../graphql/subscriptions'
import { IEvent, ILocationAttempt } from '../types/types'
import { convertTotable, convertTotableOne } from '../utils/utils'
import { gql } from '@apollo/client'
import { createEvent } from 'graphql/events/mutation/createEvent'
import { listEventActive } from 'graphql/events/queries/listEventActive'
import { getEvent } from 'graphql/events/queries/getEvent'
import { updateEvent } from 'graphql/events/mutation/updateEvent'
import { deleteEvent } from 'graphql/device/mutation/deleteDevice'
import { listEventsYesterday } from 'graphql/events/queries/listEventsYesterday'
import { listEventsToday } from 'graphql/events/queries/listEventsToday'
import { listEventsTomorrow } from 'graphql/events/queries/listEventsTomorrow'
import { listAttemptsMonthInternal } from 'graphql/events/queries/listAttemptsMonthInternal'
import { listAttemptsMonthExternal } from 'graphql/events/queries/listAttemptsMonthExternal'

export const getAllEventsUserActive = async (): Promise<IEvent[]> => {
  client.cache.reset()
  return convertTotable<IEvent>(
    await (
      await client.query({ query: gql(listEventActive) })
    ).data.listEventActive
  )
}

export const getAllEventsUser = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(
    await (
      await client.query({ query: gql(listEvent) })
    ).data.listEvent
  )
}

export const getEventFn = async (_id: string): Promise<IEvent | null> => {
  return convertTotableOne<IEvent>(
    (await client.mutate({ mutation: gql(getEvent), variables: { _id } })).data.getEvent
  )
}

export const addEvent = async (input: IEvent): Promise<IEvent[]> => {
  return (await client.mutate({ mutation: gql(createEvent), variables: { input } })).data
    .createEvent
}

export const editEvent = async (input: IEvent): Promise<IEvent[]> => {
  return (await client.mutate({ mutation: gql(updateEvent), variables: { input } })).data
    .updateEvent
}

export const delEvent = async (input: { _id: string }): Promise<IEvent[]> => {
  return (await client.mutate({ mutation: gql(deleteEvent), variables: { input } })).data
    .deleteEvent
}

export const subscribeEventsUser = async (
  after: (data: IEvent[]) => void
): Promise<ZenObservable.Subscription> => {
  after(await getAllEventsUser())
  client.cache.reset()
  return client.subscribe({ query: gql(subListEvent) }).subscribe({
    next(data) {
      after(convertTotable<IEvent>(data.data.subListEvent))
    },
    error(err) {
      console.error('Error en subscription events user', err)
    }
  })
}

export const subscribeToEvent = async (
  id: string,
  after: (data: IEvent | null) => void
): Promise<ZenObservable.Subscription> => {
  after(await getEventFn(id))
  client.cache.reset()
  return client.subscribe({ query: gql(subEvent), variables: { id } }).subscribe({
    next(data) {
      after(convertTotableOne<IEvent>(data.data.subEvent))
    },
    error(err) {
      console.error('Error en subscription events user', err)
    }
  })
}

export const getEventServices = async (_id: string): Promise<IEvent> => {
  client.cache.reset()
  return await (
    await client.query({ query: gql(getEvent), variables: { _id } })
  ).data.getEvent
}

export const confirmEventMutation = async (
  confirm: boolean,
  contact: string | undefined,
  Event: string | undefined
): Promise<IEvent> => {
  client.cache.reset()
  return await (
    await client.mutate({
      mutation: gql(eventacceptReject),
      variables: { input: { confirm, contact, Event } }
    })
  ).data.eventacceptReject
}

export const getEventsYesterday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(
    await (
      await client.query({ query: gql(listEventsYesterday) })
    ).data.listEventsYesterday
  )
}

export const getEventsToday = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(
    await (
      await client.query({ query: gql(listEventsToday) })
    ).data.listEventsToday
  )
}

export const getEventsTomorrow = async (): Promise<IEvent[]> => {
  return convertTotable<IEvent>(
    await (
      await client.query({ query: gql(listEventsTomorrow) })
    ).data.listEventsTomorrow
  )
}

export const listAttemptsMonthInternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()

  return (await client.query({ query: gql(listAttemptsMonthInternal) })).data
    .listAttemptsMonthInternal
}

export const listAttemptsMonthExternalFn = async (): Promise<ILocationAttempt[]> => {
  await client.cache.reset()
  return (await client.query({ query: gql(listAttemptsMonthExternal) })).data
    .listAttemptsMonthExternal
}
