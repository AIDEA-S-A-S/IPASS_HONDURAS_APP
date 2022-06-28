import { StackScreenProps } from '@react-navigation/stack'
import LayoutScreen from 'components/LayoutScreen'
import VerificationInfo from 'components/verification/VerificationInfo'
import React, { useState } from 'react'
import { verifyContactID } from 'services/contact'
import { verifiedData } from 'types/types'

const index = ({ navigation, route }: StackScreenProps<any>) => {
  const actualContact = route?.params?.contact

  //#region states
  const [loading, setLoading] = useState(false)
  //#endregion states

  //#region fuctions
  const data =
    actualContact?.typeVerified === 'DPI' || actualContact?.typeVerified === 'PASS'
      ? actualContact.verifiedData
      : actualContact.verifiedDataPDF
  const publicS3 = 'https://ipass-renap-oac.s3.amazonaws.com'

  const verify = async () => {
    setLoading(true)
    try {
      await verifyContactID(actualContact._id as string)
      navigation.goBack()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  //#endregion

  return (
    <LayoutScreen
      title="Información de verificación"
      navigation={navigation}
      withoutSafeArea
      loading={loading}
    >
      <VerificationInfo
        verify={verify}
        toAccept={route?.params?.toAccept}
        HideButtonsContact
        data={data}
        verificationRegistro={actualContact?.verificationRegistro}
        passport={!data.documentA}
        images={{
          photo: `${publicS3}/${(data as verifiedData)?.photo?.key as string}`,
          documentA: `${publicS3}/${(data as verifiedData)?.documentA?.key as string}`,
          documentB: `${publicS3}/${(data as verifiedData)?.documentB?.key as string}`
        }}
      />
    </LayoutScreen>
  )
}

export default React.memo(index)
