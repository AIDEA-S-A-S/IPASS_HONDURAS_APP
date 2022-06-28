import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import contactsScreen from 'screens/contactos'
import ModalCrudContact from 'screens/contactos/ModalCrudContact'
import { ContactsParamList } from 'types'

const ContactsStack = createStackNavigator<ContactsParamList>()

function Contacts({ navigation }: StackScreenProps<any>) {
  const colorScheme = useColorScheme()

  return (
    <ContactsStack.Navigator>
      <ContactsStack.Screen
        name="ContactosScreen"
        component={contactsScreen}
        options={{
          //   headerStatusBarHeight: headerHeight,
          headerTitle: 'Contactos',
          headerShown: false
          //   headerRight: () => <UserProfile white={true} navigation={navigation} />
        }}
      />
      <ContactsStack.Screen
        name="ContactCrud"
        component={ModalCrudContact}
        options={{
          // headerShown: false,
          headerTitle: ' ',
          headerBackTitle: 'Volver',
          headerTintColor: Colors[colorScheme]['color-primary-500']
          // headerLeftContainerStyle:{color}
        }}
      />
    </ContactsStack.Navigator>
  )
}

export default React.memo(Contacts)
