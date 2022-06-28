import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { Text, View } from 'components/Themed'
import React from 'react'
import { VirtualizedList } from 'react-native'
import { IEvent, InvitationEvent } from 'types/types'
import { convertTotable, getTime } from 'utils/utils'

const index = ({ navigation, route }: StackScreenProps<any>) => {
  const data = convertTotable<InvitationEvent>(route?.params?.events)

  return (
    <LayoutScreen
      navigation={navigation}
      // actionFilter={() => modalRef.current?.open()}
      title="Eventos"
      withoutSafeArea
    >
      <View style={styles.container}>
        {data && (
          <VirtualizedList
            style={{ width: '100%' }}
            data={data}
            contentContainerStyle={{ width: '100%' }}
            getItemCount={data => data.length}
            getItem={(data, index) => ({ ...data[index] })}
            renderItem={({ item }: { item: InvitationEvent; index: number }) => {
              return (
                <CardComponent
                  showButtonAction={false}
                  // style={styles.containerList}
                  onPress={() => {
                    navigation.navigate('EventoScreen', { event: item.event })
                  }}
                >
                  <>
                    <Text style={styles.mainTitle}>{(item.event as IEvent).name}</Text>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Dirección:</Text>
                      <Text style={styles.text}>{item?.location?.address}</Text>
                    </View>
                    <Text style={{ ...styles.subTitle, marginBottom: 5 }}>
                      {getTime((item.event as IEvent).start)} -{' '}
                      {getTime((item.event as IEvent).end)}{' '}
                    </Text>
                  </>
                </CardComponent>
              )
            }}
          />
        )}
      </View>
    </LayoutScreen>
  )
}

export default React.memo(index)
