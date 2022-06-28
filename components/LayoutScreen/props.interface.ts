import { StatusBarStyle } from 'expo-status-bar'

export type iProps = {
  children?: JSX.Element
  withoutSafeArea?: boolean
  title: string
  filter?: boolean
  actionFilter?: () => void
  createAction?: () => void
  welcome?: boolean
  navigation: any
  header?: boolean
  loading?: boolean
  centerTitle?: boolean
  styleStatusBar?: StatusBarStyle
}
