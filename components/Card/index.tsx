import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC } from 'react'
import { iProps } from './props.interface'
import styles from './styles'
import commonStyles from 'components/styles'
const index: FC<iProps> = ({ title, value, Icon, style }) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  return (
    <View
      style={{ ...styles.container, backgroundColor: Colors[colorScheme].containerText, ...style }}
    >
      {Icon && Icon}
      <Text style={{ ...commonStyles.subTitle, color: Colors[colorScheme].text }}>{title}</Text>
      <Text style={{ ...commonStyles.mainTitle, color: Colors[colorScheme]['color-primary-100'] }}>
        {value}
      </Text>
    </View>
  )
}

export default React.memo(index)
