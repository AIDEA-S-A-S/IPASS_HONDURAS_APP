import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    position: 'relative',
    width: '100%'
  },
  label: {
    fontSize: RFPercentage(2.5)
  },
  input: {
    borderRadius: 15
  }
})
