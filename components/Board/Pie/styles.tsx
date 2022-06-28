import { windowsWidth } from 'constants/deviceInfo.constants'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: windowsWidth * 0.85,
    marginRight: 10,
    height: '100%',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center'
    // alignItems: 'r'
  }
})
