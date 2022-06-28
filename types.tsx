/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IDevice, IMasterLocation } from 'types/types'
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  Login: undefined
  Verify: undefined
  QR: undefined
  // Evento: undefined
  EventoScreen: undefined
  ProfileScreen: undefined
  Locacion: undefined
  Device: undefined
  InvitadosEvento: undefined
  ContactScreen: { contact: any } | undefined
  MasterLocationScreen: undefined
  UserScreen: undefined
  Worker: undefined
  GroupLocation: undefined
  EventoExpressScreen: undefined
  BoardScreen: { screen: any } | undefined
}

export type MasterLocationParamList = {
  MasterLocations: undefined
  MasterLocationCrud: { _id?: string } | undefined
}

export type RootMasterLocationsScreenPros<Screen extends keyof MasterLocationParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MasterLocationParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type MasterLocationScreenParamList = {
  MasterLocation: { location: any } | undefined
  LocationsMasterLocations: { masterLocation: IMasterLocation } | undefined
  // EventContact: { events: any } | undefined
  // VerificationInfoContact: { contact: any } | undefined
}

export type RootMasterLocationScreenProp<Screen extends keyof MasterLocationScreenParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MasterLocationScreenParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type ProfileParamList = {
  profile: undefined
  Verification: undefined
  NotFound: undefined
  QR: undefined
}

export type ContactEventParamList = {
  Contact: { contact: any } | undefined
  EventContact: { events: any } | undefined
  VerificationInfoContact: { contact: any } | undefined
}

export type EventosInfoParamList = {
  Evento: { event: any } | undefined
  InvitadosEvento: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>
export type BottomTabParamList = {
  masterLocation: undefined
  Eventos: undefined
  Locaciones: undefined
  Contactos: undefined
  Dispositivos: undefined
  ['Consultas y reportes']: undefined
  ['Lista de usuario']: undefined
  ['Gestión de usuarios']: undefined
  Board: undefined
  eventsExpress: undefined
}

export type RootTabParamList = {
  masterLocation: undefined
  Eventos: undefined
  Locaciones: undefined
  Contactos: undefined
  Dispositivos: undefined
  ['Consultas y reportes']: undefined
  ['Lista de usuario']: undefined
  ['Gestión de usuarios']: undefined
  BoardScreen: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type BoardParamList = {
  Board: undefined
  FeedIncumplimiento: undefined
}

export type BoardsScreenProps<Screen extends keyof BoardParamList> = CompositeScreenProps<
  BottomTabScreenProps<BoardParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type EventsParamList = {
  EventosScreen: { id?: string } | undefined
  Evento: undefined
  EventoCrud: { id?: string } | undefined
}

export type RootEventsScreenProps<Screen extends keyof EventsParamList> = CompositeScreenProps<
  BottomTabScreenProps<EventsParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type LocationsParamList = {
  Locations: undefined
  LocationCrud: { id?: string } | undefined
}

export type RootLocationsScreenProps<Screen extends keyof LocationsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<LocationsParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type DispositivosParamList = {
  DispositivosScreen: { id?: string } | undefined
  Dispositivo: { device?: IDevice }
  DispositivoCrud: { id?: string } | undefined
}

export type RootDispositivosScreenProps<Screen extends keyof DispositivosParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DispositivosParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type ContactsParamList = {
  ContactosScreen: undefined
  Contact: undefined
  ContactCrud: { id?: string; data?: any } | undefined
}

export type RootContactsScreenProps<Screen extends keyof ContactsParamList> = CompositeScreenProps<
  BottomTabScreenProps<ContactsParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type EventsExpressParamList = {
  EventosExpress: undefined
  EventoExpress: { id?: string } | undefined
  EventsExpressCrud: { id?: string } | undefined
}

export type EventExpressVerificationParamList = {
  EventoExpress: { id?: string } | undefined
  VerificationInfoContact: { contact: any } | undefined
}

export type RootEventsExpressScreenProps<Screen extends keyof EventsExpressParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<EventsExpressParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >

export type UserParamList = {
  Users: undefined
  UserCrud: { _id?: string } | undefined
}

export type RootUserScreenProps<Screen extends keyof UserParamList> = CompositeScreenProps<
  BottomTabScreenProps<UserParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type PropsLayoutCrud = {
  children?: JSX.Element
  title: string
  loading?: boolean
}
