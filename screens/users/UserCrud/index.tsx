import { IndexPath } from '@ui-kitten/components'
import { formElementsAdmin } from 'components/Users/formElementsAdmin'
import { formElementsSuperAdmin } from 'components/Users/formElementsSuperAdmin'
import useAuth from 'providers/AuthContext'
import useData from 'providers/DataContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { createUserFn, getUserFn, updateUserFn } from 'services/user'
import { RootUserScreenProps } from 'types'
import { Privilege, User } from 'types/types'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import styles from './styles'

const typeDocument = ['DPI', 'Documento extranjero']

const UserCrud = ({ navigation, route }: RootUserScreenProps<'UserCrud'>) => {
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
  const { user, permissions } = useAuth()
  const { privilege } = useData()
  //#endregion provider

  //#region states
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
  const [privileges, setPrivileges] = useState<Privilege[]>([])
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  //#endregion effect

  //#region functions

  const getData = async () => {
    try {
      setLoading(true)
      if (permissions?.name === 'Super_admin') {
        setPrivileges(privilege.filter(e => e.name !== 'host'))
      } else if (permissions?.name === 'admin') {
        setPrivileges(
          privilege.filter(
            e => e.name !== 'Super_admin' && e.name !== 'admin' && e.name !== 'super_anfitrion'
          )
        )
      }
      if (route?.params?._id) {
        const userData = await getUserFn(route?.params?._id as string)
        const values = [
          { name: 'name', value: userData.name },
          { name: 'lastname', value: userData.lastname },
          { name: 'email', value: userData.email },
          { name: 'phone', value: userData.phone },
          { name: 'verifyLogin', value: userData.verifyLogin },
          {
            name: 'typeDocument',
            value: new IndexPath(typeDocument.findIndex(e => e === userData.typeDocument))
          },
          {
            name: 'privilegeID',
            value: new IndexPath(privilege.findIndex(e => e._id === userData.privilegeID?._id))
          },
          { name: 'document', value: userData.document },
          { name: 'canAccessToApp', value: userData.canAccessToApp },
          { name: 'canAccessToWeb', value: userData.canAccessToWeb },
          { name: 'code', value: userData.code }
          // { name: 'askVerification', value: (contact as IContact).askVerification }
        ]
        if ((user as User)?.privilegeID?.name == 'Super_admin') {
          values.push(
            ...[
              {
                name: 'canCreateHost',
                value: userData.canCreateHost
              },
              { name: 'allEventWithAuth', value: userData.allEventWithAuth }
            ]
          )
        }
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
      data.privilegeID = privileges[data.privilegeID.row]._id
      data.typeDocument = typeDocument[data.typeDocument.row]
      data.canAccessToApp = data.canAccessToApp && data.canAccessToApp !== '' ? true : false
      data.canAccessToWeb = data.canAccessToWeb && data.canAccessToWeb !== '' ? true : false
      data.code = data.code && data.code !== '' ? true : false
      data.verifyLogin = data.verifyLogin && data.verifyLogin !== '' ? true : false
      if ((user as User)?.privilegeID?.name === 'Super_admin') {
        data.canCreateHost = data.canCreateHost && data.canCreateHost !== '' ? true : false
        data.allEventWithAuth = data.allEventWithAuth && data.allEventWithAuth !== '' ? true : false
      }
      await createUserFn(data)
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
      data.privilegeID = privileges[data.privilegeID.row]._id
      data.typeDocument = typeDocument[data.typeDocument.row]
      data.canAccessToApp = data.canAccessToApp && data.canAccessToApp !== '' ? true : false
      data.canAccessToWeb = data.canAccessToWeb && data.canAccessToWeb !== '' ? true : false
      data.code = data.code && data.code !== '' ? true : false
      data.verifyLogin = data.verifyLogin && data.verifyLogin !== '' ? true : false

      if ((user as User)?.privilegeID?.name === 'Super_admin') {
        data.canCreateHost = data.canCreateHost && data.canCreateHost !== '' ? true : false
        data.allEventWithAuth = data.allEventWithAuth && data.allEventWithAuth !== '' ? true : false
      }
      await updateUserFn({ ...data, _id: route?.params?._id })
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
          formElements={
            (user as User).privilegeID?.name === 'Super_admin'
              ? formElementsSuperAdmin(privileges)
              : formElementsAdmin(privileges)
          }
        />

        <ButtonAction
          text={update ? 'Actualizar Usuario' : 'Crear Usuario'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(UserCrud)
