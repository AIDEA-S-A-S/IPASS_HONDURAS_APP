import { AntDesign, Feather } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { View } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import {
  delContact,
  getAllEventByContact,
  getContactbyId,
  resendVerification
} from 'services/contact'
import { IContact, InvitationEvent } from 'types/types'
import { capitalize } from 'utils/utils'
import styles from './styles'

const Contact = ({ navigation, route }: StackScreenProps<any>) => {
  const contact: IContact = route?.params?.contact

  //#region states
  const [allEvents, setAllEvents] = useState<InvitationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [actualContact, setActualContact] = useState<IContact>()
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  const getData = async () => {
    try {
      const contactData = await getContactbyId(contact._id as string)
      setActualContact(contactData)
      const res = await getAllEventByContact(contact._id as string)
      setAllEvents(res.filter(e => !!e.event))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteFun = () => {
    Alert.alert(`¿Deseas eliminar el contacto ${actualContact?.firstName}?`, ' ', [
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
      await delContact({ _id: actualContact?._id as string })
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  const askToSend = async () => {
    Alert.alert(
      `¿Deseas enviar una solicitud de verificación para ${actualContact?.firstName}?`,
      ' ',
      [
        {
          text: 'Cancelar',
          style: 'destructive'
        },
        {
          text: 'Aceptar',
          onPress: () => sendVerification()
        }
      ]
    )
  }

  const sendVerification = async () => {
    await resendVerification(actualContact?._id as string)
  }

  const verificationCondition = () => {
    if (!actualContact?.verified) {
      if (actualContact?.verifiedData !== null || actualContact?.verifiedDataPDF !== null) {
        return (
          <TextToShowData
            title="Comprobar verificación"
            primary
            Icon={<AntDesign name="eye" size={RFPercentage(2.5)} color="white" />}
            onPress={() =>
              navigation.navigate('VerificationInfoContact', {
                contact: actualContact,
                toAccept: true
              })
            }
          />
        )
      } else {
        return (
          <TextToShowData
            title="Enviar solicitud de verificación"
            primary
            Icon={<Feather name="send" size={RFPercentage(2.5)} color="white" />}
            onPress={askToSend}
          />
        )
      }
    } else {
      return (
        <TextToShowData
          title="Ver información de verificación"
          primary
          onPress={() => navigation.navigate('VerificationInfoContact', { contact: actualContact })}
          Icon={<AntDesign name="eye" size={RFPercentage(2.5)} color="white" />}
        />
      )
    }
  }

  return (
    <LayoutScreen
      loading={loading}
      navigation={navigation}
      title={`${capitalize(actualContact?.firstName)} ${capitalize(actualContact?.lastName)}`}
      styleStatusBar="light"
    >
      <>
        <View style={styles.container}>
          <TextToShowData title={'DPI'} text={actualContact?.DPI} />

          <TextToShowData title={'Teléfono'} text={actualContact?.phone} />
          <TextToShowData title={'Email'} text={actualContact?.email} />
          {actualContact?.verified && (
            <TextToShowData
              Icon={<Feather name="shield" size={RFPercentage(2.5)} color="green" />}
              title="Verificado"
            />
          )}
          {verificationCondition()}
          <TextToShowData
            title="Eventos"
            text={allEvents.length}
            {...(allEvents.length > 0 && {
              onPress: () => navigation.navigate('EventContact', { events: allEvents }),
              primary: true
            })}
          />
          <View style={styles.buttons}>
            <ButtonAction
              styles={{ flex: 1, marginRight: 5 }}
              mode="dark"
              status="danger"
              onPress={deleteFun}
              text="Eliminar"
              icon="trash-outline"
            />
            <ButtonAction
              icon="edit-outline"
              mode="dark"
              status="primary"
              text="Editar"
              styles={{ flex: 1, marginLeft: 5 }}
              onPress={() => navigation.navigate('ContactCrud', { id: actualContact?._id })}
            />
          </View>
        </View>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Contact)
