import { StackScreenProps } from '@react-navigation/stack'
import Cards from 'components/Board/Cards'
import LayoutScreen from 'components/LayoutScreen'
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView } from 'react-native'
import { getEventsToday, getEventsTomorrow, getEventsYesterday } from 'services/events'
import { listLocationAttemptsToday, listLocationAttemptsYesterday } from 'services/locationAttempts'
import { IEvent, ILocationAttempt } from 'types/types'

const index = ({ navigation }: StackScreenProps<any>) => {
  //#region states
  const [locationAttempts, setLocationAttempts] = useState<ILocationAttempt[]>([])
  const [eventsYesterday, setEventsYesterday] = useState<IEvent[]>([])
  const [eventsToday, setEventsToday] = useState<IEvent[]>([])
  const [eventsTomorrow, setEventsTomorrow] = useState<IEvent[]>([])
  const [yesterdayAttempts, setYesterdayAttempts] = useState(0)
  const [todayAttempts, setTodayAttempts] = useState(0) //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region functions
  const getData = async () => {
    setEventsToday(await getEventsToday())
    setEventsYesterday(await getEventsYesterday())
    setEventsTomorrow(await getEventsTomorrow())
    var yesterdayAttempts = await listLocationAttemptsYesterday()
    var todayAttempts = await listLocationAttemptsToday()
    setLocationAttempts(todayAttempts)
    if (yesterdayAttempts.length > 0) {
      const attempts = yesterdayAttempts
        .map(item => item.attempts)
        .reduce((prev, next) => prev + next)
      setYesterdayAttempts(attempts)
    }
    if (todayAttempts.length > 0) {
      const attempts = todayAttempts.map(item => item.attempts).reduce((prev, next) => prev + next)
      setTodayAttempts(attempts)
    }
  }
  //#endregion functions

  return (
    <LayoutScreen welcome header navigation={navigation} title="Tablero de cumplimientos">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 50 : 150 }}
      >
        <Cards
          navigation={navigation}
          eventsToday={eventsToday}
          eventsTomorrow={eventsTomorrow}
          eventsYesterday={eventsYesterday}
          yesterdayAttempts={yesterdayAttempts}
          todayAttempts={todayAttempts}
          attempts={locationAttempts}
        />
      </ScrollView>
    </LayoutScreen>
  )
}

export default React.memo(index)
