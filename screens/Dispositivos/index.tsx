import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { VirtualizedList } from 'react-native'
import { listDeviceIfExistsFn } from 'services/device'
import { IDevice, User } from 'types/types'
import { Text, View } from '../../components/Themed'

export default function Dispositivos({ navigation, route }: StackScreenProps<any>) {
  //#region provider
  const { permissions, user } = useAuth()
  //#endregion provider

  //#region states
  const [data, setData] = useState<IDevice[]>([])

  const [refreshing, _] = React.useState(false)
  const [loading, setLoading] = useState(false)
  //#endregion states

  //#region effect

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  const getData = async () => {
    setLoading(true)
    try {
      setData(await listDeviceIfExistsFn())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LayoutScreen
        loading={loading}
        navigation={navigation}
        title="Dispositivos"
        header
        {...((user as User).privilegeID?.name === 'Super_admin' && {
          createAction: () => navigation.navigate('LocationCrud')
        })}
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              refreshing={refreshing}
              onRefresh={getData}
              renderItem={({ item }: { item: IDevice }) => (
                <CardComponent
                  onPress={() => {
                    navigation.navigate('Device', { device: item })
                  }}
                  showButtonAction={
                    permissions?.permissions?.find(e => e.sectionName === 'Device')?.update
                      ? true
                      : false
                  }
                >
                  <>
                    <Text style={styles.mainTitle}>{item.name}</Text>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Tipo de equipo:</Text>
                      <Text style={styles.text}>{item.type}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Serial:</Text>
                      <Text style={styles.text}>{item.serialNumber}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Estado:</Text>
                      <Text style={styles.text}>{item.status}</Text>
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
