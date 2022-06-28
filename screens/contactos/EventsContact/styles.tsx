import Colors from 'constants/Colors'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  containerButtons: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  guestNumber: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleEvent: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
