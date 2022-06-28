import { Text, View } from 'components/Themed'
import { BlurView } from 'expo-blur'
import React, { FC } from 'react'
import { Image } from 'react-native'
import { iProps } from './props.interface'
import styles from './styles'

const index: FC<iProps> = ({ uri, title }) => {
  //#region hooks
  //#endregion hooks

  return (
    <View style={{ ...styles.container }}>
      {title && (
        <View style={styles.titleContainer}>
          <BlurView tint="light" style={styles.blueView} intensity={50}>
            <Text style={styles.text}>{title}</Text>
          </BlurView>
        </View>
      )}
      <Image style={styles.image} source={{ uri }} />
    </View>
  )
}

export default React.memo(index)
