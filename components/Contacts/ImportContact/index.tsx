import { AntDesign } from '@expo/vector-icons'
import { Input } from '@ui-kitten/components'
import ButtonAction from 'components/ButtonAction'
import CardComponent from 'components/CardComponent'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import * as Contacts from 'expo-contacts'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC, useEffect, useState } from 'react'
import { Alert, Modal, Pressable, VirtualizedList } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { iProps } from './props.interface'
import styles from './styles'

const index: FC<iProps> = ({ setNewContact }) => {
  const commonProps = { placeholderTextColor: '#ACACAC', style: styles.input, size: 'large' }

  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region state
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [searchedContact, setSearchedContact] = useState<Contacts.Contact[]>()
  const [contacts, setContacts] = useState<Contacts.Contact[]>()
  //#endregion states

  //#region effect
  useEffect(() => {
    getContacts()
  }, [])
  //#endregion effect

  //#region functions

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails]
      })
      setSearchedContact(
        data.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
      )
      setContacts(
        data.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
      )
    }
  }

  const HandleCloseModal = () => {
    setModalVisibility(false)
  }

  const acept = (item: Contacts.Contact) => {
    setNewContact(item)
    HandleCloseModal()
  }

  const openedModal = () => {
    if (contacts) {
      setModalVisibility(true)
    }
  }

  const onSearch = (value: string) => {
    value !== ''
      ? setSearchedContact(
          contacts &&
            contacts.filter(e =>
              `${e.firstName?.toLowerCase()} ${e.lastName?.toLowerCase()}`.includes(
                value.toLowerCase()
              )
            )
        )
      : setSearchedContact(contacts)
  }

  const onConfirm = (item: Contacts.Contact) => {
    Alert.alert(`¿Deseas agregar el contacto ${item?.name}?`, ' ', [
      {
        text: 'Cancelar',
        style: 'destructive'
      },
      {
        text: 'Aceptar',
        onPress: () => acept(item),
        style: 'default'
      }
    ])
  }

  //#endregion functions

  return (
    <>
      <Modal animationType="slide" visible={modalVisibility} presentationStyle="pageSheet">
        <View>
          <View style={styles.containerClose}>
            <Input onChangeText={onSearch} {...commonProps} placeholder={'Buscar'} />
            <Pressable onPress={HandleCloseModal}>
              <AntDesign
                style={{ marginLeft: 8 }}
                name="closecircleo"
                size={RFPercentage(3)}
                color={Colors[colorScheme]['color-primary-100']}
              />
            </Pressable>
          </View>
        </View>

        {searchedContact && (
          <VirtualizedList
            style={{ ...styles.containerList, backgroundColor: Colors[colorScheme].background }}
            contentContainerStyle={styles.containerItem}
            data={searchedContact}
            getItemCount={data => data.length}
            getItem={(data, index) => ({ ...data[index] })}
            renderItem={({ item }: { item: Contacts.Contact }) => (
              <CardComponent
                onPress={() => {
                  onConfirm(item)
                }}
                showButtonAction={false}
              >
                <View style={styles.containerContact}>
                  <Text numberOfLines={1} style={{ ...styles.subTitle, flex: 1 }}>
                    {item.name}
                  </Text>
                </View>
              </CardComponent>
            )}
          />
        )}
      </Modal>
      <ButtonAction
        text={'Importar Contacto'}
        onPress={openedModal}
        status="primary"
        mode={'dark'}
      />
    </>
  )
}

export default React.memo(index)
