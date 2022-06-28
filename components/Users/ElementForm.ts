import { FormFactory } from 'types'
import { Privilege } from 'types/types'

export const FormElement = (privileges: Privilege[]): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    placeholder: 'Nombre'
  },
  {
    name: 'lastname',
    type: 'string',
    required: true,
    placeholder: 'Apellido'
  },
  {
    name: 'privilegeID',
    type: 'select',
    data: privileges.map(privilege => ({ value: privilege._id, label: privilege.name })),
    placeholder: 'Seleccione rol'
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'email'
  }
]
