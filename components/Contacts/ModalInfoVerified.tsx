import { Feather } from '@expo/vector-icons'
import VerificationInfo from 'components/verification/VerificationInfo'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { useRef } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { IHandles } from 'react-native-modalize/lib/options'
import { Portal } from 'react-native-portalize'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { IContact, verifiedData } from 'types/types'
const ModalInfoVerified = ({ actualContact }: { actualContact: IContact }) => {
  const colorScheme = useColorScheme()
  const modalRef = useRef<IHandles>(null)
  const data = actualContact.verifiedData?.documentNumber
    ? actualContact.verifiedData
    : actualContact.verifiedDataPDF
  const publicS3 = 'https://ipass-oac.s3.amazonaws.com'

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
          <VerificationInfo
            images={{
              photo: `${publicS3}/${(data as verifiedData)?.photo?.key as string}`,
              documentA: `${publicS3}/${(data as verifiedData)?.documentA?.key as string}`,
              documentB: `${publicS3}/${(data as verifiedData)?.documentB?.key as string}`
            }}
            data={data}
          />
        </Modalize>
      </Portal>
      <TouchableOpacity
        onPress={() => {
          modalRef.current?.open()
        }}
        style={styles.buttonWithText}
      >
        <Feather name="shield" size={RFPercentage(3)} color={'green'} />
      </TouchableOpacity>
    </>
  )
}

export default ModalInfoVerified
const styles = StyleSheet.create({
  buttonWithText: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
