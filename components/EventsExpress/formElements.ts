import { FormFactory } from 'components/Forms/formTypes'
import { IContact, ILocation } from 'types/types'

export const formElements = (
  locations?: ILocation[],
  contacts?: IContact[],
  contactsInvitados?: IContact[]
): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    label: true,
    placeholder: 'Nombre del evento'
  },
  {
    name: 'location',
    type: 'select',
    data: locations,
    required: true,
    label: true,
    placeholder: 'Locación'
  },
  {
    name: 'contact',
    type: 'select',
    data: contacts,
    label: true,
    required: true,
    placeholder: 'Contacto',
    key: 'contact'
  },
  {
    name: 'invitados',
    type: 'select',
    data: contactsInvitados,
    label: true,
    // required: true,
    placeholder: 'Invitados extra',
    key: 'contact',
    multiple: true
  },
  {
    name: 'motivo',
    type: 'string',
    label: true,
    required: true,
    placeholder: 'Motivo',
    adicionalProps: { maxLength: 100, multiline: true }
  }
]
