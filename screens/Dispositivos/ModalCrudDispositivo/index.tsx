import { IndexPath } from '@ui-kitten/components'
import { formElements } from 'components/Devices/ElementFormDevices'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { createDeviceFn, getDeviceById, updateDeviceFn } from 'services/device'
import { RootLocationsScreenProps } from 'types'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { IDevice } from '../../../types/types'
import styles from './styles'

const ModalCrudDevice = ({ navigation, route }: RootLocationsScreenProps<'LocationCrud'>) => {
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

  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)
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
      if (route?.params?.id) {
        const device = await getDeviceById(route?.params?.id)

        const values = [
          { name: 'name', value: (device as IDevice).name },
          {
            name: 'type',
            value: (device as IDevice).type == 'classic' ? new IndexPath(0) : new IndexPath(1)
          },
          { name: 'serialNumber', value: (device as IDevice).serialNumber },
          { name: 'timeWait', value: (device as IDevice).timeWait.toString() },
          { name: 'enableTalk', value: (device as IDevice).enableTalk },
          { name: 'enableVideo', value: (device as IDevice).enableVideo }
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
      data.type = data.state == 0 ? 'classic' : 'touch'
      data.enableTalk = data.enableTalk && data.enableTalk !== '' ? true : false
      data.enableVideo = data.enableVideo && data.enableVideo !== '' ? true : false
      data.timeWait = parseInt(data.timeWait)
      await createDeviceFn(data)
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
      data.type = data.state == 0 ? 'classic' : 'touch'
      data.enableTalk = data.enableTalk && data.enableTalk !== '' ? true : false
      data.enableVideo = data.enableVideo && data.enableVideo !== '' ? true : false
      data.timeWait = parseInt(data.timeWait)
      await updateDeviceFn({ ...data, _id: route?.params?.id })
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
          formElements={formElements()}
        />

        <ButtonAction
          text={update ? 'Actualizar Equipo' : 'Crear Equipo'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(ModalCrudDevice)
