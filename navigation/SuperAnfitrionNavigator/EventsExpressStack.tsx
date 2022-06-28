import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import EventsExpress from 'screens/EventsExpress'
import EventsExpressCrud from 'screens/EventsExpress/EventsExpressCrud'
import { EventsExpressParamList } from 'types'

const EventsExpressStack = createStackNavigator<EventsExpressParamList>()

function Contacts({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <EventsExpressStack.Navigator>
      <EventsExpressStack.Screen
        name="EventosExpress"
        component={EventsExpress}
        options={{
          //   headerStatusBarHeight: headerHeight,
          headerShown: false
          //   headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <EventsExpressStack.Screen
        name="EventsExpressCrud"
        component={EventsExpressCrud}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </EventsExpressStack.Navigator>
  )
}

export default React.memo(Contacts)
