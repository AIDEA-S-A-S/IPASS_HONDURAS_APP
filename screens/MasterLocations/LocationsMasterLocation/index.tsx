import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useAuth from 'providers/AuthContext'
import React from 'react'
import { StyleSheet, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { RootMasterLocationScreenProp } from 'types'
import { ILocation } from 'types/types'
import { convertTotable } from 'utils/utils'

export default function LocacionesMasterLocation({
  navigation,
  route
}: RootMasterLocationScreenProp<'LocationsMasterLocations'>) {
  //#region provider
  const { permissions } = useAuth()
  //#endregion provider
  const data = convertTotable<ILocation>(route.params?.masterLocation.location as ILocation[])

  return (
    <>
      <LayoutScreen
        withoutSafeArea
        navigation={navigation}
        styleStatusBar="light"
        title={`Locaciones de la Locación maestra: ${route.params?.masterLocation.name}`}
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
              renderItem={({ item }: { item: ILocation }) => (
                <CardComponent
                  onPress={() => {
                    // navigation.navigate()
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
