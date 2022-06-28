import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { delEvent, getEventFn } from 'services/events'
import { getAllInvitationByEvent } from 'services/invitationEvent'
import { IEvent, InvitationEvent } from 'types/types'
import { getTime } from 'utils/utils'
import styles from './styles'

const Event = ({ navigation, route }: StackScreenProps<any>) => {
  // console.log(route.params)

  //#region  hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region states

  const [allGuest, setAllGuest] = useState<InvitationEvent[]>([])
  const [actualEvent, setActualEvent] = useState<IEvent>()
  const [loading, setLoading] = useState(true)
  //#endregion states

  //#region effect

  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region functions
  const getData = async () => {
    setLoading(true)
    try {
      const event = await getEventFn(route?.params?.event?._id)
      const guests = await getAllInvitationByEvent(route?.params?.event?._id)
      setAllGuest(guests)
      setActualEvent(event as IEvent)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const askToDelete = () => {
    Alert.alert(`¿Deseas eliminar el evento ${actualEvent?.name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => deleteModal()
      }
    ])
  }

  const deleteModal = async () => {
    try {
      await delEvent({ _id: actualEvent?._id as string })
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }
  //#endregion functions

  return (
    <LayoutScreen
      loading={loading}
      styleStatusBar="light"
      navigation={navigation}
      title={`Evento: ${actualEvent?.name} `}
    >
      <>
        <View style={styles.container}>
          <View
            style={{
              ...styles.containerConent
            }}
          >
            <TextToShowData title={'Nombre'} text={actualEvent?.name} />
            <TextToShowData title={'Dirección'} text={actualEvent?.location?.address} />
            <TextToShowData title={'Inicio'} text={getTime(actualEvent?.start)} />
            <TextToShowData title={'Fin'} text={getTime(actualEvent?.end)} />

            <TextToShowData
              title={'Solo Verificados'}
              Icon={
                actualEvent?.onlyAuthUser ? (
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name="checkcircle"
                    size={RFPercentage(2)}
                    color={Colors[colorScheme].text}
                  />
                ) : (
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name="closecircle"
                    size={RFPercentage(2)}
                    color={Colors[colorScheme].text}
                  />
                )
              }
            />
            <TextToShowData title="Minutos Previos" text={actualEvent?.beforeStart} />
            <TextToShowData
              onPress={() => navigation.navigate('InvitadosEvento', { event: actualEvent })}
              primary
              Icon={
                <AntDesign
                  style={{ marginLeft: 5 }}
                  name="user"
                  size={RFPercentage(2)}
                  color={Colors['dark'].text}
                />
              }
              title={'Invitados'}
              text={allGuest?.length.toString()}
            />
          </View>
          <View style={styles.buttons}>
            <ButtonAction
              styles={{ flex: 1, marginRight: 5 }}
              mode="dark"
              status="danger"
              onPress={askToDelete}
              text="Eliminar"
              icon="trash-outline"
            />
            <ButtonAction
              icon="edit-outline"
              mode="dark"
              status="info"
              text="Editar"
              styles={{ flex: 1, marginLeft: 5 }}
              onPress={() => navigation.navigate('EventoCrud', { id: actualEvent?._id })}
            />
          </View>
        </View>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Event)
