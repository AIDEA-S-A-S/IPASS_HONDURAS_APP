import { AntDesign } from '@expo/vector-icons'
import { StackNavigationProp } from '@react-navigation/stack'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const UserProfile = (props: { navigation: StackNavigationProp<any>; white?: boolean }) => {
  const colorScheme = useColorScheme()

  const goToProfile = () => {
    props.navigation.navigate('ProfileScreen')
  }
  return (
    <TouchableOpacity
      onPress={goToProfile}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
      activeOpacity={0.7}
    >
      <AntDesign
        name="user"
        size={24}
        color={props.white ? Colors[colorScheme].text : Colors[colorScheme].text}
      />
    </TouchableOpacity>
  )
}

export default React.memo(UserProfile)
