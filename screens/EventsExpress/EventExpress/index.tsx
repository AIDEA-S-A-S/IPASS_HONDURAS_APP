import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { Text, View } from 'components/Themed'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import {
  acceptEventExpressFn,
  deleteEventExpressFn,
  denyEventExpressFn,
  getEventExpressFn
} from 'services/eventExpress'
import { IContact, IEventExpress, ILocation, User } from 'types/types'
import { capitalize, getTime } from 'utils/utils'
import styles from './styles'
import Modal from 'react-native-modal'
import mainStyles from 'components/styles'
import QRCode from 'react-native-qrcode-generator'
import { typeQr } from 'types/valuesAddQr'

const iconsState: { [key: string]: any } = {
  enable: <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />,
  deny: <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />,
  waiting: <AntDesign name="clockcircle" size={RFPercentage(2.5)} color="#4561FF" />
}

const EventExpress = ({ navigation, route }: StackScreenProps<any>) => {
  //#region provider
  const { permissions } = useAuth()
  //#endregion provider

  //#region states
  const [actualEventExpress, setActualEventExpress] = useState<IEventExpress>()
  const [loading, setLoading] = useState(true)
  const [qr, setQr] = useState('')
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
      const event = await getEventExpressFn(route?.params?.event?._id)

      setActualEventExpress(event)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const askToDelete = () => {
    Alert.alert(`¿Deseas eliminar el evento express ${actualEventExpress?.name}?`, ' ', [
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
  const askToAcept = () => {
    Alert.alert(`¿Deseas aceptar el evento express ${actualEventExpress?.name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => accept()
      }
    ])
  }

  const askToDeny = () => {
    Alert.alert(`¿Deseas denegar el evento express ${actualEventExpress?.name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => deny()
      }
    ])
  }

  const deleteModal = async () => {
    try {
      await deleteEventExpressFn({ _id: actualEventExpress?._id as string })
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  const accept = async () => {
    setLoading(true)

    try {
      await acceptEventExpressFn(actualEventExpress?._id as string)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deny = async () => {
    try {
      await denyEventExpressFn(actualEventExpress?._id as string)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  const HandleCloseModal = () => {
    setQr('')
  }

  console.log(
    `${typeQr.eventExpress}-${actualEventExpress?._id}-$${
      (actualEventExpress?.contact as IContact)?._id
    }`
  )
  //#endregion functions

  return (
    <LayoutScreen
      loading={loading}
      navigation={navigation}
      styleStatusBar="light"
      title={`Evento: ${actualEventExpress?.name} `}
    >
      <>
        <ScrollView style={styles.container}>
          <View
            style={{
              ...styles.containerConent
            }}
          >
            <TextToShowData title={'Motivo'} text={actualEventExpress?.motivo} />
            <TextToShowData
              title={'Locación'}
              text={(actualEventExpress?.location as ILocation)?.name}
            />
            <TextToShowData
              title={'Estado'}
              Icon={iconsState[actualEventExpress?.state as string]}
            />
            {actualEventExpress?.authorizedBy && (
              <TextToShowData
                title="Autorizado por"
                text={`${capitalize((actualEventExpress.authorizedBy as User).name)} ${capitalize(
                  (actualEventExpress.authorizedBy as User).lastname
                )}`}
              />
            )}

            {actualEventExpress?.start && (
              <TextToShowData title={'Inicio'} text={getTime(actualEventExpress?.start)} />
            )}
            {actualEventExpress?.end && (
              <TextToShowData title={'Fin'} text={getTime(actualEventExpress?.end)} />
            )}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: RFPercentage(2.5),
                alignSelf: 'flex-start',
                marginVertical: 10
              }}
            >
              Información de visitante
            </Text>
            <TextToShowData
              title="Nombres"
              text={(actualEventExpress?.contact as IContact)?.firstName}
            />
            <TextToShowData
              title="Apellidos"
              text={(actualEventExpress?.contact as IContact)?.lastName}
            />

            <TextToShowData title="Email" text={(actualEventExpress?.contact as IContact)?.email} />
            <TextToShowData
              title="Teléfono"
              text={(actualEventExpress?.contact as IContact)?.phone}
            />
            {actualEventExpress?.state === 'enable' && (
              <TextToShowData
                title="Ver QR de ingreso"
                Icon={<AntDesign name="qrcode" size={RFPercentage(2.5)} color="white" />}
                primary
                onPress={() =>
                  setQr(
                    `${typeQr.eventExpress}-${actualEventExpress?._id}-$${
                      (actualEventExpress?.contact as IContact)._id
                    }`
                  )
                }
              />
            )}
            {(actualEventExpress?.contact as IContact)?.verified && (
              <TextToShowData
                title="Ver información de verificación"
                primary
                onPress={() =>
                  navigation.navigate('VerificationInfoContact', {
                    contact: actualEventExpress?.contact,
                    eventExpress: actualEventExpress
                  })
                }
                Icon={<AntDesign name="eye" size={RFPercentage(2.5)} color="white" />}
              />
            )}
            {(actualEventExpress as IEventExpress)?.invitados?.length > 0 && (
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: RFPercentage(2.5),
                    alignSelf: 'flex-start',
                    marginVertical: 10
                  }}
                >
                  Visitantes extra
                </Text>
                {((actualEventExpress as IEventExpress)?.invitados as IContact[]).map(invitado => (
                  <View style={{ width: '100%' }}>
                    <Text key={invitado._id} style={styles.subTitle}>
                      {capitalize(invitado.firstName)} {capitalize(invitado.lastName)}
                    </Text>
                    <TextToShowData title="Télefono" text={invitado.phone} />
                    <TextToShowData title="Email" text={invitado.email} />
                    {actualEventExpress?.state === 'enable' && (
                      <TextToShowData
                        title="Ver QR de ingreso"
                        Icon={<AntDesign name="qrcode" size={RFPercentage(2.5)} color="white" />}
                        primary
                        onPress={() =>
                          setQr(
                            `${typeQr.eventExpress}-${actualEventExpress?._id}-$${invitado._id}`
                          )
                        }
                      />
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          {actualEventExpress?.state === 'waiting' &&
            permissions?.name !== 'super_anfitrion' &&
            (actualEventExpress?.contact as IContact)?.verified && (
              <>
                <ButtonAction
                  icon="edit-outline"
                  mode="dark"
                  status="success"
                  text="Aceptar evento"
                  onPress={askToAcept}
                />
                <ButtonAction
                  mode="dark"
                  status="danger"
                  onPress={askToDeny}
                  text="Denegar Evento"
                  icon="trash-outline"
                />
              </>
            )}

          {permissions?.name === 'super_anfitrion' && (
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
                status="primary"
                text="Editar"
                styles={{ flex: 1, marginLeft: 5 }}
                onPress={() =>
                  navigation.navigate('EventsExpressCrud', { id: actualEventExpress?._id })
                }
              />
            </View>
          )}
        </ScrollView>
        <Modal
          isVisible={qr !== ''}
          onBackButtonPress={HandleCloseModal}
          onBackdropPress={HandleCloseModal}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          backdropOpacity={0.7}
        >
          <View style={mainStyles.mainContainer}>
            <View style={mainStyles.containerQr}>
              <QRCode
                value={qr}
                size={Dimensions.get('screen').width * 0.8}
                bgColor="black"
                fgColor="white"
              />
            </View>
          </View>
        </Modal>
      </>
    </LayoutScreen>
  )
}

export default React.memo(EventExpress)
