import Colors from 'constants/Colors'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  info: {
    fontSize: RFPercentage(2),
    marginBottom: 10
  },
  input: {
    marginVertical: 10,
    borderRadius: 15,
    // flex: 1,
    marginBottom: 10
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  }
})
