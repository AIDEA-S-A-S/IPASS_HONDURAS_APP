import { windowsHeight, windowsWidth } from 'constants/deviceInfo.constants'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  containerForm: {
    height: '100%',
    backgroundColor: 'transparent',
    width: windowsWidth,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  containerTitle: {
    height: windowsHeight * 0.15,
    width: windowsWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainTitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },
  containerInfo: {
    height: windowsHeight * 0.15,
    width: windowsWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center'
  },
  containerFormFactory: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    height: windowsHeight * 0.2
  },
  containerButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    width: windowsWidth,
    height: windowsHeight * 0.5
  }
})
