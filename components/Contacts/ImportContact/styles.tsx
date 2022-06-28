import Colors from 'constants/Colors'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerClose: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerList: {
    width: '100%'
  },
  containerItem: {
    width: '100%',
    padding: 10

    // backgroundColor: 'red',
  },
  input: {
    marginVertical: 10,
    borderRadius: 15,
    flex: 1
  },
  containerContact: {
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row'
  },
  containerImage: {
    width: 50,
    borderWidth: 1,
    backgroundColor: 'transparent'
  },
  containerInfo: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  containerText: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 5
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent',
    borderWidth: 10
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center'
  }
})
