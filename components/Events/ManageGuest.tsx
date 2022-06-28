import { AntDesign, Feather } from '@expo/vector-icons'
import ButtonAction from 'components/ButtonAction'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import Layout from 'constants/Layout'
import { LinearGradient } from 'expo-linear-gradient'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useState } from 'react'
import { Dimensions, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllContactUser } from 'services/contact'
import { createInvitation, deleteInvitation, getAllInvitationByEvent } from 'services/invitationEvent'
import { IContact, IEvent, InvitationEvent } from 'types/types'
import { capitalize, elevationShadowStyle } from '../../utils/utils'
const ManageGuest = ({ record, modalRef }: { record?: IEvent; modalRef: React.RefObject<IHandles> }) => {
  const [searchedGuest, setSearchedGuest] = useState<IContact[]>()
  const [guestUsers, setGuestUsers] = useState<IContact[]>()
  const [invitation, setInvitation] = useState<InvitationEvent[]>([])
  const colorScheme = useColorScheme()
  const [modalVisibility, setModalVisibility] = useState(false)
  const [actualInvitation, setActualInvitation] = useState<{ user: IContact; checked: boolean; pos: number }>()
  //provider
  const { setLoading } = useAuth()

  useEffect(() => {
    if (record) {
      getData()
    }
  }, [record])

  const getData = async () => {
    const guestUsers = await getAllContactUser()
    setInvitation(await getAllInvitationByEvent(record?._id as string))
    setGuestUsers(guestUsers)
    setSearchedGuest(guestUsers)
  }
  const onSearch = (value: string) => {
    value !== ''
      ? setSearchedGuest(
          guestUsers && guestUsers.filter(e => `${e.firstName?.toLowerCase()} ${e.lastName?.toLowerCase()}`.includes(value.toLowerCase()))
        )
      : setSearchedGuest(guestUsers)
  }

  const assignGuest = async (user: any, checked: any, pos: any) => {
    setModalVisibility(false)
    setLoading(true)
    if (!checked) {
      await createInvitation({ event: record?._id as string, contact: user._id as string, confirmed: false, alreadySendInvitation: false })
      getData()
    } else {
      await deleteInvitation(invitation[pos]._id as string)
      getData()
    }
    setLoading(false)
  }
  const HandleCloseModal = () => {
    setModalVisibility(false)
  }
  return (
    <>
      <Modalize
        // scrollViewProps={{ showsVerticalScrollIndicator: true }}
        modalHeight={Dimensions.get('screen').height * 0.7}
        keyboardAvoidingBehavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        ref={modalRef}
        modalStyle={{ backgroundColor: Colors[colorScheme].backgroundModal }}
        handlePosition="outside"
        // adjustToContentHeight
      >
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <LinearGradient
              end={{ x: 0.0, y: 0.5 }}
              start={{ x: 1, y: 0.5 }}
              colors={Colors[colorScheme].gradientTartetMenu}
              style={{ ...styles.gradiend, backgroundColor: Colors[colorScheme].backgrounItemList }}
            >
              <Text style={styles.title}>{`${capitalize(record?.name)} ${capitalize(record?.location?.name)}`}</Text>
              <TextInput style={styles.input} onChangeText={onSearch} placeholder={`buscar`} />
              {searchedGuest?.map((user, i) => {
                const pos = invitation.findIndex(e => (e?.contact as IContact)?._id === user._id)
                const checked = pos !== -1
                return (
                  <TouchableOpacity
                    style={styles.button}
                    key={i}
                    onPress={() => {
                      setActualInvitation({ user, checked, pos })
                      setModalVisibility(true)
                    }}
                  >
                    <Text numberOfLines={1} style={styles.text}>{`${user?.firstName} ${user.lastName} - ${user.email}`}</Text>
                    <View style={styles.icon}>
                      {/* {checked && invitation[pos].isIn && <Text style={styles.text}>{getTime(invitation[pos].hourIn)}</Text>} */}
                      {user.verified && (
                        <View style={styles.containerIcon}>
                          <Feather name="shield" size={RFPercentage(2)} color="green" />
                        </View>
                      )}

                      {checked && invitation[pos].confirmed && (
                        <View style={styles.containerIcon}>
                          <AntDesign name="checkcircleo" size={RFPercentage(2)} color="blue" />
                        </View>
                      )}
                      {checked && (
                        <View style={styles.containerIcon}>
                          <AntDesign name="checkcircleo" size={RFPercentage(2)} color="green" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </LinearGradient>
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
            <Text>{!actualInvitation?.checked ? 'Deseas invitar :' : 'Deseas eliminar el invitado:'}</Text>
            <Text>{actualInvitation?.user?.firstName}</Text>
            <ButtonAction
              text="Aceptar"
              action={() => assignGuest(actualInvitation?.user, actualInvitation?.checked, actualInvitation?.pos)}
              mode="dark"
            />
            <ButtonAction text="Cancelar" action={() => HandleCloseModal()} mode="dark" />
          </View>
        </View>
      </Modal>
    </>
  )
}

export default React.memo(ManageGuest)

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20
  },
  container: {
    flex: 1,
    width: '100%',
    ...elevationShadowStyle(5),
    borderRadius: 20
  },
  gradiend: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    color: Colors['dark'].text
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

  button: {
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    paddingVertical: 10
  },
  text: {
    fontSize: RFPercentage(2),
    color: Colors['dark'].text,
    marginVertical: 10,
    width: Layout.isTablet ? '80%' : '70%'
  },
  icon: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    width: '20%'
  },
  containerIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white'
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
