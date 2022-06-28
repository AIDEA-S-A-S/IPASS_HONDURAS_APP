import React, { FC } from 'react'
import { Text, View } from 'components/Themed'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { windowsWidth } from 'constants/deviceInfo.constants'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import { iProps } from './props.interface'

const index: FC<iProps> = ({ text1, text2, type }) => {
  const colorScheme = useColorScheme()

  return (
    <View style={{ ...styles.container, backgroundColor: Colors[colorScheme].containerText }}>
      {type === 'error' && (
        <>
          <View style={styles.lineRed}></View>
          <MaterialIcons
            style={{ marginHorizontal: 10 }}
            name="error"
            size={RFPercentage(3)}
            color="#D80000"
          />
        </>
      )}

      {type === 'success' && (
        <>
          <View style={styles.lineGreen}></View>
          <AntDesign
            style={{ marginHorizontal: 10 }}
            name="checkcircle"
            size={RFPercentage(3)}
            color="#00C51B"
          />
        </>
      )}
      {type === 'info' && (
        <>
          <View style={styles.lineOrange}></View>
          <AntDesign
            style={{ marginHorizontal: 10 }}
            name="infocirlce"
            size={RFPercentage(3)}
            color="#FD9D12"
          />
        </>
      )}

      <View style={styles.containerText}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    </View>
  )
}

export default React.memo(index)

const styles = StyleSheet.create({
  container: {
    width: windowsWidth * 0.9,
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 20
  },
  lineRed: {
    width: 5,
    height: '100%',
    backgroundColor: '#D80000'
  },
  lineGreen: {
    width: 5,
    height: '100%',
    backgroundColor: '#00C51B'
  },
  lineOrange: {
    width: 5,
    height: '100%',
    backgroundColor: '#FD9D12'
  },
  containerText: {
    padding: 5,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold'
  },
  text: {
    fontSize: RFPercentage(2)
  }
})
