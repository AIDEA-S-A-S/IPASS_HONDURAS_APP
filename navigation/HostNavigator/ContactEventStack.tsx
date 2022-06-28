import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import contacto from 'screens/contactos/contacto'
import EventsContact from 'screens/contactos/EventsContact'
import Verification from 'screens/contactos/Verification'
import { ContactEventParamList } from 'types'

const StackContactEvent = createNativeStackNavigator<ContactEventParamList>()

export default function ContactEventStack({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackContactEvent.Navigator initialRouteName="Contact" screenOptions={{ headerShown: false }}>
      <StackContactEvent.Screen
        name="Contact"
        component={contacto}
        initialParams={{ contact: route?.params?.contact }}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerTitle: 'Evento',
          headerShown: false
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackContactEvent.Screen
        name="EventContact"
        component={EventsContact}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackContactEvent.Screen
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
    </StackContactEvent.Navigator>
  )
}
