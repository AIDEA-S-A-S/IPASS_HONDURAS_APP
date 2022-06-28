import { FormFactory } from 'components/Forms/formTypes'

export const formElements = (): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    fullWidth: true,
    label: true,
    placeholder: 'Nombre'
  },
  {
    name: 'type',
    type: 'select',
    fullWidth: true,
    required: true,
    data: ['classic', 'touch'],
    label: true,
    placeholder: 'Tipo'
  },
  {
    name: 'serialNumber',
    type: 'string',
    fullWidth: true,
    required: true,
    label: true,
    placeholder: 'Serial'
  },
  {
    name: 'timeWait',
    type: 'number',
    adicionalProps: { min: 1 },
    fullWidth: true,
    required: true,
    label: true,
    placeholder: 'Tiempo de espera'
  },
  {
    name: 'enableTalk',
    type: 'boolean',
    fullWidth: true,
    label: true,
    placeholder: 'Habilitar voz'
  },
  {
    name: 'enableVideo',
    type: 'boolean',
    fullWidth: true,
    label: true,
    placeholder: 'Habilitar video'
  }
]
