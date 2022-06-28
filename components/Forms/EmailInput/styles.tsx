import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15
  },
  label: {
    fontSize: RFPercentage(2.5)
  },
  input: {
    borderRadius: 15
  }
})
