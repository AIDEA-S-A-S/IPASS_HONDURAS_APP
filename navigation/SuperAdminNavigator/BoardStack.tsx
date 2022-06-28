import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import Board from 'screens/Board'
import FeedIncumplimiento from 'screens/Board/FeedIncumplimiento'
import { BoardParamList } from 'types'

const StackBoard = createNativeStackNavigator<BoardParamList>()

export default function BoardStack({ route }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <StackBoard.Navigator initialRouteName="Board" screenOptions={{ headerShown: false }}>
      <StackBoard.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: false
        }}
      />
      <StackBoard.Screen
        name="FeedIncumplimiento"
        component={FeedIncumplimiento}
        options={{
          // headerStatusBarHeight: headerHeight,
          headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
    </StackBoard.Navigator>
  )
}
