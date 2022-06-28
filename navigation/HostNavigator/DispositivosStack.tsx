import React from 'react'
import useColorScheme from 'hooks/useColorScheme'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { DispositivosParamList } from 'types'
import DispositivosScreen from '../../screens/Dispositivos'
import ModalCrudDispositivo from 'screens/Dispositivos/ModalCrudDispositivo'
import Colors from 'constants/Colors'

const DispositivosStack = createStackNavigator<DispositivosParamList>()

function Dispositivo({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <DispositivosStack.Navigator>
      <DispositivosStack.Screen
        name="Dispositivo"
        component={DispositivosScreen}
        options={{
          headerShown: false
        }}
      />
      <DispositivosStack.Screen
        name="DispositivoCrud"
        component={ModalCrudDispositivo}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </DispositivosStack.Navigator>
  )
}

export default React.memo(Dispositivo)
