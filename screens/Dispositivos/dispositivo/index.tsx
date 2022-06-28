import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getDeviceById } from 'services/device'
import { delEvent } from 'services/events'
import { IDevice, User } from 'types/types'
import styles from './styles'

const Dispositivo = ({ navigation, route }: StackScreenProps<any>) => {
  //#region  hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region provider
  const { user } = useAuth()
  //#endregion provider

  //#region states
  const [data, setData] = useState<IDevice>()
  const [loading, setLoading] = useState(true)
  //#endregion states

  //#region effect

  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region effect
  const getData = async () => {
    setLoading(true)
    try {
      const device = await getDeviceById(route?.params?.device?._id)
      // const guests = await getAllInvitationByEvent(route?.params?.event?._id)
      setData(device)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //#endregion effect
  const askToDelete = () => {
    Alert.alert(`¿Deseas eliminar el dispositivo ${data?.name}?`, ' ', [
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
      await delEvent({ _id: data?._id as string })
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LayoutScreen
      styleStatusBar="light"
      loading={loading}
      navigation={navigation}
      title={`Equipo: ${data?.name} `}
    >
      <>
        <View style={styles.container}>
          <View
            style={{
              ...styles.containerConent
            }}
          >
            {/* <TextToShowData title={'Nombre'} text={data?.name} /> */}
            <TextToShowData title={'Tipo de equipo'} text={data?.type} />
            {/* <TextToShowData title={'Tipo de locación'} text={data?.device} /> */}
            <TextToShowData title={'Número de serial'} text={data?.serialNumber} />

            <TextToShowData
              title={'Mostrar video'}
              Icon={
                data?.enableVideo ? (
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
            <TextToShowData
              title={'Respuestas habilitadas'}
              Icon={
                data?.enableTalk ? (
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
          </View>
          {(user as User).privilegeID?.name === 'Super_admin' && (
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
                onPress={() => navigation.navigate('DispositivoCrud', { id: data?._id })}
              />
            </View>
          )}
        </View>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Dispositivo)
