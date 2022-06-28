//React
//Icons
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomBottomTab from 'components/CustomBottomTab'
import ContactStack from 'navigation/HostNavigator/ContactStack'
import * as React from 'react'
import { Platform } from 'react-native'
//Colors
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
//Types
import { BottomTabParamList } from '../../types'
import EventsExpressStack from './EventsExpressStack'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="eventsExpress"
      {...(Platform.OS === 'ios' && { tabBar: props => <CustomBottomTab {...props} /> })}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tintActive,
        tabBarInactiveTintColor: Colors[colorScheme].tinteInactive,
        tabBarStyle: {
          borderTopColor: 'transparent',
          backgroundColor: 'transparent',
          elevation: 0
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <BottomTab.Screen
        name="eventsExpress"
        component={EventsExpressStack}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />,
          tabBarLabel: 'Eventos Express'
        }}
      />
      <BottomTab.Screen
        name="Contactos"
        component={ContactStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="card-account-phone-outline" size={24} color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}
