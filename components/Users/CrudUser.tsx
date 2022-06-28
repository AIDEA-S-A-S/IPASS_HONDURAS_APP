import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { getAllPrivilege } from 'services/privilege'
import { addNewUser, editUser } from 'services/user'
import { Privilege, User } from '../../types/types'
import ButtonAction from '../ButtonAction'
import FormFactory from '../Forms/FormFactory'
import LayoutCrud from '../Forms/LayoutCrud'
import { FormElement } from './ElementForm'

const CreateEvents = ({ modalRef, selectedUser }: { modalRef: React.RefObject<IHandles>; selectedUser?: User }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<any>()
  const isUpdate = selectedUser ? true : false
  const { user } = useAuth()
  const [privileges, setPrivileges] = useState<Privilege[]>([])
  const [height, setHeight] = useState(Dimensions.get('screen').height * 0.8)
  useEffect(() => {
    if (selectedUser) {
      const values = [
        { name: 'name', value: selectedUser.name },
        { name: 'lastname', value: selectedUser.lastname },
        { name: 'privilegeID', value: selectedUser.privilegeID },
        { name: 'email', value: selectedUser.email }
      ]
      values.forEach(({ name, value }) => setValue(name, value, { shouldValidate: value && value !== '' ? true : false }))
    }
  }, [selectedUser])
  useEffect(() => {
    ;(async () => {
      const allPermissions = await getAllPrivilege()
      switch (allPermissions.find(e => e._id === user?.privilegeID)?.name) {
        case 'Super_admin':
          setPrivileges(allPermissions.filter(e => e.name !== 'host'))
          break
        case 'admin':
          setPrivileges(allPermissions.filter(e => e.name !== 'Super_admin' && e.name !== 'admin'))
          break
        default:
          break
      }
    })()
  }, [])
  const onSubmit = async (data: User) => {
    try {
      data.active = false
      data.lang = 'es'
      await addNewUser(data)
      modalRef.current?.close()
      reset()
    } catch (error) {
      console.error(error)
    }
  }
  const update = async (data: User) => {
    try {
      data._id = selectedUser?._id
      await editUser(data)
      modalRef.current?.close()
      reset()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Modalize
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
      disableScrollIfPossible
      modalHeight={height}
      ref={modalRef}
      onClose={reset}
      // modalStyle={{ backgroundColor: Colors[colorScheme].backgroundModal }}
      handlePosition="outside"
    >
      <LayoutCrud scrollEnabled={false} title={'title layout'}>
        <View onLayout={e => setHeight(e.nativeEvent.layout.height * 1.1)} style={styles.containerForm}>
          <FormFactory control={control} isUpdate={isUpdate} errors={errors} formElements={FormElement(privileges)} />

          <ButtonAction text={isUpdate ? 'Actualizar usuario' : 'Crear usuario'} action={handleSubmit(isUpdate ? update : onSubmit)} mode={'dark'} />
        </View>
      </LayoutCrud>
    </Modalize>
  )
}

export default React.memo(CreateEvents)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerForm: {
    width: '100%',
    height: '100%',
    padding: 10
  },
  mainContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
