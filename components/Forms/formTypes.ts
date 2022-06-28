import { Control, DeepMap, FieldError } from 'react-hook-form'

export namespace FormFactory {
  export interface FormFactoryType {
    name: string
    placeholder?: string
    type: typeForm
    showIcon?: boolean
    visible?: boolean
    defaultValue?: any
    opacity?: boolean
    required?: boolean
    adicionalProps?: any
    fullWidth?: boolean
    largeText?: boolean
    label?: boolean
    // Para selector
    lastname?: boolean
    multiple?: boolean
    key?: string
    // DAte
    minDate?: Date
    maxDate?: Date

    data?: any[]
    //para Table
    FormItems?: (update: boolean, key?: string) => JSX.Element
    inicialData?: any
    //Para dynamic
    formListElements?: FormFactoryType[]
    width?: number
  }
  export type typeForm =
    | 'string'
    | 'password'
    | 'email'
    | 'boolean'
    | 'number'
    | 'select'
    | 'numberCode'
    | 'date'
    | 'time'
    | 'phone'

  // | 'multiple_select'
  // | 'textArea'
  // | 'dynamic'
  // | 'avatar'
  // | 'table'
  // | 'upload'
  // | 'date-year'
  // | 'date-month'
  // | 'multiple-photo'
  // | 'video'
  // | 'richText'
}

export type FormFactoryProps = {
  formElements: FormFactory.FormFactoryType[]
  onSubmit?: () => void
  isUpdate: boolean
  errors: DeepMap<Record<string, any>, FieldError>
  control: Control<Record<string, any>>
  data?: any
}

export type elementsObject = {
  [key in FormFactory.typeForm]: JSX.Element
}
