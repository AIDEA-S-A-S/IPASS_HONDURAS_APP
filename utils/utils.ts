import { IndexPath } from '@ui-kitten/components'
import moment from 'moment-timezone'
import { basicTable } from '../types/typeTemplate'
export const disabledDate = (current: any) => {
  return current && current <= moment().startOf('day')
}

export const capitalize = (s: string | undefined): string => {
  if (typeof s !== 'string') return ''
  s = s.toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const commonPropsModal = {
  animationIn: 'slideInDown',
  animationOut: 'slideOutUp',
  backdropOpacity: 0.7
}

export const deleteTypeName = (item: any): any => {
  const deleteType = (item: any): any => {
    var newItem = JSON.parse(JSON.stringify(item))

    var keys = Object.keys(newItem)

    keys.find(e => e === '__typename') && delete newItem['__typename']

    keys = Object.keys(newItem)

    for (let k = 0; k < keys.length; k++) {
      if (newItem[keys[k]] && typeof newItem[keys[k]] === 'object') {
        newItem[keys[k]] = deleteTypeName(newItem[keys[k]])
      }
    }
    return newItem
  }

  var newItem = JSON.parse(JSON.stringify(item))

  if (newItem?.length > 0) {
    for (let k = 0; k < newItem.length; k++) {
      newItem[k] = deleteType(newItem[k])
    }
  } else {
    newItem = deleteType(newItem)
  }
  return newItem
}

export const eliminarDiacriticos = (texto: string): string => {
  if (typeof texto !== 'string') return ''
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function elevationShadowStyle(elevation: number, color?: string) {
  return {
    elevation,
    shadowColor: color ? color : 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.5,
    shadowRadius: 0.8 * elevation
  }
}

export const getTypefile = (url: string): string => {
  const filetype = url.slice(url.search(/(.png|.jpg|.jpeg)/g), url.length)
  return filetype
}

export const convertTotable = <T extends basicTable>(items: T[]): T[] => {
  const newItem: T[] = JSON.parse(JSON.stringify([...items]))
  newItem.map(e => (e.key = e._id))
  newItem.reverse()
  return newItem
}

export const convertTotableOne = <T extends basicTable>(items: T): T | null => {
  if (items) {
    const newItem: T = JSON.parse(JSON.stringify(items))
    newItem.key = newItem._id ? newItem._id : undefined
    return newItem
  }
  return null
}

export const getTime = (dateTime: any): string => {
  const time = moment.tz(dateTime, 'America/Guatemala')
  // return time.locale('es').format('DD/MM/YYYY, hh:mm a')
  return time.format('DD/MM/YYYY  hh:mm a')
}

export const getDate = (dateTime: any): string => {
  const time = moment.tz(dateTime, 'America/Guatemala')
  // return time.locale('es').format('DD/MM/YYYY, hh:mm a')
  return time.format('DD/MM/YYYY')
}

export const getHour = (dateTime: any): string => {
  const time = moment.tz(dateTime, 'America/Guatemala')
  // return time.locale('es').format('DD/MM/YYYY, hh:mm a')
  return time.format('hh:mm a')
}

export const getTimeMRZ = (date: String) => {
  const year = date.substring(0, 2)
  const month = date.substring(2, 4)
  const day = date.substring(4, 6)

  return `${year}/${month}/${day}`
}

export const getValuesMultipleSelect = <T extends basicTable[]>(data: T, toFindIn: any[]) => {
  const indexPaths: IndexPath[] = []
  data.forEach(e => {
    const index = toFindIn.findIndex(j => j._id === e._id)
    index > -1 && indexPaths.push(new IndexPath(index))
  })
  return indexPaths
}

export const perNames = ['Super_admin', 'super_anfitrion', 'admin']

export const s3Link = 'https://ipass-renap-oac.s3.amazonaws.com'
