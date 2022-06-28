import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import { View } from 'components/Themed'
import React from 'react'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { deleteUserFn } from 'services/user'
import { User as iUser } from 'types/types'
import { capitalize } from 'utils/utils'
import styles from './styles'

const User = ({ navigation, route }: StackScreenProps<any>) => {
  const actualUser: iUser = route?.params?.user

  const deleteFun = () => {
    Alert.alert(`¿Deseas eliminar el usuario ${actualUser?.name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => deleteModal()
      }
    ])
  }

  const deleteModal = async () => {
    try {
      await deleteUserFn({ _id: actualUser?._id as string })
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LayoutScreen
      navigation={navigation}
      styleStatusBar="light"
      title={`${capitalize(actualUser.name)} ${capitalize(actualUser.lastname)}`}
    >
      <>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <TextToShowData title={'Email'} text={actualUser?.email} />
          <TextToShowData title={'Rol'} text={actualUser?.privilegeID?.name} />
          <TextToShowData
            Icon={
              actualUser.active ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Estado"
          />
          <TextToShowData
            Icon={
              actualUser.verifyLogin ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Doble autenticación"
          />
          <TextToShowData title="Tipo de documento" text={actualUser.typeDocument} />
          <TextToShowData title="Documento" text={actualUser.document} />
          <TextToShowData
            Icon={
              actualUser.canAccessToApp ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Acceso a la App Móvil"
          />
          <TextToShowData
            Icon={
              actualUser.canAccessToWeb ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Acceso al panel web"
          />
          <TextToShowData
            Icon={
              actualUser.canCreateHost ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Puede crear anfitriones"
          />
          <TextToShowData
            Icon={
              actualUser.allEventWithAuth ? (
                <AntDesign name="checkcircle" size={RFPercentage(2.5)} color="green" />
              ) : (
                <AntDesign name="closecircle" size={RFPercentage(2.5)} color="red" />
              )
            }
            title="Todos los eventos con autorización"
          />
          <View style={styles.buttons}>
            <ButtonAction
              styles={{ flex: 1, marginRight: 5 }}
              mode="dark"
              status="danger"
              onPress={deleteFun}
              text="Eliminar"
              icon="trash-outline"
            />
            <ButtonAction
              icon="edit-outline"
              mode="dark"
              status="info"
              text="Editar"
              styles={{ flex: 1, marginLeft: 5 }}
              onPress={() => navigation.navigate('UserCrud', { _id: actualUser?._id })}
            />
          </View>
        </ScrollView>
      </>
    </LayoutScreen>
  )
}

export default React.memo(User)
