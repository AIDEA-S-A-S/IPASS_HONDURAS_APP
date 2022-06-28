import { FormFactory } from 'components/Forms/formTypes'
import moment from 'moment'
import { ILocation } from 'types/types'

export const FormElementsEvents = (
  locations: ILocation[],
  update?: boolean
): FormFactory.FormFactoryType[] => [
  {
    name: 'name',
    type: 'string',
    required: true,
    placeholder: 'Nombre',
    label: true
  },
  {
    name: 'start',
    type: 'date',
    placeholder: 'Inicio',
    required: true,
    label: true,
    adicionalProps: {
      minimumDate: moment().toDate()
    }
  },
  {
    name: 'startHour',
    type: 'time',
    placeholder: 'Hora de inicio',
    required: true,
    label: true
  },
  {
    name: 'end',
    type: 'date',
    placeholder: 'Fin',
    required: true,
    label: true,
    adicionalProps: {
      minimumDate: moment().toDate()
    }
  },
  {
    name: 'endHour',
    type: 'time',
    placeholder: 'Hora de fin',
    required: true,
    label: true
  },
  {
    name: 'location',
    required: true,
    type: 'select',
    data: locations,
    placeholder: 'Seleccione una locación',
    label: true
  },
  {
    name: 'beforeStart',
    required: true,
    type: 'number',
    placeholder: 'Minutos previos al inicio',
    label: true
  },
  {
    name: 'onlyAuthUser',
    type: 'boolean',
    placeholder: 'Solo verificados',
    // required: true,
    label: true,
    defaultValue: !update
  }
]
