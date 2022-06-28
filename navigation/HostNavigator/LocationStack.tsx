import React from 'react'
import useColorScheme from 'hooks/useColorScheme'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { LocationsParamList } from 'types'
import LocationsScreen from '../../screens/Locaciones'
import ModalCrudLocation from 'screens/Locaciones/ModalCrudLocation'
import Colors from 'constants/Colors'

const LocationsStack = createStackNavigator<LocationsParamList>()

function Locations({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <LocationsStack.Navigator>
      <LocationsStack.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          headerShown: false
        }}
      />
      <LocationsStack.Screen
        name="LocationCrud"
        component={ModalCrudLocation}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </LocationsStack.Navigator>
  )
}

export default React.memo(Locations)
