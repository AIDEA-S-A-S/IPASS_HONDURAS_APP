import { windowsWidth } from 'constants/deviceInfo.constants'
import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1
    // borderWidth: 1
  },
  containerContent: {
    // height: windowsHeight * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
    padding: Platform.OS === 'android' ? 10 : 0
  },
  back: {
    position: 'absolute',
    zIndex: 0
    // alignSelf: 'center'
    // borderWidth: 2
    // top: -10
  },
  containerImage: {
    width: windowsWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
    // borderWidth: 1/
  },
  containerForm: {
    backgroundColor: 'transparent',
    width: windowsWidth,
    justifyContent: 'flex-end',
    flex: 1
  },
  containerFormFactory: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 15

    // height: windowsHeight * 0.3
  },
  containerButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    width: windowsWidth
    // borderWidth: 1
  }
})
