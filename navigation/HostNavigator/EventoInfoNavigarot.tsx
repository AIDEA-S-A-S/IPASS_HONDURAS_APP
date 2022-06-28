import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import event from 'screens/events/event'
import Invitados from 'screens/events/Invitados'
import { EventosInfoParamList } from 'types'

const StackEventoInfo = createNativeStackNavigator<EventosInfoParamList>()

export default function StackEventoInfoNavigator({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackEventoInfo.Navigator initialRouteName="Evento" screenOptions={{ headerShown: false }}>
      <StackEventoInfo.Screen
        name="Evento"
        component={event}
        initialParams={{ event: route?.params?.event }}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerTitle: 'Evento',
          headerShown: false
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackEventoInfo.Screen
        name="InvitadosEvento"
        component={Invitados}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
    </StackEventoInfo.Navigator>
  )
}
