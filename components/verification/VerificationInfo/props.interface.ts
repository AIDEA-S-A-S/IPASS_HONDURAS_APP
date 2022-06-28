import { StackNavigationProp } from '@react-navigation/stack'
import { IContact, verifiedData, verifiedDataPDF } from 'types/types'

export interface IProps {
  data?: verifiedData | verifiedDataPDF
  images: { photo: string; documentA: string; documentB: string }
  HideButtonsContact?: boolean
  toAccept?: boolean
  verify?: () => void
  associateContact?: (contact: IContact) => Promise<void>
  navigation?: StackNavigationProp<any, string | number | symbol>
  passport?: boolean
  verificationRegistro?: boolean
}
