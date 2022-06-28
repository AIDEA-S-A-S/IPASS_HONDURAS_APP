import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
export default StyleSheet.create({
  containerText: {
    width: '100%',
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  subTitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold'
  },
  text: {
    fontSize: RFPercentage(2)
    // color: Colors['dark'].text,
    // marginVertical: 10
  }
})
