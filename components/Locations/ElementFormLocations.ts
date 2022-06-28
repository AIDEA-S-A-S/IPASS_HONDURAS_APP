import { FormFactory } from 'components/Forms/formTypes'
import { IDevice, User } from 'types/types'

export const FormElementsLocations = (
  devices: IDevice[],
  admins: User[]
): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    placeholder: 'Nombre',
    type: 'string',
    required: true,
    label: true
  },
  {
    name: 'address',
    placeholder: 'Dirección',
    type: 'string',
    label: true
  },
  {
    name: 'state',
    type: 'select',
    data: ['enabled', 'disabled'],
    required: true,
    label: true,
    placeholder: 'Estado'
  },
  {
    name: 'typeCheck',
    type: 'select',
    data: ['in', 'in_out'],
    required: true,
    label: true,
    placeholder: 'Función'
  },
  {
    name: 'device',
    type: 'select',
    fullWidth: true,
    data: devices,
    placeholder: 'Equipo asociado',
    label: true
  },
  {
    name: 'admins',
    type: 'select',
    multiple: true,
    lastname: true,
    fullWidth: true,
    data: admins,
    placeholder: 'Administradores',
    label: true
  }

  // {
  //   name: 'timeWait',
  //   type: 'number',
  //   required: true
  // },
  // {
  //   name: 'enableVideo',
  //   placeholder: '¿Video habilitado?',
  //   type: 'boolean',
  //   // required: true,
  //   label: true
  // },
  // {
  //   name: 'enableTalk',
  //   type: 'boolean',
  //   // required: true,
  //   placeholder: 'Respuestas habilitadas?',
  //   label: true
  // }
]
