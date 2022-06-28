import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { capitalize } from 'lodash'
import React, { useEffect, useState } from 'react'
import { VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { listUserFn } from 'services/user'
import { User } from 'types/types'
import { Text, View } from '../../components/Themed'

const UsersScreen = ({ navigation, route }: StackScreenProps<any>) => {
  //#region states
  const [data, setData] = useState<User[]>([])
  const [refreshing, _] = React.useState(false)
  const [loading, setLoading] = useState(true)
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    })

    return unsubscribe
  }, [navigation])
  //#endregion effect

  const getData = async () => {
    setLoading(true)
    try {
      const users = await listUserFn()
      setData(users)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LayoutScreen
        header
        loading={loading}
        navigation={navigation}
        createAction={() => navigation.navigate('UserCrud')}
        title="Gestión de usuarios"
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              onRefresh={() => getData()}
              refreshing={refreshing}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: { item: User }) => (
                <CardComponent
                  onPress={() => {
                    navigation.navigate('UserScreen', { user: item })
                  }}
                >
                  <>
                    <Text style={styles.mainTitle}>{`${capitalize(item.name)} ${capitalize(
                      item.lastname
                    )}`}</Text>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Email:</Text>
                      <Text style={styles.text}>{item.email}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Rol:</Text>
                      <Text style={styles.text}>{item.privilegeID?.name}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Estado:</Text>
                      {item.active ? (
                        <AntDesign name="checkcircle" size={RFPercentage(2)} color="white" />
                      ) : (
                        <AntDesign name="closecircle" size={RFPercentage(2)} color="white" />
                      )}
                    </View>
                  </>
                </CardComponent>
              )}
            />
          )}
        </View>
      </LayoutScreen>
    </>
  )
}

export default React.memo(UsersScreen)
