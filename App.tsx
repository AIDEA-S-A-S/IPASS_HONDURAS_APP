import * as eva from '@eva-design/eva'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import ToastCustom from 'components/ToastCustom'
import { $security } from 'config'
import Colors from 'constants/Colors'
import JWT from 'expo-jwt'
import { StatusBar } from 'expo-status-bar'
import { setToken } from 'graphql/config'
import 'moment/locale/es'
import { AuthProvider } from 'providers/AuthContext'
import { DataProvider } from 'providers/DataContext'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import * as Notifications from 'expo-notifications'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  const notificationListener = React.useRef<any>()
  const responseListener = React.useRef<any>()

  const [isLogin, setIsLogin] = useState(false)
  const [ready, setReady] = useState(false)
  const [toVerifyContact, setToVerifyContact] = useState<any>()
  const [toEventExpress, setToEventExpress] = useState<any>()
  const [notiIncumplimiento, setNotiIncumplimiento] = useState(false)

  useEffect(() => {
    if (isLoadingComplete) {
      // AsyncStorage.multiRemove(['user', 'permissions', 'token', 'worker'])
      init()
    }
  }, [isLoadingComplete])

  React.useEffect(() => {
    // // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationResponseReceivedListener(
      async response => {
        const data = response?.notification?.request?.content?.data
        if (data) {
          if (data.contact) {
            setToVerifyContact(data.contact)
          }
          if (data.eventExpress) {
            setToEventExpress(data.eventExpress)
          }
          if (data.incumplimiento) {
            setNotiIncumplimiento(true)
          }
        }
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener as any)
      Notifications.removeNotificationSubscription(responseListener as any)
    }
  }, [])

  const init = async () => {
    await verifyToken()
    setReady(true)
  }

  const verifyToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        const data = JWT.decode(token, $security.secretKey)
        if (data.data) {
          setToken(token)
          setIsLogin(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toastConfig = {
    error: ({ text1, text2 }: any) => <ToastCustom type="error" text1={text1} text2={text2} />,
    success: ({ text1, text2 }: any) => <ToastCustom type="success" text1={text1} text2={text2} />,
    info: ({ text1, text2 }: any) => <ToastCustom type="info" text1={text1} text2={text2} />
  }

  if (!ready) {
    return null
  } else {
    eva?.mapping
    return (
      <SafeAreaProvider>
        <DataProvider>
          <AuthProvider isLogin={isLogin} setIsLogin={setIsLogin}>
            {/* @ts-ignore */}
            <ApplicationProvider
              {...eva}
              // @ts-ignore
              theme={colorScheme === 'light' ? Colors.light : Colors.dark}
            >
              <IconRegistry icons={EvaIconsPack} />
              <Navigation
                setNotiIncumplimiento={setNotiIncumplimiento}
                setToEventExpress={setToEventExpress}
                setToVerifyContact={setToVerifyContact}
                toEventExpress={toEventExpress}
                colorScheme={colorScheme}
                toVerifyContact={toVerifyContact}
                notiIncumplimiento={notiIncumplimiento}
              />
              <StatusBar />
              <Toast config={toastConfig} />
            </ApplicationProvider>
          </AuthProvider>
        </DataProvider>
      </SafeAreaProvider>
    )
  }
}
