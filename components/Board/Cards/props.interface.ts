import { IEvent, ILocationAttempt } from 'types/types'

export type iProps = {
  eventsToday: IEvent[]
  eventsTomorrow: IEvent[]
  eventsYesterday: IEvent[]
  todayAttempts: number
  yesterdayAttempts: number
  attempts: ILocationAttempt[]
  navigation: any
}
