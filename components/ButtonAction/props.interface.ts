import { EvaStatus } from '@ui-kitten/components/devsupport'
import { ViewStyle } from 'react-native'

export interface IProps {
  text: string
  mode?: 'dark' | 'light'
  status?: EvaStatus
  onPress: () => void
  styles?: ViewStyle
  disabled?: boolean
  white?: boolean
  width?: number | string
  stylesContainer?: ViewStyle
  icon?: string
  RenderIcon?: any
  flexStart?: boolean
}
