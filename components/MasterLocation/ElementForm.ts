import { FormFactory } from 'components/Forms/formTypes'
import { ILocation } from 'types/types'

export const FormElementsMasterLocation = (
  locations: ILocation[]
): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    placeholder: 'Nombre',
    label: true
  },
  {
    name: 'address',
    type: 'string',
    required: true,
    placeholder: 'Dirección',
    label: true
  },
  {
    name: 'location',
    type: 'select',
    data: locations,
    required: true,
    placeholder: 'Locaciones ',
    label: true,
    multiple: true
  },
  {
    name: 'onlyAllowAuthUSers',
    type: 'boolean',
    placeholder: 'Solo verificados',
    label: true
  }
]
