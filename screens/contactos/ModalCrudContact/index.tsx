import { FormElementsContacts } from 'components/Contacts/ElementFormContacts'
import { FormElementsContactsUpdate } from 'components/Contacts/ElementFormContactsUpdate'
import { FormElementsContactsSuperAnfitrion } from 'components/Contacts/ElementFormContactSuperAnfitrion'
import ImportContact from 'components/Contacts/ImportContact'
import * as Contacts from 'expo-contacts'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import {
  createContactFn,
  getContactbyId,
  sendVerification,
  sendVerificationPDF,
  updateContactFn,
  verifyContactID
} from 'services/contact'
import { RootContactsScreenProps } from 'types'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { IContact } from '../../../types/types'
import styles from './styles'
import { callingCountries } from 'country-data'
import { IndexPath } from '@ui-kitten/components'

const ModalCrudContact = ({ navigation, route }: RootContactsScreenProps<'ContactCrud'>) => {
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

  //#region provider
  const { permissions } = useAuth()
  //#endregion provider

  //#region states
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [newContact, setNewContact] = useState<Contacts.Contact>()
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (newContact) {
        const actualContact = (await Contacts.getContactByIdAsync(
          newContact.id
        )) as Contacts.Contact
        const values = [
          { name: 'firstName', value: actualContact.firstName ? actualContact.firstName : '' },
          { name: 'lastName', value: actualContact.lastName ? actualContact.lastName : '' },
          {
            name: 'email',
            value: actualContact.emails
              ? actualContact.emails[0].email
                ? actualContact.emails[0].email
                : ''
              : ''
          },
          {
            name: 'phone',
            value: actualContact.phoneNumbers
              ? actualContact.phoneNumbers[0].number
                ? actualContact.phoneNumbers[0].number
                : ''
              : ''
          },
          { name: 'nickname', value: actualContact.nickname ? actualContact.nickname : '' }
        ]
        values.forEach(({ name, value }) =>
          setValue(name, value, { shouldValidate: value && value !== '' ? true : false })
        )
      }
    })()
  }, [newContact])

  //#endregion effect

  //#region functions

  const getData = async () => {
    try {
      setLoading(true)
      if (route?.params?.id) {
        const contact = await getContactbyId(route?.params?.id)
        const values = [
          { name: 'firstName', value: (contact as IContact).firstName },
          { name: 'lastName', value: (contact as IContact).lastName },
          { name: 'email', value: (contact as IContact).email },
          { name: 'phone', value: (contact as IContact).phone },
          {
            name: 'indicativo',
            value: new IndexPath(
              callingCountries.all.findIndex(e => e.countryCallingCodes[0] === contact.indicativo)
            )
          },
          { name: 'nickname', value: (contact as IContact).nickname },
          { name: 'DPI', value: (contact as IContact).DPI }
          // { name: 'askVerification', value: (contact as IContact).askVerification }
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
      data.verificationRegistro =
        data.verificationRegistro && data.verificationRegistro !== '' ? true : false
      data.askVerification = data.askVerification && data.askVerification !== '' ? true : false

      data.indicativo = callingCountries.all[data?.indicativo?.row].countryCallingCodes[0]
      if (route?.params?.data) {
        delete data.askVerification
      }
      const newContact = await createContactFn(data)
      if (route?.params?.data) {
        associateContact(newContact)
      } else {
        reset()
        navigation.goBack()
      }
    } catch (error: any) {
      console.log(error)
      if (error.message.search('E11000 duplicate key error collection')) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Contacto',
          text2: 'DPI ya existente'
        })
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Contacto',
          text2: 'Ocurrió un error inesperado'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const onUpdate = async (data: any) => {
    setLoading(true)
    try {
      delete data.askVerification
      delete data.verificationRegistro
      // data.askVerification = data.askVerification && data.askVerification !== '' ? true : false
      data.indicativo = callingCountries.all[data.indicativo.row].countryCallingCodes[0]
      console.log(data)
      await updateContactFn({ ...data, _id: route?.params?.id })
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

  const associateContact = async (contact: IContact) => {
    try {
      const toSend = route?.params?.data
      if (toSend.documentNumber) {
        await sendVerification(toSend, contact._id as string)
      } else {
        await sendVerificationPDF(toSend, contact._id as string)
      }
      await verifyContactID(contact._id as string)
      navigation.navigate('ContactosScreen')
    } catch (error) {
      console.log(error)
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
          formElements={
            permissions?.name === 'super_anfitrion'
              ? FormElementsContactsSuperAnfitrion()
              : update || route?.params?.data
              ? FormElementsContactsUpdate()
              : FormElementsContacts()
          }
        />

        <ButtonAction
          text={update ? 'Actualizar Contacto' : 'Crear Contacto'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
        {!update && permissions?.name !== 'super_anfitrion' && (
          <ImportContact setNewContact={setNewContact} />
        )}
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(ModalCrudContact)
