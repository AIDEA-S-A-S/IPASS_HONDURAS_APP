import ButtonAction from 'components/ButtonAction'
import CardComponent from 'components/CardComponent'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { Dimensions, Platform, StyleSheet, VirtualizedList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllEventsUser } from 'services/events'
import { createInvitation } from 'services/invitationEvent'
import { IContact, IEvent } from 'types/types'
import { elevationShadowStyle, getTime } from 'utils/utils'
const ModalSendInvitationContact = ({
  record,
  modalRef,
  getDataParent
}: {
  record: IContact
  modalRef: React.RefObject<IHandles>
  getDataParent: () => void
}) => {
  const colorScheme = useColorScheme()
  const [allEvents, setAllEvents] = useState<IEvent[]>([])
  const [searchedEvent, setsearchedEvent] = useState<IEvent[]>([])
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const { setLoading } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState<IEvent>()
  useEffect(() => {
    if (record) {
      getData()
    }
  }, [record])

  const getData = async () => {
    const event = await getAllEventsUser()
    setAllEvents(event)
    setsearchedEvent(event)
  }
  const onSearch = (value: string) => {
    value !== ''
      ? setsearchedEvent(allEvents && allEvents.filter(e => `${e.name?.toLowerCase()}`.includes(value.toLowerCase())))
      : setsearchedEvent(allEvents)
  }
  const sendInvitation = async () => {
    setLoading(true)
    setModalVisibility(false)
    await createInvitation({ event: selectedEvent?._id as string, contact: record._id as string, confirmed: false, alreadySendInvitation: false })
    modalRef.current?.close()
    getDataParent()
    setLoading(false)
  }
  const HandleCloseModal = () => {
    setModalVisibility(false)
  }

  return (
    <>
      <Modalize
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        disableScrollIfPossible
        modalHeight={Dimensions.get('screen').height * 0.7}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        ref={modalRef}
        modalStyle={{ backgroundColor: Colors[colorScheme].backgroundModal }}
        handlePosition="outside"
      >
        <View>
          <View style={styles.container}>
            <LinearGradient
              end={{ x: 0.0, y: 0.5 }}
              start={{ x: 1, y: 0.5 }}
              colors={Colors[colorScheme].gradientTartetMenu}
              style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
            >
              <TextInput style={styles.input} onChangeText={onSearch} placeholder={`buscar`} />
            </LinearGradient>
            <VirtualizedList
              style={{ width: '100%' }}
              data={searchedEvent}
              contentContainerStyle={{ width: '100%', padding: 10 }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IEvent; index: number }) => {
                return (
                  <CardComponent
                    showButtonAction={false}
                    style={styles.containerList}
                    onPress={() => {
                      setModalVisibility(true)
                      setSelectedEvent(item)
                    }}
                  >
                    <>
                      <Text style={styles.titleEvent}>{item.name}</Text>
                      <Text style={styles.text}>{item.location.address}</Text>
                      <Text style={styles.text}>Inicio: {getTime(item.start)}</Text>
                      <Text style={styles.text}>Fin: {getTime(item.end)}</Text>
                    </>
                  </CardComponent>
                )
              }}
            />
          </View>
        </View>
      </Modalize>
      <Modal
        onBackButtonPress={HandleCloseModal}
        onBackdropPress={HandleCloseModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        onSwipeComplete={HandleCloseModal}
        isVisible={modalVisibility}
        backdropOpacity={0.7}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: 'black' }}>Deseas invitar a evento:</Text>
            <Text style={{ color: 'black' }}>{`${selectedEvent?.name}`}</Text>
            <ButtonAction text="Aceptar" action={() => sendInvitation()} mode="dark" />
            <ButtonAction text="Cancelar" action={() => HandleCloseModal()} mode="dark" />
          </View>
        </View>
      </Modal>
    </>
  )
}

export default ModalSendInvitationContact
const styles = StyleSheet.create({
  mainContainer: {
    padding: 20
  },
  containerList: {
    height: Dimensions.get('screen').height * 0.15
  },
  container: {
    flex: 1,
    width: '100%',
    ...elevationShadowStyle(5),
    borderRadius: 20
  },
  gradiend: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: RFPercentage(2),
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 10,
    justifyContent: 'center'
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    marginVertical: 10
  },
  button: {
    width: '100%',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  icon: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerEvents: {
    backgroundColor: 'transparent'
  },
  titleEvent: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
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
