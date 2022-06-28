import { Moment } from 'moment'
import { Document } from 'mongoose'
import { basicTable } from './typeTemplate'

export interface User extends DocumentNode, basicTable {
  password?: string
  photo?: fileType
  name?: string
  lastname?: string
  email?: string
  privilegeID?: Privilege
  active?: boolean
  tokenExpo?: string
  token?: string
  isActive?: string
  rolName?: string
  canCreateHost: boolean
  allEventWithAuth: boolean
  verifyLogin?: boolean
  lang?: string
  canAccessToApp?: boolean
  canAccessToWeb: ?boolean
  canUseAuthenticator?: boolean
  document: string
  typeDocument: string
  code?: boolean
  phone?: string
  QR?: string
  termporal_Qr?: IWorker_qr_temporal
  group: IGroupWorker[]
  banFinish: string
}

export type typeAuthContext = {
  user: User | IWorker | undefined
  isAuthenticated: boolean
  login: (token: string, worker?: boolean) => void
  logout: () => void
  permissions: Privilege | undefined
  worker?: boolean
  refetchWorker: () => Promise<void>
}

export interface userSecurity extends DocumentNode, basicTable {
  user: User
  hasLocation: true
}

export interface iUserForm extends User {
  confirmPassword?: string
}

export type Privilege = {
  _id?: string
  key?: string
  name: privilegeName
  createdAt?: Date
  UpdatedAt?: Date
  permissions?: PermissionsPrivilege[]
}

export type privilegeName = 'Super_admin' | 'admin' | 'host' | 'super_anfitrion'

export type PermissionsPrivilege = {
  sectionID?: Sections['_id']
  read?: boolean
  create?: boolean
  delete?: boolean
  update?: boolean
  canRead?: boolean
  canCreate?: boolean
  canDelete?: boolean
  canUpdate?: boolean
  sectionName?: string
}

export type Sections = {
  _id: string
  name: string
  description: string
  createdAt: Date
  UpdatedAt: Date
}

export type HistoryAction = {
  userId: User['_id']
  action: string
  createdAt: string
  updatedAt: string
}

export type TableProps = {
  data?: any[]
  columns: any[]
  loading?: boolean
}

export type LayoutProps = {
  children: JSX.Element
  title: string
}

//User Secction

export type ButtonsCrudProps = {
  titleCreate?: string
  functionCreate?: () => void
}
export interface IEvent extends Document, basicTable {
  name: string
  start: string | Moment
  host?: User
  end: string | Moment
  location: ILocation
  onlyAuthUser: boolean | string
  beforeStart: number
  guestNumber: number
  invitations: [InvitationEvent]
}

export interface ILocationAttempt extends Document, basicTable {
  authenticated: boolean
  user: IUser
  contact: IContact
  attempts: number
  location: ILocation
  createdAt?: Date
  updatedAt?: Date
}

export interface InvitationEvent extends Document, basicTable {
  event?: IEvent | string
  contact?: IContact | string
  confirmed?: boolean
  hourIn?: string
  location?: ILocation
  isIn?: boolean
  alreadySendInvitation?: boolean
}

export interface IContact extends Document, basicTable {
  firstName?: string
  lastName?: string
  email?: string
  DPI: string
  phone?: string
  indicativo?: string
  host?: User | string
  nickname?: string
  verified?: boolean
  askVerification?: boolean | string
  verifiedData?: verifiedData
  verifiedDataPDF?: verifiedDataPDF
  banFinish?: string
  ban?: boolean
  disabled?: boolean
}

export type verifiedDataPDF = {
  photo?: fileType
  documentA?: fileType
  documentB?: fileType
  num1?: string
  type?: string
  name?: string
  expedition?: string
  expiration?: string
  licNum?: string
  num2?: string
}

export type ReadedMRZ = {
  birthDate?: string
  expirationDate?: string
  sex?: string
  firstName?: string
  lastName?: string
  nationality?: string
  documentNumber?: string
}

