import Colors from 'constants/Colors'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingVertical: 20,
    // borderWidth: 1
  },
  mainContainer: {
    padding: 10,
    borderRadius: 10,
    flex: 0.5
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
  containerText: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 5
  },
  input: {
    marginVertical: 10,
    borderRadius: 15
    // flex: 1,
    // marginBottom: 70
  },
  mainTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  },
  subTitle: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    fontWeight: 'bold',
    marginRight: 5
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text
  },
  text2: {
    fontSize: RFPercentage(2),
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent'
  },
  containerIcon: {
    height: RFPercentage(2.5),
    width: RFPercentage(2.5),
    backgroundColor: Colors['dark'].text,
    borderRadius: RFPercentage(1.25),
    justifyContent: 'center',
    alignItems: 'center'
    // paddingLeft: RFPercentage(0.1)
  },
  containerIcon2: {
    height: RFPercentage(2),
    width: RFPercentage(2),
    backgroundColor: Colors['dark'].text,
    borderRadius: RFPercentage(1),
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerQr: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    padding: 10
  }
})
