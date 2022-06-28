import Colors from 'constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { elevationShadowStyle } from 'utils/utils'
// import { PropsTargetMenu } from '../types'
import { Text, View } from './Themed'

export const TargetMenu = (props: any) => {
  return (
    <View
      style={{
        ...styles.containerButtons,
        ...elevationShadowStyle(10, Colors['dark'].gradientTartetMenu[0]),
        ...props.style
      }}
    >
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={Colors['dark'].gradientTartetMenu}
        style={{ ...styles.touchable, padding: 0 }}
      >
        <TouchableOpacity onPress={props.action} style={styles.touchable}>
          {props.icon()}
          <Text style={styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  containerButtons: {
    width: '100%',
    height: '10%',
    borderRadius: 10,
    marginTop: 15
  },
  touchable: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10
  },
  textButton: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: Colors['dark'].text
  }
})
