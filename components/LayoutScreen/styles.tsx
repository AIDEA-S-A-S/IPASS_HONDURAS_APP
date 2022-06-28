import { windowsHeight } from 'constants/deviceInfo.constants'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
    // borderWidth: 1
    // borderWidth: 1
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: windowsHeight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    bottom: 0
  },
  header: {
    width: '100%'
  },
  texts: {},
  welcome: {},
  subTitle: {
    fontSize: RFPercentage(2)
  },

  secondaryTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold'
  },
  containerTitle: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  containerContent: {
    width: '100%',
    flex: 1,
    // paddingHorizontal: 10,
    position: 'relative'
    // borderWidth: 1
    // borderWidth: 1

    // borderWidth: 2
  },
  childContainer: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    position: 'relative'
    // borderWidth: 1
  }
})
