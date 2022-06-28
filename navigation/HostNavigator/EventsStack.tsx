import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { EventsParamList } from 'types'
import useColorScheme from 'hooks/useColorScheme'
import EventsScreen from '../../screens/events'
import ModalCrudEvent from 'screens/events/ModalCrudEvent'
import Colors from 'constants/Colors'

const EventsStack = createStackNavigator<EventsParamList>()

function Events({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <EventsStack.Navigator initialRouteName="EventosScreen">
      <EventsStack.Screen
        name="EventosScreen"
        component={EventsScreen}
        options={{
          headerShown: false
        }}
      />

      <EventsStack.Screen
        name="EventoCrud"
        component={ModalCrudEvent}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </EventsStack.Navigator>
  )
}

export default React.memo(Events)
