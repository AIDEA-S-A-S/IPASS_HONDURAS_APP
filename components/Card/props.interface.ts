import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

export interface iProps {
  title: string
  value: string | number
  Icon?: ReactNode
  style?: ViewStyle
}
