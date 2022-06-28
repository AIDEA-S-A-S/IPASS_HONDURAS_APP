import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { View } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { deleteMasterLocationFn, getMasterLocationFn } from 'services/masterLocation'
import { ILocation, IMasterLocation } from 'types/types'
import styles from './styles'

const Locacion = ({ navigation, route }: StackScreenProps<any>) => {
  //#region states
  const [actualMasterLocation, setActualMasterLocation] = useState<IMasterLocation>()
  const [loading, setLoading] = useState(true)
  const [locations, setLocations] = useState<ILocation[]>([])
  //#endregion states

  //#region effect

  useEffect(() => {
    // console.log(route?.params?.location)
    getData()
  }, [])

  //#endregion effect
  //#region effect
  const getData = async () => {
    setLoading(true)
    try {
      const masterLocation = await getMasterLocationFn(route?.params?._id)
      setLocations((masterLocation.location as ILocation[]).filter(e => !!e))
      // console.log(masterLocation)
      // const guests = await getAllInvitationByEvent(route?.params?.event?._id)
      setActualMasterLocation(masterLocation)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //#endregion effect

  //#endregion functions

  const askToDelete = () => {
    Alert.alert(`¿Deseas eliminar la locación maestra: ${actualMasterLocation?.name}?`, ' ', [
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
      await deleteMasterLocationFn({ _id: actualMasterLocation?._id as string })
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
      title={`Locación maestra: ${actualMasterLocation?.name} `}
    >
      <>
        <View style={styles.container}>
          <View
            style={{
              ...styles.containerConent
            }}
          >
            <TextToShowData title={'Nombre'} text={actualMasterLocation?.name} />
            <TextToShowData title={'Dirección'} text={actualMasterLocation?.address} />
            <TextToShowData
              title={'Solo usuarios verificados'}
              Icon={
                actualMasterLocation?.onlyAllowAuthUSers ? (
                  <AntDesign name="checkcircle" size={RFPercentage(2)} color="green" />
                ) : (
                  <AntDesign name="closecircle" size={RFPercentage(2)} color="red" />
                )
              }
            />
            <TextToShowData
              title={'Locaciones asociadas'}
              primary
              text={locations.length}
              {...(locations.length > 0 && {
                onPress: () => {
                  navigation.navigate('LocationsMasterLocations', {
                    masterLocation: actualMasterLocation
                  })
                }
              })}
            />
            {/* <TextToShowData
              title={'Número de serial'}
              text={actualLocation?.device?.serialNumber}
            /> */}
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
              status="primary"
              text="Editar"
              styles={{ flex: 1, marginLeft: 5 }}
              onPress={() =>
                navigation.navigate('MasterLocationCrud', { _id: actualMasterLocation?._id })
              }
            />
          </View>
        </View>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Locacion)
