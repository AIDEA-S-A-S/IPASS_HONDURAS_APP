import { Dimensions, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20
  },
  container_main_info: {
    width: '100%'
    // ...elevationShadowStyle(6),
    // marginBottom: 20
  },
  container_text_main_info: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  container_Image: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  title_parameter: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold'
  },
  value_parameter: {
    fontSize: RFPercentage(2)
  },
  image: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').width * 0.8,
    // borderWidth: 2,
    borderRadius: 20
  }
})
