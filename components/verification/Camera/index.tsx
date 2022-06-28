import { AntDesign } from '@expo/vector-icons'
import ButtonAction from 'components/ButtonAction'
import { Text, View } from 'components/Themed'
import { Camera } from 'expo-camera'
import React, { useEffect, useRef, useState } from 'react'
import { Modal, TouchableOpacity } from 'react-native'
import styles from './styles'

const CameraComponent = ({ sendPhoto }: { sendPhoto: (photo: string) => void }) => {
  //#region ref
  const cameraRef = useRef<Camera>(null)
  //#endregion ref

  //#region states
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [showCamera, setShowCamera] = useState<boolean>(false)
  const [typeCamera, setTypeCamera] = useState<'back' | 'front'>('back')
  //#endregion states

  //#region effect
  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])
  //#endregion effect

  //#region  fuctions
  const takePhoto = async () => {
    const filePhoto = await cameraRef.current?.takePictureAsync()
    setShowCamera(false)
    filePhoto && sendPhoto(filePhoto.uri)
  }

  const switchCamera = async () => {
    setTypeCamera(typeCamera === 'back' ? 'front' : 'back')
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a cámara</Text>
  }
  //#endregion functions

  return (
    <>
      <ButtonAction
        text={'Tomar foto'}
        onPress={() => {
          setShowCamera(true)
        }}
        icon="camera-outline"
      />
      <Modal presentationStyle={'fullScreen'} animationType="slide" visible={showCamera}>
        <Camera type={typeCamera} ratio={'16:9'} ref={cameraRef} style={styles.containerCamera}>
          <TouchableOpacity
            onPress={() => {
              setShowCamera(false)
            }}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto} style={styles.cameraButton}>
            <AntDesign name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={switchCamera} style={styles.switchButton}>
            <AntDesign name="retweet" size={24} color="white" />
          </TouchableOpacity>
        </Camera>
      </Modal>
    </>
  )
}

export default React.memo(CameraComponent)