export type ReadedPDF = {
  num1?: string
  type?: string
  name?: string
  expedition?: string
  expiration?: string
  licNum?: string
  num2?: string
}

export type fileType = {
  filename: string
  key: string
}

export type verifiedData = {
  photo?: fileType
  documentA?: fileType
  documentB?: fileType
  birthDate?: string
  expirationDate?: string
  sex?: string
  lastName?: string
  firstName?: string
  nationality?: string
  documentNumber?: string
}

export interface IMasterLocation extends Document, basicTable {
  name: string
  address: string
  location: ILocation[] | string[]
  onlyAllowAuthUSers: boolean
}

export interface LocationEntries extends Document, basicTable {
  event: IEvent | string
  contact: IContact | string
  location: ILocation | string
  hourIn: string
}

export interface ILocation extends Document, basicTable {
  state: string
  masterLocation: IMasterLocation | string
  childLocations: String[] | ILocation[]
  parentLocations: String[] | ILocation[]
  address: string
  name: string
  admins: IUser[] | string[]
  operation?: operation
  typeCheck: typeCheck
  device: IHistoryDevice
  host: IUser[] | string[]
  security: IUser[] | string[]
}
export interface IHistoryDevice extends Document, basicTable {
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  actualLocation: ILocation
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
  whoDeleted: IUser | string
  deletedDate: string
  origID: string
}
export interface IDevice extends Document, basicTable {
  name: string
  type: typeDevice
  serialNumber: string
  status: statusDevice
  actualLocation: ILocation
  enableVideo: boolean
  enableTalk: boolean
  timeWait: number
}

export type typeLocation = 'classic' | 'touch'

export type graphqlErrors = {
  graphQLErrors: string
  networkError: string
  message: string
  extraInfo: string
}

export interface IGroupWorker extends Document, basicTable {
  name: string
  locations: ILocation[]
  abbreviation: string
  exists: boolean
}

export interface IWorker extends Document, basicTable {
  name?: string
  lastname?: string
  email?: string
  // privilegeID?: IPrivilege
  active?: boolean
  photo?: fileType
  code?: boolean
  createdAt?: Date
  updatedAt?: Date
  QR: string
  temporal_Qr: IWorker_qr_temporal
  phone: string
  nativeLocation: ILocation[]
  group: IGroupWorker[]
  canAccessToApp?: boolean
  canAccessToWeb: ?boolean
  canUseAuthenticator?: boolean
  banFinish: string
}

export interface IWorker_qr_temporal extends Document, basicTable {
  QR: string
  timeEnd: string
  used: boolean
  valid: boolean
  location: ILocation
}

export interface IGroupWorker extends Document {
  name: string
  location: ILocation[]
  exists: boolean
}

export interface Paginated<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  offset: number
  prevPage: number
  nextPage: number
}

export interface IEventExpress extends Document, basicTable {
  name: string
  host: User | string
  start: string | Date
  end: string | Date
  location: ILocation | string
  state: string
  contact: IContact | string
  motivo: string
  authorizedBy: IUser | string
  hourIn: string | Date
  hourOut: string | Date
  invitados: IContact[] | string[]
}

export interface IBreach extends Document, basicTable {
  grade: string
  location: ILocation
  status: string
  worker: IWorker
  user: IUser
  contact: IContact
  createdAt?: Date
  updatedAt?: Date
}
export interface ILocationEntries extends Document, basicTable {
  event: IEvent | string
  contact: IContact | string
  location: ILocation | string
  hourIn: string
  eventExpress: IEventExpress | string
  hourOut: string
  host: IUser | string
  worker: IWorker | string
  typeQr: typeQr
  user: IUser | string
  // Residente, invitado, visitante
  type: typeUser
  // visitantData: visitantData
}

export interface iLocationAttemptAnalythics extends Document, basicTable {
  dataCumpIncp: DataCumpIncp[]
  dataEvents: DataEvents[]
}
