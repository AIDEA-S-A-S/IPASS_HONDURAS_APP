import { IndexPath } from '@ui-kitten/components'
import { formElements } from 'components/EventsExpress/formElements'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { getAllContactUser } from 'services/contact'
import {
  createEventExpressFn,
  getEventExpressFn,
  updateEventExpressFn
} from 'services/eventExpress'
import { getAllLocationActive } from 'services/locations'
import { RootLocationsScreenProps } from 'types'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { IContact, IEventExpress, ILocation } from '../../../types/types'
import styles from './styles'

const EventExpressCrud = ({ navigation, route }: RootLocationsScreenProps<'LocationCrud'>) => {
  // const isUpdate = selectedEvent ? true : false

  //#region hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<any>()
  //#endregion hooks

  //#region states

  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [locations, setLocations] = useState<ILocation[]>([])
  const [contacts, setContacts] = useState<IContact[]>([])
  const [contactsInvitados, setContactsInvitados] = useState<IContact[]>([])
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == 'contact') {
        const dataContacts: IContact[] = JSON.parse(JSON.stringify(contacts))
        setContactsInvitados(
          dataContacts.filter(e => e._id !== dataContacts[value?.contact.row]._id)
        )
      }
    })
    return () => subscription.unsubscribe()
  }, [contacts, watch])

  //#endregion effect

  //#region functions

  const getData = async () => {
    try {
      setLoading(true)
      const locationsData = await getAllLocationActive()
      const contactsData = await getAllContactUser()
      setContacts(contactsData)
      setContactsInvitados(contactsData)
      setLocations(locationsData)
      if (route?.params?.id) {
        const eventExpress = await getEventExpressFn(route?.params?.id)

        const values = [
          { name: 'name', value: (eventExpress as IEventExpress).name },
          {
            name: 'location',
            value: new IndexPath(
              locationsData?.findIndex(e => e._id === (eventExpress.location as ILocation)?._id)
            )
          },
          {
            name: 'contact',
            value: new IndexPath(
              contactsData?.findIndex(e => e._id === (eventExpress.contact as IContact)?._id)
            )
          }
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
      data.location = locations[data.location.row]._id
      data.contact = contacts[data.contact.row]._id
      var invitados: any[] = []
      if (data.invitados) {
        data.invitados.forEach((e: any, i: number) => {
          invitados.push(contactsInvitados[e.row]._id)
        })
      }
      data.invitados = invitados
      await createEventExpressFn(data)
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
      data.location = locations[data.location.row]._id
      data.contact = contacts[data.contact.row]._id
      await updateEventExpressFn({ ...data, _id: route?.params?.id })
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
          formElements={formElements(locations, contacts, contactsInvitados)}
        />

        <ButtonAction
          text={update ? 'Actualizar Evento Express' : 'Crear Evento Express'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(EventExpressCrud)
