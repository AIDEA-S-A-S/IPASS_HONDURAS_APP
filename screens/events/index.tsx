import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import Colors from 'constants/Colors'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllEventsUserActive } from 'services/events'
import { IEvent } from 'types/types'
import { getTime } from 'utils/utils'
import { Text, View } from '../../components/Themed'

const index = ({ navigation, route }: StackScreenProps<any>) => {
  //#region  states
  const [data, setData] = useState<IEvent[]>([])
  const [refreshing, _] = React.useState(false)
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    })

    return unsubscribe
  }, [navigation])

  //#endregion effect

  //#region  functions
  const getData = async () => {
    try {
      const events = await getAllEventsUserActive()
      setData(events)
    } catch (error) {
      console.error(error)
    }
  }

  //#endregion functions

  return (
    <>
      <LayoutScreen
        navigation={navigation}
        createAction={() => navigation.navigate('EventoCrud')}
        // actionFilter={() => modalRef.current?.open()}
        title="Eventos"
        header
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              refreshing={refreshing}
              onRefresh={getData}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IEvent; index: number }) => {
                const invitations = item.invitations.filter(e => !!e.contact)
                return (
                  <CardComponent
                    showButtonAction={false}
                    // style={styles.containerList}
                    onPress={() => {
                      navigation.navigate('EventoScreen', { event: item })
                    }}
                    adicionalButton={
                      <TouchableOpacity
                        onPress={() => {
                          // modalRef.current?.open()
                        }}
                        style={styles.guestNumber}
                      >
                        <AntDesign name="user" size={RFPercentage(5)} color={Colors['dark'].text} />
                        <Text style={styles.mainTitle}>{item.guestNumber}</Text>
                      </TouchableOpacity>
                    }
                  >
                    <>
                      <Text style={styles.mainTitle}>{item.name}</Text>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Dirección:</Text>
                        <Text style={styles.text}>{item?.location?.address}</Text>
                      </View>
                      <Text style={{ ...styles.subTitle, marginBottom: 5 }}>
                        {getTime(item.start)} - {getTime(item.end)}{' '}
                      </Text>
                      {invitations && invitations?.length > 0 && (
                        <View style={styles.containerText}>
                          <View style={{ ...styles.containerIcon, marginRight: 5 }}>
                            <FontAwesome name="user" size={RFPercentage(2.5)} color="black" />
                          </View>
                          <Text style={styles.subTitle}>{invitations?.length}</Text>
                        </View>
                      )}
                    </>
                  </CardComponent>
                )
              }}
            />
          )}
        </View>
      </LayoutScreen>
      {/* <ModalCrudEvent selectedEvent={selectedEvent} modalRef={modalRefCrud} /> */}
    </>
  )
}

export default React.memo(index)
