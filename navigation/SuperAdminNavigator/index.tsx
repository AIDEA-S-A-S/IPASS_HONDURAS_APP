//React
//Icons
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomBottomTab from 'components/CustomBottomTab'
import UserStack from 'navigation/UserStack'
import * as React from 'react'
import { Platform } from 'react-native'
//Colors
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
//Types
import { RootTabParamList } from '../../types'
import LocationStack from '../HostNavigator/LocationStack'
import BoardStack from './BoardStack'
import MasterLocationStack from './MasterLocationStack'

const BottomTab = createBottomTabNavigator<RootTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="BoardScreen"
      {...(Platform.OS === 'ios' && { tabBar: props => <CustomBottomTab {...props} /> })}
      // tabBar={props => <CustomBottomTab {...props} />}
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
        name="BoardScreen"
        component={BoardStack}
        options={{
          tabBarLabel: 'Tablero de riesgos',
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesign name="barschart" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="masterLocation"
        component={MasterLocationStack}
        options={{
          tabBarLabel: 'Locaciones Maestras',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="building" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Locaciones"
        component={LocationStack}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />
        }}
      />
      {/* <BottomTab.Screen
        name="Contactos"
        component={Contacts}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="card-account-phone-outline" size={24} color={color} />
        }}
      /> */}
      <BottomTab.Screen
        name="Gestión de usuarios"
        component={UserStack}
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}
