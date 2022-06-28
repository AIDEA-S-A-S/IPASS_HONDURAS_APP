import ButtonAction from 'components/ButtonAction'
import CardComponent from 'components/CardComponent'
import commonStyles from 'components/styles'
import { Text, View } from 'components/Themed'
import { capitalize } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { Alert, VirtualizedList } from 'react-native'
import Modal from 'react-native-modal'
import { listContactWithOutVerifyFn } from 'services/contact'
import { IContact } from 'types/types'
import { iProps } from './props.interface'
import styles from './styles'

const AddVerificationToContact: FC<iProps> = ({ associateContact }) => {
  //#region  states
  const [searchedContacts, setSearchedContacts] = useState<IContact[]>()
  const [contacts, setContacts] = useState<IContact[]>()
  const [modalVisibility, setModalVisibility] = useState(false)
  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region functions
  const getData = async () => {
    const contacts = await listContactWithOutVerifyFn()
    setContacts(contacts)
    setSearchedContacts(contacts)
  }
  const onSearch = (value: string) => {
    value !== ''
      ? setSearchedContacts(
          contacts &&
            contacts.filter(e =>
              `${e.firstName?.toLowerCase()} ${e.lastName?.toLowerCase()}`.includes(
                value.toLowerCase()
              )
            )
        )
      : setSearchedContacts(contacts)
  }

  const HandleCloseModal = () => {
    setModalVisibility(false)
  }

  const toAssociente = (contact: IContact) => {
    Alert.alert(
      `¿Deseas Asociar la verificación a ${capitalize(contact.firstName)} ${capitalize(
        contact.lastName
      )} `,
      ' ',
      [
        {
          text: 'Cancelar',
          style: 'destructive'
        },
        {
          text: 'Aceptar',
          onPress: () => associateContact(contact)
        }
      ]
    )
    HandleCloseModal()
  }

  //#endregion functions

  return (
    <>
      <Modal
        isVisible={modalVisibility}
        onBackButtonPress={HandleCloseModal}
        onBackdropPress={HandleCloseModal}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        backdropOpacity={0.7}
      >
        <View style={styles.mainContainer}>
          <Text style={styles.text}>
            Selecciona el contacto al que deseas asociar la verificación
          </Text>
          {contacts && (
            <VirtualizedList
              style={{ width: '100%' }}
              data={contacts}
              contentContainerStyle={{ width: '100%' }}
              getItemCount={data => data.length}
              getItem={(data, index) => ({ ...data[index] })}
              renderItem={({ item }: { item: IContact }) => (
                <CardComponent
                  showButtonAction={false}
                  onPress={() => {
                    toAssociente(item)
                  }}
                >
                  <>
                    <Text style={commonStyles.subTitle}>
                      {capitalize(item.firstName)} {capitalize(item.lastName)}
                    </Text>
                    <Text style={commonStyles.text}>{item.email}</Text>
                  </>
                </CardComponent>
              )}
            />
          )}
        </View>
      </Modal>
      <ButtonAction
        icon="person-outline"
        text="Asociar a contacto existente"
        onPress={() => setModalVisibility(true)}
      />
    </>
  )
}

export default React.memo(AddVerificationToContact)
