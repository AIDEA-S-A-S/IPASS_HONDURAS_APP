import { Ionicons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import { Avatar } from '@ui-kitten/components'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import QrReader from 'components/QrReader'
import styles from 'components/styles'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import * as React from 'react'
import Toast from 'react-native-toast-message'
import { verifyQrAuthenticator } from 'services/authenticator'
import { User } from 'types/types'
import { s3Link } from 'utils/utils'
import { Text, View } from '../../components/Themed'

export default function Profile({ navigation, route }: StackScreenProps<any>) {
  const { logout, user, worker } = useAuth()
  const colorScheme = useColorScheme()

  const goVerification = () => {
    navigation.navigate('Verification')
  }

  const goQR = () => {
    navigation.navigate('QR')
  }

  const QrReadAuthenticator = async (data: string) => {
    try {
      const value = await verifyQrAuthenticator(data, user?._id as string)
      if (value.status === 'fail') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Ocurrio un error autenticando'
        })
      } else {
        Toast.show({
          type: 'info',
          position: 'top',
          text1: 'Éxito',
          text2: 'Autenticado con éxito'
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <LayoutScreen navigation={navigation} title="Perfil" centerTitle styleStatusBar="light">
      <>
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: Colors[colorScheme]['color-primary-100'],
            paddingBottom: 10,
            marginBottom: 10
          }}
        >
          {user?.photo?.key && (
            <Avatar
              style={{
                borderWidth: 2,
                borderColor: Colors[colorScheme]['color-primary-100'],
                marginBottom: 10
              }}
              source={{ uri: `${s3Link}/${user?.photo?.key}` }}
              shape="round"
              size="large"
            />
          )}

          <Text style={{ ...styles.text, color: Colors[colorScheme].text }}>{user?.email}</Text>
          {!worker && (
            <Text style={{ ...styles.text, color: Colors[colorScheme].text }}>
              {(user as User)?.privilegeID?.name}
            </Text>
          )}
        </View>

        <View style={{ ...styles.container, justifyContent: 'flex-start' }}>
          {!worker && (
            <>
              <ButtonAction
                icon="camera-outline"
                text={'Verificación'}
                onPress={goVerification}
                mode="dark"
                flexStart
              />

              {(user as User).code && (
                <ButtonAction
                  RenderIcon={(props: any) => {
                    return <Ionicons {...props} name="qr-code" size={24} color="white" />
                  }}
                  text={'Generar QR ingreso'}
                  onPress={goQR}
                  mode="dark"
                  flexStart
                />
              )}
            </>
          )}
          {(user as User)?.canUseAuthenticator && <QrReader onChange={QrReadAuthenticator} />}

          <ButtonAction
            flexStart
            icon="log-out"
            text={'Cerrar Sesión'}
            onPress={logout}
            mode="dark"
          />
        </View>
      </>
    </LayoutScreen>
  )
}
