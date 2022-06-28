import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import GenerateQR from 'screens/GenerateQR'
import Profile from 'screens/Profile'
import Verification from 'screens/Verification'
import { ProfileParamList } from 'types'

const StackProfile = createNativeStackNavigator<ProfileParamList>()

export default function ProfileNavigator({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackProfile.Navigator initialRouteName="profile" screenOptions={{ headerShown: false }}>
      <StackProfile.Screen
        name="profile"
        component={Profile}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerTitle: 'Perfil'
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackProfile.Screen
        name="Verification"
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
      <StackProfile.Screen
        name="QR"
        component={GenerateQR}
        options={{
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500'],
          headerShown: true
        }}
      />
    </StackProfile.Navigator>
  )
}
