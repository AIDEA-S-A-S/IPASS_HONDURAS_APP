import { Text, View } from 'components/Themed'
import UserProfile from 'navigation/UserProfile'
import React, { FC } from 'react'
import { IProps } from './props.interface'
import styles from './styles'

const Header: FC<IProps> = ({ navigation, title }) => {
  return (
    <View style={{ ...styles.container }}>
      <Text style={[styles.headerText]}>IPASS RENAP +</Text>
      <View style={styles.menuRight}>
        <UserProfile white={true} navigation={navigation} />
      </View>
    </View>
  )
}

export default React.memo(Header)
