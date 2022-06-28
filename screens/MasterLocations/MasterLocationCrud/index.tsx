import { FormElementsMasterLocation } from 'components/MasterLocation/ElementForm'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import {
  createMasterLocationFn,
  getMasterLocationFn,
  updateMasterLocationFn
} from 'services/masterLocation'
import { RootMasterLocationsScreenPros } from 'types'
import { getValuesMultipleSelect } from 'utils/utils'
import ButtonAction from '../../../components/ButtonAction'
import FormFactory from '../../../components/Forms/FormFactory'
import LayoutCrud from '../../../components/Forms/LayoutCrud'
import { getAllLocationActive } from '../../../services/locations'
import { ILocation } from '../../../types/types'
import styles from './styles'

const MasterLocationCrud = ({
  navigation,
  route
}: RootMasterLocationsScreenPros<'MasterLocationCrud'>) => {
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
  const [locations, setLocations] = useState<ILocation[]>([])

  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  //#endregion effect

  //#region functions

  const getData = async () => {
    try {
      const locationsData = await getAllLocationActive()
      setLocations(locationsData)
      setLoading(true)
      if (route?.params?._id) {
        const masterLocation = await getMasterLocationFn(route?.params?._id)
        const values = [
          { name: 'name', value: masterLocation.name },
          { name: 'address', value: masterLocation.address },
          {
            name: 'onlyAllowAuthUSers',
            value: masterLocation.onlyAllowAuthUSers
          },
          {
            name: 'location',
            value: getValuesMultipleSelect(masterLocation?.location as ILocation[], locationsData)
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
      data.onlyAllowAuthUSers =
        data.onlyAllowAuthUSers && data.onlyAllowAuthUSers !== '' ? true : false

      var locationsToSent: any[] = []
      if (data?.location) {
        data.location.forEach((e: any, i: number) => {
          locationsToSent.push(locations[e.row]._id)
        })
      }
      data.location = locationsToSent
      await createMasterLocationFn(data)
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
      data.onlyAllowAuthUSers =
        data.onlyAllowAuthUSers && data.onlyAllowAuthUSers !== '' ? true : false
      var locationsToSent: any[] = []
      if (data?.location) {
        data.location.forEach((e: any, i: number) => {
          locationsToSent.push(locations[e.row]._id)
        })
      }
      data.location = locationsToSent
      await updateMasterLocationFn({ ...data, _id: route?.params?._id })
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
          formElements={FormElementsMasterLocation(locations)}
        />

        <ButtonAction
          text={update ? 'Actualizar Locación Maestra' : 'Crear Locación Maestra'}
          onPress={handleSubmit(update ? onUpdate : onSubmit)}
          status="primary"
          mode={'dark'}
        />
      </View>
    </LayoutCrud>
    // </SafeAreaView>
  )
}

export default React.memo(MasterLocationCrud)
