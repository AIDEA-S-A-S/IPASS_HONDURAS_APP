import { AntDesign } from '@expo/vector-icons'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { View } from './Themed'
const CardComponent = ({
  children,
  onPress,
  style,
  adicionalButton,
  showButtonAction,
  edit,
  deleteFun
}: {
  children: JSX.Element
  onPress?: () => void
  style?: ViewStyle
  adicionalButton?: JSX.Element
  showButtonAction?: boolean
  edit?: () => void
  deleteFun?: () => void
}) => {
  const colorScheme = useColorScheme()

  const actionsButtons = (
    <>
      {(showButtonAction === true ||
        showButtonAction === undefined ||
        showButtonAction === null) && (
        <>
          <TouchableOpacity
            onPress={() => {
              edit && edit()
            }}
          >
            <AntDesign name="edit" size={24} color={Colors['dark'].text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteFun && deleteFun()
            }}
          >
            <AntDesign name="delete" size={24} color={Colors['dark'].text} />
          </TouchableOpacity>
        </>
      )}

      {adicionalButton}
    </>
  )

  return (
    <>
      {onPress ? (
        <TouchableOpacity
          style={{ ...styles.container, ...style }}
          onPress={() => {
            onPress()
          }}
        >
          <View
            style={{ ...styles.item, backgroundColor: Colors[colorScheme]['color-primary-100'] }}
          >
            <View style={styles.containerInfo}>{children}</View>
            {/* <View style={styles.containerActions}>{actionsButtons}</View> */}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={{ ...styles.container, ...style }}>
          <View
            style={{ ...styles.item, backgroundColor: Colors[colorScheme]['color-primary-100'] }}
          >
            <View style={styles.containerInfo}>{children}</View>
            <View style={styles.containerActions}>{actionsButtons}</View>
          </View>
        </View>
      )}
    </>
  )
}

export default React.memo(CardComponent)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10
  },
  item: {
    width: '100%',
    // height: ' 100%',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row'
  },
  mainContainerModal: {},
  containerActions: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '20%',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
  containerInfo: {
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly',
    width: '100%'
  }
})
