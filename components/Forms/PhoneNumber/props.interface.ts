import { Control, DeepMap, FieldError } from 'react-hook-form'
import { FormFactory } from '../formTypes'

export interface IProps {
  value: any
  onChange: (value: any) => void
  element: FormFactory.FormFactoryType
  errors: DeepMap<Record<string, any>, FieldError>
  control: Control<Record<string, any>>
}
