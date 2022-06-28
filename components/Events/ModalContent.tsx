import { Text, View } from 'components/Themed'
import React, { useRef } from 'react'
import { IEvent } from 'types/types'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { elevationShadowStyle } from 'utils/utils'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Modalize } from 'react-native-modalize'
import ManageGuest from 'components/Events/ManageGuest'
const ModalContent = ({ actualEvent }: { actualEvent?: IEvent }) => {
  const colorScheme = useColorScheme()
  const modalRefGuest = useRef<Modalize>(null)
  const edit = () => {}
  const deleteFun = () => {}
  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          end={{ x: 0.0, y: 0.5 }}
          start={{ x: 1, y: 0.5 }}
          colors={Colors[colorScheme].gradientTartetMenu}
          style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
        >
          <Text style={styles.text}>Nombre: {actualEvent?.name}</Text>
          <Text style={styles.text}>Dirección:{actualEvent?.location.address}</Text>
          <Text style={styles.text}>Inicio: {moment(actualEvent?.start).format('DD/MM/YYYY HH:mm A')}</Text>
          <Text style={styles.text}>Fin: {moment(actualEvent?.end).format('DD/MM/YYYY HH:mm A')}</Text>
          <Text style={styles.text}>
            Solo verificados:
            {!actualEvent?.onlyAuthUser ? (
              <AntDesign style={{ marginLeft: 10 }} name="checkcircle" size={24} color="white" />
            ) : (
              <AntDesign style={{ marginLeft: 10 }} name="closecircle" size={24} color="white" />
            )}
          </Text>
          <Text style={styles.text}> Minutos previos :{actualEvent?.beforeStart}</Text>
        </LinearGradient>
        <LinearGradient
          end={{ x: 0.0, y: 0.5 }}
          start={{ x: 1, y: 0.5 }}
          colors={Colors[colorScheme].gradientTartetMenu}
          style={{ ...styles.gradientButtons, backgroundColor: Colors[colorScheme].backgrounItemList }}
        >
          <View style={styles.buttons}>
            <TouchableOpacity onPress={edit}>
              <AntDesign name="edit" size={24} color={Colors['dark'].text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteFun}>
              <AntDesign name="delete" size={24} color={Colors['dark'].text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                modalRefGuest.current?.open()
              }}
            >
              <AntDesign name="user" size={24} color={Colors['dark'].text} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <ManageGuest record={actualEvent} modalRef={modalRefGuest} />
    </>
  )
}

export default React.memo(ModalContent)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    ...elevationShadowStyle(5),
    borderRadius: 20
  },
  gradiend: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    marginVertical: 10
  },
  gradientButtons: {
    width: '100%',
    height: '20%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  }
})
