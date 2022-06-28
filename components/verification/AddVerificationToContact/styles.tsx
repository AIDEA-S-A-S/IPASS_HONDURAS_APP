import Colors from 'constants/Colors'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default StyleSheet.create({
  mainContainer: {
    padding: 20,
    borderRadius: 10,
    flex: 0.5
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  gradiend: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  },
  input: {
    fontSize: RFPercentage(2),
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: RFPercentage(2),
    marginVertical: 10,
    fontWeight: 'bold'
  },

  button: {
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10
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
