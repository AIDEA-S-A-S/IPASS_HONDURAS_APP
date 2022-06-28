import ButtonAction from 'components/ButtonAction'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'

const GetImage = ({ sendPhoto }: { sendPhoto: (photo: string) => void }) => {
  const getPhoto = async () => {
    const filePhoto = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1
    })
    if (!filePhoto.cancelled) {
      sendPhoto(filePhoto.uri)
    }
  }
  return <ButtonAction text={'Subir foto'} onPress={getPhoto} icon="cloud-upload-outline" />
}

export default React.memo(GetImage)
