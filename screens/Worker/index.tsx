import { Ionicons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import useAuth from 'providers/AuthContext'
import React from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { IWorker } from 'types/types'
import { capitalize } from 'utils/utils'

const Worker = ({ navigation, route }: StackScreenProps<any>) => {
  // console.log(route.params)

  //#region Provider
  const { user, refetchWorker } = useAuth()
  //#endregion provider

  //#region states
  const [refreshing, _] = React.useState(false)

  //#endregion states

  //#region  effect
  //#endregion effect

  //#region functions

  const goQR = () => {
    navigation.navigate('QR')
  }

  console.log(user as IWorker)
  //#endregion functions

  return (
    <LayoutScreen header title="Información de perfil" navigation={navigation}>
      <>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refetchWorker} />}
        >
          <TextToShowData
            title="Nombre"
            text={`${capitalize(user?.name)} ${capitalize(user?.lastname)}`}
          />
          <TextToShowData title="Teléfono" text={(user as IWorker)?.phone} />
          <TextToShowData title="Locación nativa" text={(user as IWorker)?.nativeLocation.name} />
          <TextToShowData
            onPress={() => navigation.navigate('GroupLocation', { group: (user as IWorker).group })}
            primary
            title="Grupos"
            text={(user as IWorker)?.group?.length ? (user as IWorker)?.group?.length : 0}
          />

          {(user as IWorker).code && (
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
        </ScrollView>
      </>
    </LayoutScreen>
  )
}

export default React.memo(Worker)
