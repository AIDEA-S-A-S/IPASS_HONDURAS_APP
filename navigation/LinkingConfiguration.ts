import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { RootStackParamList } from 'types'

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Eventos: {
            screens: {
              Eventos: 'Eventos',
              Evento: 'Evento'
            }
          },
          Locaciones: {
            screens: {
              Locaciones: 'Locaciones'
            }
          },
          Contactos: {
            screens: {
              Contactos: 'Contactos',
              Contacto: 'Contacto'
            }
          },
          ['Consultas y reportes']: {
            screens: {
              ['Consultas y reportes']: 'Consultas y reportes'
            }
          },
          ['Lista de usuario']: {
            screens: {
              ['Lista de usuario']: 'Lista de usuario'
            }
          },
          ['Gestión de usuarios']: {
            screens: {
              ['Gestión de usuarios']: 'Gestión de usuarios'
            }
          }
        }
      },
      NotFound: '*',
      Modal: 'modal',
      Login: 'login',
      QR: 'qr',
      ProfileScreen: 'Profile'
      // Profile: 'Profile',
      // Verification: 'verification'
    }
  }
}

export default linking
