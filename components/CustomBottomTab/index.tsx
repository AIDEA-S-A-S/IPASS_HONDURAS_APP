import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { View } from 'components/Themed'
import { BlurView } from 'expo-blur'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import { elevationShadowStyle } from 'utils/utils'

const index = (props: any) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        width: 'auto',
        height: 70,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 25,
        borderRadius: 10,
        overflow: 'hidden',
        ...elevationShadowStyle(4)
      }}
    >
      <BlurView tint={colorScheme} intensity={90} style={{ width: '100%', flex: 1 }}>
        <BottomTabBar {...props} />
      </BlurView>
    </View>
  )
}

export default React.memo(index)
