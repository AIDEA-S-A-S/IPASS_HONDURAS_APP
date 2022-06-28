import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import LocacionesMasterLocation from 'screens/MasterLocations/LocationsMasterLocation'
import MasterLocation from 'screens/MasterLocations/MasterLocation'
import { MasterLocationScreenParamList } from 'types'

const StackMasterLocationScreen = createNativeStackNavigator<MasterLocationScreenParamList>()

export default function MasterLocationScreenStack({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackMasterLocationScreen.Navigator
      initialRouteName="MasterLocation"
      screenOptions={{ headerShown: false }}
    >
      <StackMasterLocationScreen.Screen
        name="MasterLocation"
        component={MasterLocation}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerTitle: 'Evento',
          headerShown: false
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <StackMasterLocationScreen.Screen
        name="LocationsMasterLocations"
        component={LocacionesMasterLocation}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerShown: true,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      {/*<StackMasterLocationScreen.Screen
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
      /> */}
    </StackMasterLocationScreen.Navigator>
  )
}
