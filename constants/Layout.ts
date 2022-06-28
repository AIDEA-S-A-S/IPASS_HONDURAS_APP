import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  isTablet: width >= 764,
  url: __DEV__ ? 'https://renapbackend.ipass.com.gt' : 'https://renapbackend.ipass.com.gt'
}
