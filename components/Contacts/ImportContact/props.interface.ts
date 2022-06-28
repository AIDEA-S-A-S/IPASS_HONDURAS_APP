import * as Contacts from 'expo-contacts'

export interface iProps {
  setNewContact: React.Dispatch<React.SetStateAction<Contacts.Contact | undefined>>
}
