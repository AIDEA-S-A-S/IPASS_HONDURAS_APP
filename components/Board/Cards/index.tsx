import ButtonAction from 'components/ButtonAction'
import Card from 'components/Card'
import { View } from 'components/Themed'
import React, { FC } from 'react'
import Pie from '../Pie'
import Bars from '../Bars'

import { iProps } from './props.interface'
import styles from './styles'

const index: FC<iProps> = ({
  eventsYesterday,
  eventsToday,
  eventsTomorrow,
  yesterdayAttempts,
  todayAttempts,
  attempts,
  navigation
}) => {
  var cumplimiento = 0
  if (attempts.length > 0) {
    cumplimiento = attempts.filter(item => item.authenticated === true).length
  }

  return (
    <>
      <View style={styles.container}>
        <Card title="Eventos de ayer" value={eventsYesterday.length} />
        <Card title="Eventos de hoy" value={eventsToday.length} />
        <Card title="Eventos mañana" value={eventsTomorrow.length} />
        <Card title="Incumplimientos Ayer" value={yesterdayAttempts} />
        <Card title="Incumplimientos hoy" value={todayAttempts} />
        <Card title="Autenticaciones exitosas" value={cumplimiento} />
      </View>
      <ButtonAction
        styles={{ paddingVertical: 0, marginBottom: 20 }}
        text="Feed de incumplimiento"
        onPress={() => navigation.navigate('FeedIncumplimiento')}
      />
      <Bars></Bars>
      <Pie></Pie>
    </>
  )
}

export default React.memo(index)
