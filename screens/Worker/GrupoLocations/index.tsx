import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import TextToShowData from 'components/TextToShowData'
import Colors from 'constants/Colors'
import _ from 'lodash'
import React from 'react'
import { StyleSheet, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { IGroupWorker, ILocation } from 'types/types'
import { convertTotable } from 'utils/utils'
import { Text, View } from '../../../components/Themed'
import commonStyles from '../../../components/styles'
import useColorScheme from 'hooks/useColorScheme'
export default function Locaciones({ navigation, route }: StackScreenProps<any>) {
  const groups: IGroupWorker[] = route.params?.group
  const data = convertTotable<ILocation>(_.flattenDeep(groups.map(e => e.location)))
  console.log(groups)
  const colorScheme = useColorScheme()
  return (
    <>
      <LayoutScreen withoutSafeArea navigation={navigation} title="Grupos de locaciones">
        <View style={styles.container}>
          {groups.map(e => (
            <TextToShowData title={e.name} text={e?.abbreviation} />
          ))}
          <Text style={{ ...commonStyles.mainTitle, color: Colors[colorScheme].text }}>
            Locaciones
          </Text>
          {data && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={data}
              contentContainerStyle={{ width: '100%', paddingBottom: 100 }}
              getItemCount={data => data.length}
              showsVerticalScrollIndicator={false}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: ILocation }) => (
                <CardComponent>
                  <>
                    <Text style={styles.titleEvent}>{item?.name}</Text>
                    <Text style={styles.text}>{item?.address}</Text>
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
    // alignItems: 'center',
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
