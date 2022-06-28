import { AntDesign, Feather } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import CardComponent from 'components/CardComponent'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import { Text, View } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { Alert, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { getAllContactUser } from 'services/contact'
import { createInvitation, getAllInvitationByEvent } from 'services/invitationEvent'
import { IContact, InvitationEvent } from 'types/types'
import { capitalize, getDate, getHour } from 'utils/utils'
import Modal from 'react-native-modal'

const index = ({ navigation, route }: StackScreenProps<any>) => {
  //#region states
  const [allGuest, setAllGuest] = useState<InvitationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [contacts, setContacts] = useState<IContact[]>([])
  //#endregion states

  //#region  effect
  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region  functions
  const getData = async () => {
    try {
      const guests = await getAllInvitationByEvent(route?.params?.event?._id)
      const contacts = await getAllContactUser()
      setAllGuest(guests)
      setContacts(contacts.filter(e => !guests.find(j => (j.contact as IContact)._id === e._id)))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const HandleCloseModal = () => {
    setOpen(false)
  }

  const askToSend = (contact: IContact) => {
    Alert.alert(`¿Deseas invitar a ${contact?.firstName}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => sendInvitation(contact)
      }
    ])
  }

  const sendInvitation = async (contact: IContact) => {
    setOpen(false)
    setLoading(true)
    try {
      await createInvitation({
        event: route?.params?.event?._id as string,
        contact: contact._id,
        confirmed: false,
        alreadySendInvitation: false
      })
      getData()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  //#endregion funcitons

  return (
    <>
      <LayoutScreen
        loading={loading}
        title={`Invitados del evento: ${route?.params?.event.name} `}
        withoutSafeArea
        navigation={navigation}
        styleStatusBar="light"
        createAction={() => setOpen(true)}
      >
        <VirtualizedList
          style={{ width: '100%' }}
          data={allGuest}
          contentContainerStyle={{ width: '100%' }}
          getItemCount={data => data.length}
          getItem={(data, index) => ({ ...data[index] })}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }: { item: InvitationEvent; index: number }) => {
            return (
              <CardComponent showButtonAction={false}>
                <>
                  <Text style={styles.mainTitle}>{`${capitalize(
                    (item.contact as IContact)?.firstName
                  )} ${capitalize((item.contact as IContact)?.lastName)}`}</Text>
                  <View style={styles.containerText}>
                    <Text style={styles.subTitle}>E-mail:</Text>
                    <Text style={styles.text}>{(item.contact as IContact)?.email}</Text>
                  </View>
                  <View style={styles.containerText}>
                    <Text style={styles.subTitle}>Teléfono:</Text>
                    <Text style={styles.text}>{(item.contact as IContact)?.phone}</Text>
                  </View>
                  {item.isIn && (
                    <View style={styles.containerText}>
                      <Text style={{ ...styles.text, marginRight: 8 }}>{getDate(item.hourIn)}</Text>
                      <Text style={{ ...styles.text }}>{getHour(item.hourIn)}</Text>
                    </View>
                  )}

                  {item.confirmed && (
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Confirmado: </Text>
                      <View style={styles.containerIcon}>
                        <AntDesign name="checkcircleo" size={RFPercentage(2.5)} color="green" />
                      </View>
                    </View>
                  )}
                  {(item.contact as IContact)?.verified && (
                    <View style={styles.containerText}>
                      <Text style={styles.subTitle}>Contacto verificado:</Text>
                      <View style={styles.containerIcon}>
                        <Feather name="shield" size={RFPercentage(2.5)} color="green" />
                      </View>
                    </View>
                  )}
                </>
              </CardComponent>
            )
          }}
        />
      </LayoutScreen>
      <Modal
        isVisible={open}
        onBackButtonPress={HandleCloseModal}
        onBackdropPress={HandleCloseModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0.7}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.text2}>Selecciona el contacto que deseas invitar</Text>
          {contacts && (
            <VirtualizedList
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
              data={contacts}
              contentContainerStyle={{ width: '100%' }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IContact }) => (
                <CardComponent
                  showButtonAction={false}
                  onPress={() => {
                    askToSend(item)
                  }}
                >
                  <>
                    <Text style={styles.subTitle}>
                      {capitalize(item.firstName)} {capitalize(item.lastName)}
                    </Text>
                    <Text style={styles.text}>{item.email}</Text>
                  </>
                </CardComponent>
              )}
            />
          )}
        </View>
      </Modal>
    </>
  )
}

export default React.memo(index)
