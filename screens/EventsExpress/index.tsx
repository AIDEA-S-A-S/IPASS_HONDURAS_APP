import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import useAuth from 'providers/AuthContext'
import React, { useCallback, useEffect, useState } from 'react'
import { VirtualizedList } from 'react-native'
import { subscribeContactUser } from 'services/contact'
import { listEventExpressFn, subListEventExpressFn } from 'services/eventExpress'
import { IEventExpress, ILocation, Privilege } from 'types/types'
import { perNames } from 'utils/utils'
import { Text, View } from '../../components/Themed'

var unsContact: any
var unsEveExpress: any

const index = ({ navigation, route }: StackScreenProps<any>) => {
  //#region provider
  const { permissions, user } = useAuth()
  //#endregion provider

  //#region  states
  const [data, setData] = useState<IEventExpress[]>([])
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

  useFocusEffect(
    useCallback(() => {
      unsContact = subscribeContactUser(
        (newData: boolean) => {
          getData()
        },
        perNames.includes((permissions as Privilege).name as string) ? null : (user?._id as string)
      )
      unsEveExpress = subListEventExpressFn((newData: boolean) => {
        getData()
      })
      return () => {
        if (unsContact && unsContact.unsubscribe) {
          unsContact.unsubscribe()
        }
        if (unsEveExpress && unsEveExpress.unsubscribe) {
          unsEveExpress.unsubscribe()
        }
      }
    }, [])
  )

  //#endregion effect

  //#region  functions
  const getData = async () => {
    try {
      const eventsExpress = await listEventExpressFn()
      setData(eventsExpress)
    } catch (error) {
      console.error(error)
    }
  }

  //#endregion functions

  return (
    <>
      <LayoutScreen
        navigation={navigation}
        {...(permissions?.name === 'super_anfitrion' && {
          createAction: () => navigation.navigate('EventsExpressCrud')
        })}
        // actionFilter={() => modalRef.current?.open()}
        title="Eventos Express"
        header
        // titleCreate={moment().locale('es').format('dddd DD MMMM')}
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              refreshing={refreshing}
              onRefresh={getData}
              contentContainerStyle={{ width: '100%' }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IEventExpress; index: number }) => {
                return (
                  <CardComponent
                    showButtonAction={false}
                    // style={styles.containerList}
                    onPress={() => {
                      navigation.navigate('EventoExpressScreen', {
                        screen: 'EventoExpress',
                        params: { event: item }
                      })
                    }}
                  >
                    <>
                      <Text style={styles.mainTitle}>{item.name}</Text>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Locación:</Text>
                        <Text style={styles.text}>{(item?.location as ILocation)?.name}</Text>
                      </View>
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
