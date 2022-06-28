import { AntDesign } from '@expo/vector-icons'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { User } from 'types/types'
import { elevationShadowStyle } from 'utils/utils'
const ModalContent = ({ actualUser }: { actualUser?: User }) => {
  const colorScheme = useColorScheme()
  return (
    <View style={styles.container}>
      <LinearGradient
        end={{ x: 0.0, y: 0.5 }}
        start={{ x: 1, y: 0.5 }}
        colors={Colors[colorScheme].gradientTartetMenu}
        style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
      >
        <Text style={styles.text}>Nombre :{actualUser?.name}</Text>
        <Text style={styles.text}>Apellido:{actualUser?.lastname}</Text>
        <Text style={styles.text}>Email: {actualUser?.email}</Text>
        <Text style={styles.text}>Rol: {actualUser?.privilegeID?.name}</Text>
        <Text style={styles.text}>
          Estado:
          {actualUser?.active ? <AntDesign name="checkcircle" size={24} color="green" /> : <AntDesign name="closecircle" size={24} color="red" />}
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
