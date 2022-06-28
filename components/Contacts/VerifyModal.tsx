import ButtonAction from 'components/ButtonAction'
import VerificationInfo from 'components/verification/VerificationInfo'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import useAuth from 'providers/AuthContext'
import React, { useRef } from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { Portal } from 'react-native-portalize'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Toast from 'react-native-toast-message'
import { verifyContactID } from 'services/contact'
import { IContact, verifiedData } from 'types/types'
const VerifyModal = ({
  actualContact,
  getData
}: {
  actualContact: IContact
  getData: () => void
}) => {
  const colorScheme = useColorScheme()
  const modalRef = useRef<IHandles>(null)
  const { setLoading } = useAuth()
  const data = actualContact.verifiedData?.documentNumber
    ? actualContact.verifiedData
    : actualContact.verifiedDataPDF
  const publicS3 = 'https://ipass-oac.s3.amazonaws.com'
  const verify = async () => {
    setLoading(true)
    try {
      await verifyContactID(actualContact._id as string)
      getData()
      modalRef.current?.close()
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Contacto',
        text2: 'Ocurrió un error inesperado'
      })
    }
    setLoading(false)
  }
  return (
    <>
      <Portal>
        <Modalize
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          disableScrollIfPossible
          modalHeight={Dimensions.get('screen').height * 0.8}
          ref={modalRef}
          modalStyle={{ backgroundColor: Colors[colorScheme].backgroundModal }}
          handlePosition="outside"
        >
          <>
            <VerificationInfo
              images={{
                photo: `${publicS3}/${(data as verifiedData)?.photo?.key as string}`,
                documentA: `${publicS3}/${(data as verifiedData)?.documentA?.key as string}`,
                documentB: `${publicS3}/${(data as verifiedData)?.documentB?.key as string}`
              }}
              data={data}
            />
            <ButtonAction text="Autenticar" mode="dark" onPress={verify} />
          </>
        </Modalize>
      </Portal>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.open()
        }}
        style={styles.buttonWithText}
      >
        <Image style={styles.gif} source={require('../../assets/parpadeo.gif')} />
      </TouchableOpacity>
    </>
  )
}

export default VerifyModal
const styles = StyleSheet.create({
  buttonWithText: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gif: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    resizeMode: 'cover'
  }
})
