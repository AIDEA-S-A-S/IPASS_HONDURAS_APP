import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import Colors from 'constants/Colors'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { StyleSheet, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllLocation } from 'services/locations'
import { ILocation, User } from 'types/types'
import { Text, View } from '../../components/Themed'

export default function Locaciones({ navigation, route }: StackScreenProps<any>) {
  //#region provider
  const { permissions, user } = useAuth()
  //#endregion provider

  //#region states
  const [data, setData] = useState<ILocation[]>([])

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
      const locations = await getAllLocation()
      setData(locations)
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
        header
        title="Tus locaciones"
        {...((user as User).privilegeID?.name === 'Super_admin' && {
          createAction: () => navigation.navigate('LocationCrud')
        })}
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              getItemCount={data => data.length}
              showsVerticalScrollIndicator={false}
              getItem={(data, index) => ({ ...data[index] })}
              refreshing={refreshing}
              onRefresh={getData}
              renderItem={({ item }: { item: ILocation }) => (
                <CardComponent
                  onPress={() => {
                    navigation.navigate('Locacion', { location: item })
                  }}
                  showButtonAction={
                    permissions?.permissions?.find(e => e.sectionName === 'Location')?.update
                      ? true
                      : false
                  }
                >
                  <>
                    <Text style={styles.titleEvent}>{item.name}</Text>
                    <Text style={styles.text}>{item.address}</Text>
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingVertical: 20,
    // borderWidth: 1
  },

  containerButtons: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  guestNumber: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleEvent: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
