//React
//Icons
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomBottomTab from 'components/CustomBottomTab'
import * as React from 'react'
import { Platform } from 'react-native'
//Colors
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
//Types
import { BottomTabParamList } from '../types'
import ContactStack from './HostNavigator/ContactStack'
import EventsStack from './HostNavigator/EventsStack'
import LocationStack from './HostNavigator/LocationStack'
import EventsExpressStack from './SuperAnfitrionNavigator/EventsExpressStack'
import UserStack from './UserStack'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Locaciones"
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
        name="Locaciones"
        component={LocationStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Eventos"
        component={EventsStack}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="calendar" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="eventsExpress"
        component={EventsExpressStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Express',

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-clock" size={24} color={color} />
          )
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
      <BottomTab.Screen
        name="Gestión de usuarios"
        component={UserStack}
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
          tabBarLabel: 'Usuarios'
        }}
      />
    </BottomTab.Navigator>
  )
}
