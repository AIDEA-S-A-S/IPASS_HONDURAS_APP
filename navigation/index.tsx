import {
  createNavigationContainerRef,
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { ColorSchemeName } from 'react-native'
import dispositivo from 'screens/Dispositivos/dispositivo'
import GenerateQR from 'screens/GenerateQR'
import locacion from 'screens/Locaciones/locacion'
import User from 'screens/users/User'
import Verify from 'screens/Verify'
import Worker from 'screens/Worker'
import GrupoLocations from 'screens/Worker/GrupoLocations'
import { Privilege } from 'types/types'
import Loading from '../screens/Loading'
import Login from '../screens/Login'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import Admin from './Admin'
import HostNavigator from './HostNavigator'
import ContactEventStack from './HostNavigator/ContactEventStack'
import StackEventoInfoNavigator from './HostNavigator/EventoInfoNavigarot'
import LinkingConfiguration from './LinkingConfiguration'
import ProfileNavigator from './ProfileConfigStack'
import SuperAdminNavigator from './SuperAdminNavigator'
import MasterLocationScreenStack from './SuperAdminNavigator/MasterLocationScreenStack'
import SuperAnfitrionNavigator from './SuperAnfitrionNavigator'
import EventExpressVerification from './SuperAnfitrionNavigator/EventExpressVerification'

export default function Navigation({
  colorScheme,
  toVerifyContact,
  toEventExpress,
  notiIncumplimiento,
  setNotiIncumplimiento,
  setToEventExpress,
  setToVerifyContact
}: {
  colorScheme: ColorSchemeName
  toVerifyContact?: any
  toEventExpress?: any
  notiIncumplimiento?: boolean
  setToVerifyContact: React.Dispatch<any>
  setToEventExpress: React.Dispatch<any>
  setNotiIncumplimiento: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { isAuthenticated, permissions, worker } = useAuth()

  const navigationRef = createNavigationContainerRef()

  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (toVerifyContact && ready) {
      navigationRef?.navigate('ContactScreen', { contact: { _id: toVerifyContact } })
      setToVerifyContact(undefined)
    }
  }, [ready, toEventExpress])

  useEffect(() => {
    if (notiIncumplimiento && ready) {
      navigationRef?.navigate('BoardScreen', { screen: 'FeedIncumplimiento' })
      setNotiIncumplimiento(false)
    }
  }, [ready, notiIncumplimiento])

  useEffect(() => {
    if (toEventExpress && ready) {
      // @ts-ignore
      navigationRef?.navigate('EventoExpressScreen', {
        screen: 'EventoExpress',
        params: { event: { _id: toEventExpress } }
      })
      setToEventExpress(undefined)
    }
  }, [ready, toEventExpress])

  useEffect(() => {
    if (navigationRef.isReady()) {
      setReady(true)
    }
  }, [navigationRef])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      ref={navigationRef}
    >
      <RootNavigator worker={worker} isAuthenticated={isAuthenticated} permissions={permissions} />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createNativeStackNavigator<RootStackParamList>()
const values = {
  Super_admin: (
    <>
      <Stack.Screen name="Root" component={SuperAdminNavigator} />
      <Stack.Group screenOptions={{ presentation: 'formSheet' }}>
        <Stack.Screen
          name="MasterLocationScreen"
          component={MasterLocationScreenStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Locacion"
          component={locacion}
          options={{
            // headerStatusBarHeight: headerHeight,
            headerTitle: 'Locacion',
            headerShown: false
            // headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
        <Stack.Screen
          name="UserScreen"
          component={User}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactEventStack}
          options={{
            //   headerStatusBarHeight: headerHeight,
            headerTitle: 'Contacto'
            //   headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
      </Stack.Group>
    </>
  ),
  admin: (
    <>
      <Stack.Screen name="Root" component={Admin} />
      <Stack.Group screenOptions={{ presentation: 'formSheet' }}>
        <Stack.Screen
          name="ContactScreen"
          component={ContactEventStack}
          options={{
            //   headerStatusBarHeight: headerHeight,
            headerTitle: 'Contacto'
            //   headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
        <Stack.Screen
          name="EventoExpressScreen"
          component={EventExpressVerification}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EventoScreen"
          component={StackEventoInfoNavigator}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="UserScreen"
          component={User}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Locacion"
          component={locacion}
          options={{
            // headerStatusBarHeight: headerHeight,
            headerTitle: 'Locacion',
            headerShown: false
            // headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
        <Stack.Screen
          name="Device"
          component={dispositivo}
          options={{
            // headerStatusBarHeight: headerHeight,
            headerTitle: 'Dispositivo',
            headerShown: false
            // headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
      </Stack.Group>
    </>
  ),
  super_anfitrion: (
    <>
      <Stack.Screen name="Root" component={SuperAnfitrionNavigator} />
      <Stack.Group screenOptions={{ presentation: 'formSheet' }}>
        <Stack.Screen
          name="EventoExpressScreen"
          component={EventExpressVerification}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactEventStack}
          options={{
            //   headerStatusBarHeight: headerHeight,
            headerTitle: 'Contacto'
            //   headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
      </Stack.Group>
    </>
  ),
  host: (
    <>
      <Stack.Screen name="Root" component={HostNavigator} />
      <Stack.Group screenOptions={{ presentation: 'formSheet' }}>
        <Stack.Screen
          name="EventoScreen"
          component={StackEventoInfoNavigator}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="EventoExpressScreen"
          component={EventExpressVerification}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ContactScreen"
          component={ContactEventStack}
          options={{
            //   headerStatusBarHeight: headerHeight,
            headerTitle: 'Contacto'
            //   headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
        <Stack.Screen
          name="Locacion"
          component={locacion}
          options={{
            // headerStatusBarHeight: headerHeight,
            headerTitle: 'Locacion',
            headerShown: false
            // headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
        <Stack.Screen
          name="Device"
          component={dispositivo}
          options={{
            // headerStatusBarHeight: headerHeight,
            headerTitle: 'Dispositivo',
            headerShown: false
            // headerRight: () => <UserProfile white={true} navigation={navigation} />
          }}
        />
      </Stack.Group>
    </>
  )
}

function RootNavigator({
  isAuthenticated,
  permissions,
  worker
}: {
  isAuthenticated: boolean
  permissions?: Privilege
  worker?: boolean
}) {
  const colorScheme = useColorScheme()
  return (
    <Stack.Navigator
      initialRouteName={!isAuthenticated ? 'Login' : 'Root'}
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Verify" component={Verify} />
        </>
      ) : (
        <>
          {!worker ? (
            permissions ? (
              <>
                {values[(permissions as Privilege)?.name]}
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileNavigator}
                    options={{ headerTitle: 'Perfil', headerShown: false }}
                  />
                </Stack.Group>
              </>
            ) : (
              <Stack.Screen
                name="Root"
                component={Loading}
                options={{ headerTitle: 'Perfil', headerShown: false }}
              />
            )
          ) : (
            <>
              <Stack.Screen
                name="Worker"
                component={Worker}
                options={{ headerShown: false }}
              ></Stack.Screen>
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                  name="ProfileScreen"
                  component={ProfileNavigator}
                  options={{ headerTitle: 'Perfil', headerShown: false }}
                />
                <Stack.Screen
                  name="QR"
                  component={GenerateQR}
                  options={{
                    headerTitle: ' ',
                    headerBackTitle: 'Volver',
                    headerTintColor: Colors[colorScheme]['color-primary-500'],
                    headerShown: true
                  }}
                />
                <Stack.Screen
                  name="GroupLocation"
                  component={GrupoLocations}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            </>
          )}
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      )}
    </Stack.Navigator>
  )
}
