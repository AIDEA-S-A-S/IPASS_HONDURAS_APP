import { FormFactory } from '../formTypes'

export interface IProps {
  value: any
  onChange: (value: any) => void
  element: FormFactory.FormFactoryType
  aditionalProps?: any
}
