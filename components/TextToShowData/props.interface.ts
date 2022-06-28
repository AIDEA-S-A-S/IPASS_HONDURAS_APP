import { ReactNode } from 'react'

export interface IProps {
  text?: string | number
  title?: string
  Icon?: ReactNode
  primary?: boolean
  onPress?: () => void
}
