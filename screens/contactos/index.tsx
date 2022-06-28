import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import { Input } from '@ui-kitten/components'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { images } from 'constants/Image'
import useAuth from 'providers/AuthContext'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllContactUser, subscribeContactUser } from 'services/contact'
import { IContact, Privilege } from 'types/types'
import { capitalize, perNames } from 'utils/utils'
import { Text, View } from '../../components/Themed'

var uns: any

const ContactScreen = ({ navigation, route }: StackScreenProps<any>) => {
  const commonProps = { placeholderTextColor: '#ACACAC', style: styles.input, size: 'large' }

  //#region provider
  const { permissions, user } = useAuth()
  // #endregion provicer

  //#region states
  const [refreshing, _] = useState(false)
  const [data, setData] = useState<IContact[]>([])
  const [searchedData, setSearchedData] = useState<IContact[]>([])
  // const [searchedValue, setSearchedValue] = useState<string>('')
  const [loading, setLoading] = useState(true)
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

  useFocusEffect(
    useCallback(() => {
      uns = subscribeContactUser(
        (newData: boolean) => {
          // console.log('hi')
          getData()
          setLoading(false)
        },
        perNames.includes((permissions as Privilege).name as string) ? null : (user?._id as string)
      )
      return () => {
        if (uns && uns.unsubscribe) {
          uns.unsubscribe()
        }
      }
    }, [uns])
  )

  //#endregion effect

  //#region functions
  const getData = async () => {
    try {
      const contacts = await getAllContactUser()
      setSearchedData(contacts)
      setData(contacts)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onSearch = (value: string) => {
    value !== ''
      ? setSearchedData(data && data.filter(e => e?.DPI?.includes(value?.toLowerCase())))
      : setSearchedData(data)
  }
  //#endregion functions

  return (
    <>
      <LayoutScreen
        loading={loading}
        navigation={navigation}
        title="Tus Contactos"
        header
        createAction={() => navigation.navigate('ContactCrud')}
      >
        <>
          <View style={styles.container}>
            <Input onChangeText={onSearch} {...commonProps} placeholder={'Buscar'} />

            {data && (
              <VirtualizedList
                style={{ width: '100%' }}
                data={searchedData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
                getItemCount={data => data.length}
                getItem={(data, index) => ({ ...data[index] })}
                onRefresh={() => getData()}
                refreshing={refreshing}
                renderItem={({ item }: { item: IContact }) => (
                  <CardComponent
                    showButtonAction={false}
                    onPress={() => {
                      navigation.navigate('ContactScreen', { contact: item })
                    }}
                  >
                    {/* <View style={styles.}> */}
                    <>
                      <Text style={styles.mainTitle}>
                        {capitalize(item.firstName)} {capitalize(item.lastName)}
                      </Text>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>DPI: </Text>
                        <Text style={styles.text}>{item.DPI}</Text>
                      </View>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Email: </Text>
                        <Text style={styles.text}>{item.email}</Text>
                      </View>
                      <View style={styles.containerText}>
                        <Text style={styles.subTitle}>Teléfono</Text>
                        <Text style={styles.text}>{item.phone}</Text>
                      </View>
                      <View style={styles.containerText}></View>

                      {item.verified ? (
                        <View style={styles.containerIcon}>
                          <Feather name="shield" size={RFPercentage(2)} color="green" />
                        </View>
                      ) : (
                        (item.verifiedData !== null || item.verifiedDataPDF !== null) && (
                          <View style={styles.containerIcon}>
                            <Image
                              style={{ width: RFPercentage(2.5), resizeMode: 'contain' }}
                              source={images.parpadeo}
                            />
                          </View>
                        )
                      )}
                    </>
                  </CardComponent>
                )}
              />
            )}
          </View>
        </>
      </LayoutScreen>
    </>
  )
}

export default React.memo(ContactScreen)
