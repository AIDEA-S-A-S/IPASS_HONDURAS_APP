import Colors from 'constants/Colors'
import Layout from 'constants/Layout'
import { BlurView } from 'expo-blur'
import { StatusBar } from 'expo-status-bar'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from '../Themed'
import Content from './Content'
import { iProps } from './props.interface'
import styles from './styles'

const LayoutScreen: FC<iProps> = props => {
  const colorScheme = useColorScheme()

  return (
    <>
      <StatusBar
        {...(props.styleStatusBar && !Layout.isTablet && { style: props.styleStatusBar })}
      />
      {props.loading && (
        <BlurView tint={colorScheme} intensity={100} style={styles.loading}>
          <ActivityIndicator color={Colors[colorScheme]['color-primary-100']} size="large" />
        </BlurView>
      )}
      {props.withoutSafeArea ? (
        <View style={{ flex: 1, padding: 15 }}>
          <Content {...props} />
        </View>
      ) : (
        <SafeAreaView
          edges={['top']}
          style={{
            flex: 1,
            backgroundColor: Colors[colorScheme].background,
            paddingHorizontal: 15
          }}
        >
          <Content {...props} />
        </SafeAreaView>
      )}
    </>
  )
}

export default React.memo(LayoutScreen)
