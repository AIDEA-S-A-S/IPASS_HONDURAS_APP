import { FormFactory } from 'components/Forms/formTypes'

export const FormElementsVerifyToken: FormFactory.FormFactoryType[] = [
  {
    name: 'token',
    type: 'numberCode',
    placeholder: 'Tú código',
    defaultValue: '623302'
    // required: true
  }
]
