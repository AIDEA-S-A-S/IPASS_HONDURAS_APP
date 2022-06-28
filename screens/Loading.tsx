import { StackScreenProps } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { View } from '../components/Themed'

export default function Profile({ navigation, route }: StackScreenProps<any>) {
  return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center',
  },
  gradiend: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    marginVertical: 2,
    fontWeight: 'bold'
  },
  containerButtons: {
    width: '100%',
    height: '10%',
    borderRadius: 5
  },
  touchable: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20
  },
  textButton: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: Colors['dark'].text
  }
})
