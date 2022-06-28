import useAuth from 'providers/AuthContext'
import * as React from 'react'
import { Button, StyleSheet } from 'react-native'

import { View } from '../components/Themed'

export default function TabTwoScreen() {
  const { logout } = useAuth()
  return (
    <View style={styles.container}>
      <Button onPress={logout} title={'Logout'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
