import React, { useContext, useEffect, useState } from 'react'
import { getPrivileges, getSections } from 'services/data'
import { Privilege, Sections } from '../types/types'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { ActivityIndicator, Alert, Platform, StyleSheet } from 'react-native'
import * as Contacts from 'expo-contacts'
import * as ImagePicker from 'expo-image-picker'
import { View } from 'components/Themed'
import { windowsHeight, windowsWidth } from 'constants/deviceInfo.constants'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import * as Notifications from 'expo-notifications'

type DataContext = {
  privilege: Privilege[]
  section: Sections[]
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  loading: boolean
  tokenExpo: string
}

const DataContext = React.createContext<DataContext>({} as DataContext)

export const DataProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props

  //states
  const [privilege, setPrivilege] = useState<Privilege[]>([])
  const [section, setSection] = useState<Sections[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [tokenExpo, setTokenExpo] = useState('')

  const colorScheme = useColorScheme()

  useEffect(() => {
    ;(async () => {
      const token = await Notifications.getExpoPushTokenAsync()
      setTokenExpo(token.data)
      const contacts = await Contacts.getPermissionsAsync()
      const camera = await BarCodeScanner.getPermissionsAsync()
      const files = await ImagePicker.getMediaLibraryPermissionsAsync()
      const noti = await Notifications.getPermissionsAsync()
      if (!noti.granted) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'Bienvenida/o',
            'Te pedimos que nos autorices a enviarte notificaciones. Esto es para que puedas recibir notificaciones de las acciones que realices tu y los demas usuarios en IPASS RENAP +.',
            [
              {
                text: 'Habilitar',
                onPress: async () => {
                  await Notifications.requestPermissionsAsync()
                }
              }
            ]
          )
        } else {
          await Notifications.requestPermissionsAsync()
        }
      }
      if (!camera.granted) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'Bienvenida/o',
            'Para poder usar las funcionalidades de lectura QR y lectura de documento se requieren habilitar la camara para su uso.',
            [
              {
                text: 'Habilitar',
                onPress: async () => {
                  await BarCodeScanner.requestPermissionsAsync()
                }
              }
            ]
          )
        } else {
          await BarCodeScanner.requestPermissionsAsync()
        }
      }
      if (!contacts.granted) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'Bienvenida/o',
            'Para poder importar tus contactos, requerimos los permisos necesario.',
            [
              {
                text: 'Habilitar',
                onPress: async () => {
                  await Contacts.requestPermissionsAsync()
                }
              }
            ]
          )
        } else {
          await Contacts.requestPermissionsAsync()
        }
      }
      if (!files.granted) {
        if (Platform.OS === 'android') {
          Alert.alert(
            'Bienvenida/o',
            'Para poder usar las funcionalidades de lectura de documento se requieren habilitar los permisos de almacenamiento para su uso.',
            [
              {
                text: 'Habilitar',
                onPress: async () => {
                  await ImagePicker.requestMediaLibraryPermissionsAsync()
                }
              }
            ]
          )
        } else {
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        }
      }
    })()
  }, [])
  //effect
  useEffect(() => {
    getData()
  }, [])

  //functions
  const getData = async () => {
    try {
      setPrivilege(await getPrivileges())
      setSection(await getSections())
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <DataContext.Provider value={{ loading, setLoading, privilege, section, tokenExpo }}>
      {children}
      {loading && (
        <View
          style={{
            ...styles.loadingContainer,
            backgroundColor: Colors[colorScheme].backgroundLoading
          }}
        >
          <ActivityIndicator size="large" color={Colors[colorScheme].text} />
        </View>
      )}
    </DataContext.Provider>
  )
}

export default function useData() {
  return useContext(DataContext)
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    width: windowsWidth,
    height: windowsHeight,
    position: 'absolute',
    zIndex: 50000,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
