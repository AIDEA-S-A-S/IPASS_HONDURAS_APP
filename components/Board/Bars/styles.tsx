import { windowsWidth } from 'constants/deviceInfo.constants'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    width: windowsWidth * 0.85,
    marginRight: 10,
    height: '100%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'center'
    // alignItems: 'r'
  },
  containerLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  containerLegendItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
})
