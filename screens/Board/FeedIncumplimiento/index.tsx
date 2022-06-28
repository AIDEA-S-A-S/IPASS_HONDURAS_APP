import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { Text, View } from 'components/Themed'
import moment from 'moment-timezone'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { Alert, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllBreach2Days, unBanUserFn } from 'services/breach'
import { IBreach, ILocation } from 'types/types'
import { capitalize, getTime } from 'utils/utils'
const index = ({ navigation, route }: StackScreenProps<any>) => {
  //#region provider
  const { permissions } = useAuth()
  //#endregion provider

  //#region  states
  const [data, setData] = useState<IBreach[]>([])
  const [refreshing, _] = React.useState(false)
  const [loading, setLoading] = useState(false)
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

  //#region  functions
  const getData = async () => {
    setLoading(true)
    try {
      const breachs = await getAllBreach2Days()
      setData(breachs)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const askToUnBan = (name: string, _id: string) => {
    Alert.alert(`¿Deseas desbanear a ${name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => unBanUser(_id)
      }
    ])
  }

  const unBanUser = async (_id: string) => {
    setLoading(true)
    try {
      await unBanUserFn({ _id })
      getData()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //#endregion functions

  return (
    <>
      <LayoutScreen
        loading={loading}
        navigation={navigation}
        {...(permissions?.name === 'super_anfitrion' && {
          createAction: () => navigation.navigate('EventsExpressCrud')
        })}
        // actionFilter={() => modalRef.current?.open()}
        title="Feed de incumplimiento"
        header
        // titleCreate={moment().locale('es').format('dddd DD MMMM')}
      >
        <View style={styles.container}>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              refreshing={refreshing}
              onRefresh={getData}
              contentContainerStyle={{ width: '100%' }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IBreach; index: number }) => {
                return (
                  <CardComponent
                    showButtonAction={false}
                    // style={styles.containerList}
                    onPress={() => {
                      if (
                        item.user &&
                        item.user.banFinish &&
                        moment.tz('America/Guatemala').isAfter(item.user.banFinish) === false
                      ) {
                        askToUnBan(`${capitalize(item.user.name)}`, item._id as string)
                      } else if (
                        item.worker &&
                        item.worker.banFinish &&
                        moment.tz('America/Guatemala').isAfter(item.worker.banFinish) === false
                      ) {
                        askToUnBan(`${capitalize(item.worker.name)}`, item._id as string)
                      } else if (
                        item.contact &&
                        item.contact.banFinish &&
                        moment.tz('America/Guatemala').isAfter(item.contact.banFinish) === false
                      ) {
                        askToUnBan(`${capitalize(item.contact.firstName)}`, item._id as string)
                      }
                    }}
                  >
                    <>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Fecha:</Text>
                        <Text style={styles.text}>{getTime(item.createdAt)}</Text>
                      </View>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Grado:</Text>
                        <Text style={styles.text}>{item.grade}</Text>
                      </View>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Locación:</Text>
                        <Text style={styles.text}>{(item?.location as ILocation)?.name}</Text>
                      </View>
                      {item.user && (
                        <>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Tipo:</Text>
                            <Text style={styles.text}>Usuario Interno</Text>
                          </View>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Usuario:</Text>
                            <Text style={styles.text}>{`${capitalize(
                              item?.user?.name
                            )} ${capitalize(item?.user?.lastname)}`}</Text>
                          </View>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Estado:</Text>
                            {item.user.banFinish &&
                            !moment.tz('America/Guatemala').isAfter(item.user.banFinish) ? (
                              <AntDesign
                                name="clockcircle"
                                size={RFPercentage(2.5)}
                                color={'white'}
                              />
                            ) : (
                              <AntDesign
                                name="checkcircle"
                                size={RFPercentage(2.5)}
                                color={'white'}
                              />
                            )}
                          </View>
                        </>
                      )}
                      {item.worker && (
                        <>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Tipo:</Text>
                            <Text style={styles.text}>Trabajador</Text>
                          </View>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Usuario:</Text>
                            <Text style={styles.text}>{`${capitalize(
                              item?.worker?.name
                            )} ${capitalize(item?.worker?.lastname)}`}</Text>
                          </View>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Estado:</Text>
                            {item.worker.banFinish &&
                            !moment.tz('America/Guatemala').isAfter(item.worker.banFinish) ? (
                              <AntDesign
                                name="clockcircle"
                                size={RFPercentage(2.5)}
                                color={'white'}
                              />
                            ) : (
                              <AntDesign
                                name="checkcircle"
                                size={RFPercentage(2.5)}
                                color={'white'}
                              />
                            )}
                          </View>
                        </>
                      )}
                      {item.contact && (
                        <>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Tipo:</Text>
                            <Text style={styles.text}>Contacto</Text>
                          </View>
                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Usuario:</Text>
                            <Text style={styles.text}>{`${capitalize(
                              item?.contact?.firstName
                            )} ${capitalize(item?.contact?.lastName)}`}</Text>
                          </View>

                          <View style={styles.containerText}>
                            <Text style={styles.subTitle}>Estado:</Text>
                            {item.contact.banFinish &&
                            !moment.tz('America/Guatemala').isAfter(item.contact.banFinish) ? (
                              <FontAwesome name="ban" size={RFPercentage(2.5)} color={'white'} />
                            ) : (
                              <AntDesign
                                name="checkcircle"
                                size={RFPercentage(2.5)}
                                color={'white'}
                              />
                            )}
                          </View>
                        </>
                      )}
                    </>
                  </CardComponent>
                )
              }}
            />
          )}
        </View>
      </LayoutScreen>
    </>
  )
}

export default React.memo(index)
