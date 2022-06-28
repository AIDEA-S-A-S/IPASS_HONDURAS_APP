import { FormFactory } from 'components/Forms/formTypes'

export const FormElementsContacts = (): FormFactory.FormFactoryType[] => [
  {
    name: 'DPI',
    type: 'string',
    required: true,
    placeholder: 'DPI'
  },
  {
    name: 'firstName',
    type: 'string',
    required: true,
    placeholder: 'Nombre'
  },
  {
    name: 'lastName',
    type: 'string',
    required: true,
    placeholder: 'Apellido'
  },
  {
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Email'
  },
  {
    name: 'phone',
    type: 'phone',
    required: true,
    placeholder: 'Número'
  },
  {
    name: 'askVerification',
    type: 'boolean',
    placeholder: 'Solicitar verificación'
  },
  {
    name: 'verificationRegistro',
    type: 'boolean',
    placeholder: 'Verificación de tipo registro'
  }
]
