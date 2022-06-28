import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { IProps } from './props.interface'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'
const index: FC<IProps> = ({ text, title, Icon, primary, onPress }) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.containerText,
        backgroundColor: primary
          ? Colors[colorScheme]['color-primary-100']
          : Colors[colorScheme].containerText
      }}
    >
      <Text style={{ ...styles.subTitle, ...(primary && { color: Colors['dark'].text }) }}>
        {title}:
      </Text>
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        {text !== null && (
          <Text style={{ ...styles.text, ...(primary && { color: Colors['dark'].text }) }}>
            {text}
          </Text>
        )}
        {Icon && Icon}
        {onPress && (
          <AntDesign
            name="right"
            size={RFPercentage(2.5)}
            color={primary ? Colors['dark'].text : Colors[colorScheme].text}
          />
        )}
      </View>
    </Pressable>
  )
}

export default React.memo(index)
