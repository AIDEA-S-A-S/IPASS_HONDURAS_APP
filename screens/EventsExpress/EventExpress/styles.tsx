import Colors from 'constants/Colors'
import { Dimensions, StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  containerConent: {
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  containerText: {
    width: '100%',
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  subTitle: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold'
  },
  text: {
    fontSize: RFPercentage(2)
    // color: Colors['dark'].text,
    // marginVertical: 10
  },
  buttons: {
    // borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  buttonWithText: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: RFPercentage(3),
    borderWidth: 1
    // color: Colors['dark'].text
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
    // backgroundColor: 'white',
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
  },
  containerList: {
    height: Dimensions.get('screen').height * 0.15
  },
  titleEvent: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  },
  containerGuest: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  leftGuestPart: {
    width: '75%',
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },
  RightGuestPart: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainersGuest: {
    flexDirection: 'row',
    backgroundColor: Colors['dark'].text,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    width: RFPercentage(4),
    height: RFPercentage(4),
    borderRadius: RFPercentage(2)
  },
  containerIcons: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerHour: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
