import { IndexPath } from '@ui-kitten/components'
import moment from 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { RootEventsScreenProps } from 'types'
import ButtonAction from '../../../components/ButtonAction'
import { FormElementsEvents } from '../../../components/Events/ElementFormEvents'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { addEvent, editEvent, getEventFn } from '../../../services/events'
import { getAllLocation } from '../../../services/locations'
import { IEvent, ILocation } from '../../../types/types'
import styles from './styles'

const ModalCrudEvents = ({ navigation, route }: RootEventsScreenProps<'EventoCrud'>) => {
  // const isUpdate = selectedEvent ? true : false

  //#region hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<any>()
  //#endregion hooks

  //#region states
  const [locations, setLocations] = useState<ILocation[]>([])
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  //#endregion states

  //#region effect
  useEffect(() => {
    getLocations()
  }, [])

  //#endregion effect

  //#region functions

  const getLocations = async () => {
    try {
      setLoading(true)
      const locationData = await getAllLocation()
      setLocations(locationData)
      if (route?.params?.id) {
        const event = await getEventFn(route?.params?.id)
        // console.log(new Date((event as IEvent).start as string))
        const values = [
          { name: 'name', value: (event as IEvent).name },
          { name: 'start', value: new Date((event as IEvent).start as string) },
          { name: 'end', value: new Date((event as IEvent).end as string) },
          {
            name: 'location',
            value: new IndexPath(
              locationData?.findIndex(e => e._id === (event as IEvent).location?._id)
            )
          },
          { name: 'startHour', value: new Date((event as IEvent).start as string) },
          { name: 'endHour', value: new Date((event as IEvent).end as string) },
          { name: 'beforeStart', value: (event as IEvent).beforeStart.toString() },
          { name: 'onlyAuthUser', value: (event as IEvent).onlyAuthUser }
        ]
        values.forEach(({ name, value }) =>
          setValue(name, value, { shouldValidate: value && value !== '' ? true : false })
        )
        setUpdate(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      data.beforeStart = parseInt(data.beforeStart as any)
      data.onlyAuthUser = data.onlyAuthUser && data.onlyAuthUser !== '' ? true : false
      data.location = locations[data.location.row]._id
      const startTime = moment(data.startHour)
      const endTime = moment(data.endHour)

      data.start = moment(data.start)
        .set('hour', startTime.get('hour'))
        .set('minutes', startTime.get('minutes'))
      data.end = moment(data.end)
        .set('hour', endTime.get('hour'))
        .set('minutes', endTime.get('minutes'))

      delete data.endHour
      delete data.startHour
      // console.log(moment(data.start).format('YYYY-MM-DD HH:mm:ss'))
      await addEvent(data)
      reset()
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Contacto',
        text2: 'Ocurrió un error inesperado'
      })
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (data: any) => {
    setLoading(true)
    try {
      data.beforeStart = parseInt(data.beforeStart as any)
      data.onlyAuthUser = data.onlyAuthUser && data.onlyAuthUser !== '' ? true : false
      data.location = locations[data.location.row]._id
      const startTime = moment(data.startHour)
      const endTime = moment(data.endHour)

      data.start = moment(data.start)
        .set('hour', startTime.get('hour'))
        .set('minutes', startTime.get('minutes'))
      data.end = moment(data.end)
        .set('hour', endTime.get('hour'))
        .set('minutes', endTime.get('minutes'))

      delete data.endHour
      delete data.startHour
      // console.log(data)

      await editEvent({ ...data, _id: route?.params?.id })
      reset()
      navigation.goBack()
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Contacto',
        text2: 'Ocurrió un error inesperado'
      })
    } finally {
      setLoading(false)
    }
  }

  // console.log(locations)

  //#endregion functions

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
    <LayoutCrud loading={loading} title={'title layout'}>
      <View style={styles.containerForm}>
        <FormFactory
          control={control}
          isUpdate={false}
          errors={errors}
          formElements={FormElementsEvents(locations, update)}
        />

        <ButtonAction
          text={update ? 'Actualizar evento' : 'Crear Evento'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(ModalCrudEvents)
