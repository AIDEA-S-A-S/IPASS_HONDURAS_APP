import { Text, View } from 'components/Themed'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect } from 'react'
import { Dimensions, Image, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

type PropsUploadPhoto = {
  text: string
  image: ImagePicker.ImagePickerResult
  img: string
  setImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult>>
}

const UploadPhoto = ({ text, image, setImage, img }: PropsUploadPhoto) => {
  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
      exif: true
    })
    if (!result.cancelled) {
      setImage(result)
    }
  }

  return (
    <View style={styles.containerUpload}>
      {img ? (
        <>
          <Image source={{ uri: img }} style={styles.image} />
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImage}>
            <Text style={styles.text}>{text}</Text>
            <Text>200x200</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={{ alignItems: 'center' }} onPress={pickImage}>
            <Image style={styles.icon} source={require('../../assets/images/icon_upload.png')} />
            <Text style={styles.text}>{text}</Text>
            <Text>200x200</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default React.memo(UploadPhoto)

const styles = StyleSheet.create({
  containerUpload: {
    height: Dimensions.get('screen').width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 10,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    borderStyle: 'dashed',
    padding: 20
  },
  icon: {
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').width * 0.3
  },
  image: {
    width: Dimensions.get('screen').width * 0.45,
    height: Dimensions.get('screen').width * 0.45,
    // borderWidth: 2,
    borderRadius: 20
  },
  text: {
    fontSize: RFPercentage(2)
  }
})
