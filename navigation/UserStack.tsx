import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import users from 'screens/users'
import { UserParamList } from 'types'
import UserCrud from 'screens/users/UserCrud'
import useColorScheme from 'hooks/useColorScheme'
import Colors from 'constants/Colors'

const UserStack = createStackNavigator<UserParamList>()

function Users({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Users"
        component={users}
        options={{
          headerShown: false,
          headerTitle: 'Gestión de usuarios'
        }}
      />
      <UserStack.Screen
        name="UserCrud"
        component={UserCrud}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </UserStack.Navigator>
  )
}

export default React.memo(Users)
