import Colors from 'constants/Colors'
import { windowsHeight } from 'constants/deviceInfo.constants'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: '100%',
    height: windowsHeight * 0.3,
    // height: 50,
    borderRadius: 10,
    marginVertical: 10,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },
  titleContainer: {
    width: '95%',
    backgroundColor: 'transparent',
    // padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10
  },
  blueView: {
    width: '100%',
    padding: 20
  },
  text: {
    fontSize: RFPercentage(2.5),
    color: Colors['light'].text,
    fontWeight: 'bold'
  }
})
