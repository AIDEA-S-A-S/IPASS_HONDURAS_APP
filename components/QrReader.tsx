import { Ionicons } from '@expo/vector-icons'
import ButtonAction from 'components/ButtonAction'
import { View } from 'components/Themed'
import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Modal, Platform, StyleSheet, Text } from 'react-native'
import BarcodeMask from 'react-native-barcode-mask'
import { Camera } from 'expo-camera'

const QrReader = ({ onChange }: { onChange: (...event: any[]) => void }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [showScan, setShowScan] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = (data: any) => {
    onChange(data.data)
    setShowScan(false)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <>
      <ButtonAction
        RenderIcon={(props: any) => {
          return <Ionicons {...props} name="qr-code" size={24} color="white" />
        }}
        text={'Iniciar sesión con IPASS'}
        onPress={() => setShowScan(true)}
        mode="dark"
        flexStart
      />
      <Modal presentationStyle={'pageSheet'} animationType="slide" visible={showScan}>
        <View style={styles.containerQr}>
          {Platform.OS === 'ios' ? (
            <BarCodeScanner
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          ) : (
            <Camera
              onBarCodeScanned={handleBarCodeScanned}
              barCodeScannerSettings={{
                barCodeTypes: ['qr']
              }}
              style={{ flex: 1 }}
            />
          )}

          <BarcodeMask edgeColor="#62B1F6" />

          <ButtonAction text="Cancelar" mode="dark" onPress={() => setShowScan(false)} />
        </View>
      </Modal>
    </>
  )
}

export default React.memo(QrReader)

const opacity = 'rgba(0, 0, 0, .6)'

const styles = StyleSheet.create({
  containerQr: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2000000000,
    justifyContent: 'flex-end',
    padding: 20
  },
  button: {
    width: '90%'
  },
  qrElement: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  }
})
