import { Text, View } from 'components/Themed'
import React from 'react'
import { ILocation } from 'types/types'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { StyleSheet } from 'react-native'
import { elevationShadowStyle } from 'utils/utils'
import { RFPercentage } from 'react-native-responsive-fontsize'
const ModalContent = ({ actualLocation }: { actualLocation?: ILocation }) => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <LinearGradient
        end={{ x: 0.0, y: 0.5 }}
        start={{ x: 1, y: 0.5 }}
        colors={Colors[colorScheme].gradientTartetMenu}
        style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
      >
        <Text style={styles.text}>Nombre :{actualLocation?.name}</Text>
        <Text style={styles.text}>Dirección:{actualLocation?.address}</Text>
        <Text style={styles.text}>Número de serial (Raspberry pi):{actualLocation?.serialNumber}</Text>
        <Text style={styles.text}>Tipo de locación:{actualLocation?.typeLocation}</Text>
        <Text style={styles.text}>
          Video:
          {actualLocation?.enableVideo ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : (
            <AntDesign name="closecircle" size={24} color="red" />
          )}
        </Text>
        <Text style={styles.text}>
          Respuestas habladas :
          {actualLocation?.enableTalk ? (
            <AntDesign name="checkcircle" size={24} color="green" />
          ) : (
            <AntDesign name="closecircle" size={24} color="red" />
          )}
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
