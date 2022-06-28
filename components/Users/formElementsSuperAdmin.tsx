import { FormFactory } from 'components/Forms/formTypes'
import { Privilege } from 'types/types'

export const formElementsSuperAdmin = (privilege: Privilege[]): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    placeholder: 'Nombre',
    label: true
  },
  {
    name: 'lastname',
    type: 'string',
    required: true,
    placeholder: 'Apellido',
    label: true
  },
  {
    name: 'privilegeID',
    type: 'select',
    data: privilege.filter(e => e.name !== 'host'),
    label: true,
    placeholder: 'Rol'
  },
  {
    name: 'email',
    type: 'email',
    label: true,
    placeholder: 'Email',
    required: true
  },
  {
    name: 'verifyLogin',
    type: 'boolean',
    label: true,
    placeholder: 'Doble autenticación'
  },
  {
    name: 'typeDocument',
    type: 'select',
    data: ['DPI', 'Documento extranjero'],
    required: true,
    label: true,
    placeholder: 'Tipo de documento'
  },
  {
    name: 'document',
    type: 'string',
    required: true,
    label: true,
    placeholder: 'Documento'
  },
  {
    name: 'phone',
    type: 'string',
    placeholder: 'Teléfono',
    label: true
  },
  {
    name: 'canAccessToApp',
    type: 'boolean',
    label: true,
    placeholder: 'Acceso a la App Móvile'
  },
  {
    name: 'canAccessToWeb',
    type: 'boolean',
    label: true,
    placeholder: 'Acceso al panel web'
  },
  {
    name: 'code',
    type: 'boolean',
    label: true,
    placeholder: 'Código permanente'
  },
  {
    name: 'canCreateHost',
    type: 'boolean',
    label: true,
    placeholder: 'Puede crear anfitriones'
  },
  {
    name: 'allEventWithAuth',
    type: 'boolean',
    label: true,
    placeholder: 'Todos los eventos con autorización'
  }
]
