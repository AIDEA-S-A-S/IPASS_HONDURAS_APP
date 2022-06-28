import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 15,
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: RFPercentage(2.5)
  },
  input: {
    borderRadius: 15
    // borderWidth: 0
  }
})
