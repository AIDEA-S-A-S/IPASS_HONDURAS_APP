import { AntDesign } from '@expo/vector-icons'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { IContact } from 'types/types'
import { elevationShadowStyle } from 'utils/utils'
const ModalContent = ({ actualContact }: { actualContact?: IContact }) => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <LinearGradient
        end={{ x: 0.0, y: 0.5 }}
        start={{ x: 1, y: 0.5 }}
        colors={Colors[colorScheme].gradientTartetMenu}
        style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
      >
        <Text style={styles.text}>nombre :{actualContact?.firstName}</Text>
        <Text style={styles.text}>Dirección:{actualContact?.lastName}</Text>
        <Text style={styles.text}>Teléfono: {actualContact?.phone}</Text>
        <Text style={styles.text}>Email: {actualContact?.email}</Text>
        <Text style={styles.text}>
          Verificados:
          {actualContact?.verified ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : (
            <AntDesign name="closecircle" size={24} color="red" />
          )}
          <Text style={styles.text}>Apodo :{actualContact?.nickname}</Text>
        </Text>
      </LinearGradient>
    </View>
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
    alignItems: 'center'
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    marginVertical: 10
  }
})
