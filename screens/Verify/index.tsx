import ButtonAction from 'components/ButtonAction'
import FormFactory from 'components/Forms/FormFactory'
import useAuth from 'providers/AuthContext'
import useData from 'providers/DataContext'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { FormElementsVerifyToken } from 'screens/Verify/components/FormElementsVerifyToken'
import { confirmToken } from 'services/session'
import { Text, View } from '../../components/Themed'
import { IProps } from './props.interface'
import styles from './styles'

const Verify: FC<IProps> = ({ route, navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { login } = useAuth()
  const { setLoading } = useData()

  const submitVerifyLogin = async ({ token }: any) => {
    setLoading(true)
    try {
      const res = await confirmToken({ token })
      login(res.token)
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error token',
        text2: 'Token invalido'
      })
    } finally {
      setLoading(false)
    }
  }

  const email = route.params?.email

  const reSendCode = () => {}

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView style={{ flex: 1 }} enableOnAndroid>
          <View style={styles.containerTitle}>
            <Text style={styles.mainTitle}>Código de Verificación:</Text>
          </View>
          <View style={styles.containerForm}>
            <View style={styles.containerInfo}>
              <Text style={styles.info}>{`Ingresa el código que hemos enviado a ${email.replace(
                /(\w{1})[\w.-]+@([\w.]+\w)/,
                '$1*****@$2'
              )}`}</Text>
            </View>
            <View style={styles.containerFormFactory}>
              <FormFactory
                // onSubmit={handleSubmit(submitVerifyLogin)}
                formElements={FormElementsVerifyToken}
                isUpdate={false}
                errors={errors}
                control={control}
              />
            </View>
            <View style={styles.containerButton}>
              <ButtonAction
                mode="dark"
                onPress={handleSubmit(submitVerifyLogin)}
                text="Verificar"
              />
              <ButtonAction mode="dark" onPress={reSendCode} text="Volver a enviar" />
              <ButtonAction mode="dark" onPress={() => navigation.goBack()} text="Regresar" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>

      {/* <StatusBar style="light" /> */}
    </View>
  )
}

export default React.memo(Verify)
