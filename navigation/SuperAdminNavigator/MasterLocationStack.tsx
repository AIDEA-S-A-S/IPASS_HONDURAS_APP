import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import UserProfile from 'navigation/UserProfile'
import MasterLocationScreen from '../../screens/MasterLocations'
import { MasterLocationParamList } from 'types'
import MasterLocationCrud from 'screens/MasterLocations/MasterLocationCrud'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'

const MasterLocationStack = createStackNavigator<MasterLocationParamList>()

function MasterLocation({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <MasterLocationStack.Navigator>
      <MasterLocationStack.Screen
        name="MasterLocations"
        component={MasterLocationScreen}
        options={{
          // headerTitle: 'Locación maestra',
          headerShown: false,

          headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <MasterLocationStack.Screen
        name="MasterLocationCrud"
        component={MasterLocationCrud}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </MasterLocationStack.Navigator>
  )
}

export default React.memo(MasterLocation)
