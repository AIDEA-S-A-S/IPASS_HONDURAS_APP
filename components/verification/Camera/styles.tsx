import { Dimensions, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  containerCamera: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2000000000
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: RFPercentage(50),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '15%'
  },
  switchButton: {
    position: 'absolute',
    zIndex: 2000000001,
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(50),
    backgroundColor: '#000'
  },
  closeButton: {
    position: 'absolute',
    zIndex: 2000000001,
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(50),
    backgroundColor: '#000'
  }
})
