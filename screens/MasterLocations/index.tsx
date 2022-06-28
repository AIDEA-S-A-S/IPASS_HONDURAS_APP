import { AntDesign } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { Text, View } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { listMasterLocationActiveFn } from 'services/masterLocation'
import { IMasterLocation } from 'types/types'
import { capitalize } from 'utils/utils'
// import styles from './styles'

const masterLocation = ({ navigation }: StackScreenProps<any>) => {
  //#region states
  const [data, setData] = useState<IMasterLocation[]>([])
  const [refreshing, _] = React.useState(false)
  //#region states

  //#region  effect

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

  //#region functions

  const getData = async () => {
    const masterLocations = await listMasterLocationActiveFn()
    setData(masterLocations)
  }

  //#endregion functions
  return (
    <>
      <LayoutScreen
        createAction={() => navigation.navigate('MasterLocationCrud')}
        title="Locaciones maestras"
        navigation={navigation}
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              refreshing={refreshing}
              onRefresh={getData}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              data={data}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item, index }: { item: IMasterLocation; index: number }) => (
                <CardComponent
                  onPress={() =>
                    navigation.navigate('MasterLocationScreen', {
                      screen: 'MasterLocation',
                      params: { _id: item._id }
                    })
                  }
                >
                  <>
                    <Text style={styles.mainTitle}>{capitalize(item.name)}</Text>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Dirección</Text>
                      <Text style={styles.text}>{item.address}</Text>
                    </View>
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Solo verificados</Text>
                      {!item?.onlyAllowAuthUSers ? (
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

export default React.memo(masterLocation)
