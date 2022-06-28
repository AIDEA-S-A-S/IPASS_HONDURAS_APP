import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  root: { padding: 20, minHeight: 300, backgroundColor: 'transparent' },
  containerCell: {
    width: '100%',
    flexDirection: 'row',
    height: 280,
    justifyContent: 'space-between'
  },
  input: {
    height: 80,
    padding: 0
  },
  inputText: {
    height: 50,
    padding: 0
  }
})
