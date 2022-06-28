import { Text, View } from 'components/Themed'
import { windowsWidth } from 'constants/deviceInfo.constants'
import React, { FC } from 'react'
import QRCode from 'react-native-qrcode-generator'
import { iProps } from './props.interface'
import styles from './styles'
import commonStyles from 'components/styles'

import useColorScheme from 'hooks/useColorScheme'
import Colors from 'constants/Colors'

const index: FC<iProps> = ({ value }) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...commonStyles.mainTitle,
          color: Colors[colorScheme].text,
          alignSelf: 'flex-start',
          marginBottom: 10
        }}
      >
        Código de ingreso temporal
      </Text>
      <QRCode size={windowsWidth * 0.9} value={value} bgColor="black" fgColor="white" />
    </View>
  )
}

export default React.memo(index)
