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
import { deleteLocationFn, getLocationFn } from 'services/locations'
import { ILocation, User } from 'types/types'
import styles from './styles'

const Locacion = ({ navigation, route }: StackScreenProps<any>) => {
  //#region  hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region provider
  const { user } = useAuth()
  //#endregion provider

  //#region states
  const [actualLocation, setActualLocation] = useState<ILocation>()
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
      const location = await getLocationFn(route?.params?.location?._id)
      // const guests = await getAllInvitationByEvent(route?.params?.event?._id)
      setActualLocation(location)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //#endregion effect

  //#endregion functions

  const askToDelete = () => {
    Alert.alert(`¿Deseas eliminar la locación: ${actualLocation?.name}?`, ' ', [
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
      await deleteLocationFn(actualLocation?._id as string)
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
      title={`Locación: ${actualLocation?.name} `}
    >
      <>
        <View style={styles.container}>
          <View
            style={{
              ...styles.containerConent
            }}
          >
            <TextToShowData title={'Nombre'} text={actualLocation?.name} />
            <TextToShowData title={'Dirección'} text={actualLocation?.address} />
            {/* <TextToShowData title={'Tipo de locación'} text={actualLocation?.device} /> */}
            <TextToShowData
              title={'Número de serial'}
              text={actualLocation?.device?.serialNumber}
            />

            <TextToShowData
              title={'Habilitada'}
              Icon={
                actualLocation?.state === 'enabled' ? (
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
              title={'Mostrar video'}
              Icon={
                actualLocation?.device?.enableVideo ? (
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
                actualLocation?.device?.enableTalk ? (
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
                onPress={() => navigation.navigate('LocationCrud', { id: actualLocation?._id })}
              />
            </View>
          )}
        </View>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Locacion)
