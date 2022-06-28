import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import Verification from 'screens/contactos/Verification'
import EventExpress from 'screens/EventsExpress/EventExpress'
import { EventExpressVerificationParamList } from 'types'

const StackEvenExpressVerification = createNativeStackNavigator<EventExpressVerificationParamList>()

export default function EventExpressVerification({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackEvenExpressVerification.Navigator
      initialRouteName="EventoExpress"
      screenOptions={{ headerShown: false }}
    >
      <StackEvenExpressVerification.Screen
        name="EventoExpress"
        component={EventExpress}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerTitle: 'Evento',
          headerShown: false
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackEvenExpressVerification.Screen
        name="VerificationInfoContact"
        component={Verification}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
    </StackEvenExpressVerification.Navigator>
  )
}
