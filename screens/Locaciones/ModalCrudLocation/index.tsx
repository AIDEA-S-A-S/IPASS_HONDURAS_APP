import { IndexPath } from '@ui-kitten/components'
import { FormElementsLocations } from 'components/Locations/ElementFormLocations'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { getAvailableDevices, getDeviceById } from 'services/device'
import { getUsersAdminFn } from 'services/user'
import { RootLocationsScreenProps } from 'types'
import { getValuesMultipleSelect } from 'utils/utils'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { createLocationFn, getLocationFn, updateLocationFn } from '../../../services/locations'
import { IDevice, ILocation, User } from '../../../types/types'
import styles from './styles'

const ModalCrudEvents = ({ navigation, route }: RootLocationsScreenProps<'LocationCrud'>) => {
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

  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  const [devices, setDevices] = useState<IDevice[]>([])
  const [adminUsers, setAdminUsers] = useState<User[]>([])

  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  //#endregion effect

  //#region functions

  const getData = async () => {
    try {
      const devicesData = await getAvailableDevices()
      const admins = await getUsersAdminFn()
      setAdminUsers(admins)
      setLoading(true)
      if (route?.params?.id) {
        const location = await getLocationFn(route?.params?.id)
        const oldDeviec = await getDeviceById(location.device._id)
        devicesData.push(oldDeviec)
        setDevices(devicesData)
        const values = [
          { name: 'name', value: (location as ILocation).name },
          { name: 'address', value: (location as ILocation).address },
          {
            name: 'state',
            value: (location as ILocation).state == 'enabled' ? new IndexPath(0) : new IndexPath(1)
          },
          {
            name: 'typeCheck',
            value: (location as ILocation).typeCheck == 'in' ? new IndexPath(0) : new IndexPath(1)
          },
          {
            name: 'admins',
            value: getValuesMultipleSelect(location?.admins, admins)
          }
        ]

        if (location.device) {
          values.push({
            name: 'device',
            value: new IndexPath(
              devicesData?.findIndex((e: any) => e._id === (location as ILocation).device?._id)
            )
          })
        }

        values.forEach(({ name, value }) =>
          setValue(name, value, { shouldValidate: value && value !== '' ? true : false })
        )
        setUpdate(true)
      } else {
        setDevices(JSON.parse(JSON.stringify(devicesData)))
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
      data.state = data.state == 0 ? 'enabled' : 'disabled'
      data.typeCheck = data.typeCheck == 0 ? 'in' : 'in_out'
      data.device = devices[data.device.row]._id
      var admins: any[] = []
      if (data?.admins) {
        data.admins.forEach((e: any, i: number) => {
          admins.push(adminUsers[e.row]._id)
        })
      }

      data.admins = admins
      // console.log(data)
      await createLocationFn(data)
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
      data.state = data.state == 0 ? 'enabled' : 'disabled'
      data.typeCheck = data.typeCheck == 0 ? 'in' : 'in_out'
      data.device = devices[data.device.row]._id
      var admins: any[] = []
      data.admins.forEach((e: any, i: number) => {
        admins.push(adminUsers[e.row]._id)
      })
      data.admins = admins
      await updateLocationFn({ ...data, _id: route?.params?.id })
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
  //#endregion functions

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>
    <LayoutCrud loading={loading} title={'title layout'}>
      <View style={styles.containerForm}>
        <FormFactory
          control={control}
          isUpdate={false}
          errors={errors}
          formElements={FormElementsLocations(devices, adminUsers)}
        />

        <ButtonAction
          text={update ? 'Actualizar Locación' : 'Crear Locación'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(ModalCrudEvents)
