import { AntDesign } from '@expo/vector-icons'
import Header from 'components/Header'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC } from 'react'
import { Pressable } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { iProps } from './props.interface'
import styles from './styles'

const Content: FC<iProps> = props => {
  const colorScheme = useColorScheme()

  return (
    <View style={{ ...styles.container, backgroundColor: Colors[colorScheme].backgrounItemList }}>
      <View style={styles.header}>
        {props.header && <Header title={props.title} navigation={props.navigation} />}
        <View
          style={{
            ...styles.containerTitle,
            ...(props.centerTitle && { justifyContent: 'center' })
          }}
        >
          <Text style={styles.mainTitle}>{props.title}</Text>
          <View style={styles.actions}>
            {props.actionFilter && (
              <Pressable style={{ marginRight: 8 }} onPress={props.actionFilter}>
                <AntDesign name="search1" size={RFPercentage(3)} color={Colors[colorScheme].text} />
              </Pressable>
            )}
            {props.createAction && (
              <Pressable onPress={props.createAction}>
                <AntDesign name="plus" size={RFPercentage(3)} color={Colors[colorScheme].text} />
              </Pressable>
            )}
          </View>
        </View>
      </View>
      <View style={{ ...styles.containerContent }}>
        <View style={styles.childContainer}>{props.children}</View>
      </View>
    </View>
  )
}

export default React.memo(Content)
