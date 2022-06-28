import { BlurView } from 'expo-blur'
import useColorScheme from 'hooks/useColorScheme'
import * as React from 'react'
import { ActivityIndicator, Dimensions, Platform, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//utils
import { RFPercentage } from 'react-native-responsive-fontsize'
import { View } from '../../components/Themed'
import Colors from '../../constants/Colors'
//types
import { PropsLayoutCrud } from '../../types'
import { elevationShadowStyle } from '../../utils/utils'

function LayoutCurdScreen(props: PropsLayoutCrud) {
  //hooks
  const colorScheme = useColorScheme()

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={Platform.OS === 'android'}
      scrollEnabled={!props.loading}
      contentContainerStyle={{
        flexGrow: 1,
        position: 'relative',
        paddingBottom: Platform.OS === 'ios' ? 80 : 30,
        backgroundColor: Colors[colorScheme].background
      }}
      enableOnAndroid
    >
      <View style={styles.childContainer}>{props.children}</View>
      {props.loading && (
        <BlurView tint={colorScheme} intensity={80} style={styles.loading}>
          <ActivityIndicator size="large" color={Colors[colorScheme]['color-primary-100']} />
        </BlurView>
      )}
    </KeyboardAwareScrollView>
  )
}

export default React.memo(LayoutCurdScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: RFPercentage(4),
    color: Colors['dark'].text,
    fontWeight: 'bold'
  },
  containerPartsTwo: {
    width: '100%'
  },
  loading: {
    position: 'absolute',
    width: '100%',
    // height: '100%',
    height: Dimensions.get('screen').height,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerScrollView: {
    borderRadius: 20,
    // borderTopEndRadius: 20,
    // paddingHorizontal: 10,
    position: 'relative',
    ...elevationShadowStyle(5),
    flexGrow: 1
    // padding: 20
  },

  childContainer: {
    width: '100%',
    height: '100%',
    padding: 20
    // borderRadius: 20
  },
  loader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 50000,
    justifyContent: 'center',
    alignContent: 'center'
    // borderRadius: 20
  }
})
