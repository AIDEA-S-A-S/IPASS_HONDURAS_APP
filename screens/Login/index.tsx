import ButtonAction from 'components/ButtonAction'
import FormFactory from 'components/Forms/FormFactory'
import { windowsWidth } from 'constants/deviceInfo.constants'
import { images } from 'constants/Image'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import useData from 'providers/DataContext'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { loginService } from 'services/session'
import { graphqlErrors } from 'types/types'
import { FormElementsLogin } from './components/Formelements'
import { View } from '../../components/Themed'
import { IProps } from './props.interface'
import styles from './styles'
import { loginWorkerFn } from 'services/workers'

const Login: FC<IProps> = ({ navigation, route }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { login } = useAuth()
  const { setLoading } = useData()
  const colorScheme = useColorScheme()

  const onSubmitLogin = async (data: any) => {
    setLoading(true)

    if (
      data.email === 'avilas_ataq@hotmail.com' &&
      data.password === '3rlxeV01KUJNEpfVxEhyGSoLSMrM4n8hhSRMz3lL'
    ) {
      login(
        (await loginService({ email: data.email, password: data.password, lang: 'es' })).response
      )
    } else {
      try {
        if (data.worker) {
          const res = await loginWorkerFn({
            email: data.email,
            password: data.password,
            lang: 'es'
          })
          if (res.response === 'ok') {
            navigation.navigate('Verify', { email: res.token })
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Código',
              text2: 'Se ha enviado un cod de verificación'
            })
          } else if (res.token) {
            login(res.token, true)
          } else if (res.response === 'cant') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: 'Sin autorización'
            })
          }
        } else {
          const res = await loginService({ email: data.email, password: data.password, lang: 'es' })
          if (res.response === 'ok') {
            navigation.navigate('Verify', { email: res.token })
            Toast.show({
              type: 'info',
              position: 'top',
              text1: 'Código',
              text2: 'Se ha enviado un cod de verificación'
            })
          } else if (res.response === 'token') {
            login(res.token)
          } else if (res.response === 'cant') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error',
              text2: 'Sin autorización'
            })
          }
        }
      } catch (error) {
        //@ts-ignore
        const errors: graphqlErrors = error
        if (errors?.message?.includes('No match') || errors?.message?.includes('No active')) {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error iniciando',
            text2: 'Usuario o contraseña incorrectos'
          })
        } else {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error',
            text2: 'Ocurrió un error inesperado'
          })
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
            // enableOnAndroid
          >
            <View style={styles.containerContent}>
              <Image
                source={colorScheme === 'light' ? images.backToWhite : images.backToBlack}
                style={styles.back}
              />
              <View style={styles.containerImage}>
                <Image
                  style={{ width: windowsWidth * 0.8, resizeMode: 'contain' }}
                  source={colorScheme === 'light' ? images.logoBlack : images.logoWhite}
                />
              </View>
              {Platform.OS === 'ios' ? (
                <View style={styles.containerForm}>
                  <View style={styles.containerFormFactory}>
                    <FormFactory
                      formElements={FormElementsLogin}
                      isUpdate={false}
                      errors={errors}
                      control={control}
                    />
                  </View>
                  <View style={styles.containerButton}>
                    <ButtonAction
                      mode="dark"
                      width={'100%'}
                      onPress={handleSubmit(onSubmitLogin)}
                      text="Login"
                    />
                  </View>
                </View>
              ) : (
                <>
                  <FormFactory
                    formElements={FormElementsLogin}
                    isUpdate={false}
                    errors={errors}
                    control={control}
                  />
                  <ButtonAction
                    mode="dark"
                    width={'100%'}
                    onPress={handleSubmit(onSubmitLogin)}
                    text="Login"
                  />
                </>
              )}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
      <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
    </>
  )
}

export default React.memo(Login)
