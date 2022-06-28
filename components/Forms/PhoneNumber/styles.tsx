import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: RFPercentage(2.5)
  },
  input: {
    borderRadius: 15,
    marginBottom: 5,
    flex: 1,
    marginLeft: 5
  }
})
