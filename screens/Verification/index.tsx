import { StackScreenProps } from '@react-navigation/stack'
import { ReactNativeFile } from 'apollo-upload-client'
import ButtonAction from 'components/ButtonAction'
import LayoutScreen from 'components/LayoutScreen'
import styles from 'components/styles'
import GetPhoto from 'components/verification/GetPhoto'
import VerificationInfo from 'components/verification/VerificationInfo'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as mime from 'react-native-mime-types'
import {
  sendDataVerificationPassFn,
  sendVerification,
  sendVerificationPDF,
  serVerificationPhoto,
  verifyContactID
} from 'services/contact'
import { sendVerificationMRZ, serVerificationPass, serVerificationPDF } from 'services/verification'
import { IContact, verifiedData, verifiedDataPDF } from 'types/types'
import { Text, View } from '../../components/Themed'

type verificationPhase = 'select' | 'photo' | 'A' | 'B' | 'showInfo' | 'PASS_PHOTO'
type selectedDocument = '' | 'PDF' | 'MRZ' | 'PASS'

const getTitle = {
  photo: 'Tómate o sube una selfie',
  A: 'Lado A de tu documento',
  B: 'Lado B de tu documento',
  PASS_PHOTO: 'Toma o sube una foto de tu pasaporte'
}

const verification = ({ navigation, route }: StackScreenProps<any>) => {
  //#region  hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region states
  const [verificationInfo, setVerificationInfo] = useState<verifiedData | verifiedDataPDF>()
  const [selectedType, setSelectedType] = useState<selectedDocument>('')
  const [phase, setPhase] = useState<verificationPhase>('select')
  const [allPhotos, setAllPhotos] = useState<any>()
  const [loading, setLoading] = useState(false)
  //#endregion states
  //#region functions
  const toSendPhoto = {
    photo: async (photo: ReactNativeFile) => {
      await serVerificationPhoto({ photo })
      setAllPhotos({ photo })
      selectedType !== 'PASS' ? setPhase('A') : setPhase('PASS_PHOTO')
    },
    A: async (photo: ReactNativeFile) => {
      await serVerificationPhoto({ photo })
      setAllPhotos({ ...allPhotos, documentA: photo })
      setPhase('B')
    },
    PASS_PHOTO: async (photo: ReactNativeFile) => {
      var ok = false
      const result = await serVerificationPass({ photo })
      setVerificationInfo(result)
      ok = true
      if (ok) {
        setAllPhotos({ ...allPhotos, documentB: photo })
        setPhase('showInfo')
      }
    },
    B: async (photo: ReactNativeFile) => {
      var ok = false
      if (selectedType === 'MRZ') {
        const result = await sendVerificationMRZ({ photo })
        if (result.documentNumber) {
          setVerificationInfo({
            firstName: result.firstName,
            lastName: result.lastName,
            nationality: result.nationality,
            birthDate: result.birthDate,
            sex: result.sex,
            documentNumber: result.documentNumber,
            expirationDate: result.expirationDate
          })
          ok = true
        }
      }
      if (selectedType === 'PDF') {
        const result = await serVerificationPDF({ photo })
        if (result.licNum !== '') {
          setVerificationInfo({
            name: result.name,
            num1: result.num1,
            num2: result.num2,
            type: result.type,
            expedition: result.expedition,
            expiration: result.expiration,
            licNum: result.licNum
          })
          ok = true
        }
      }
      if (ok) {
        setAllPhotos({ ...allPhotos, documentB: photo })
        setPhase('showInfo')
      }
    }
  }

  const sendPhoto = async (uri: string) => {
    setLoading(true)
    var re = /(?:\.([^.]+))?$/
    const photo = new ReactNativeFile({
      uri: uri,
      type: mime.lookup(uri) || 'image',
      name: `foto-${Date.now()}${
        (re.exec(uri) as string[])?.length > 0 ? (re.exec(uri) as string[])[0] : '.jpg'
      }`
    })
    try {
      //@ts-ignore
      await toSendPhoto[phase](photo)
    } catch (error) {
      console.error(error)
      Alert.alert('Advertencia', 'No encontrado')
    } finally {
      setLoading(false)
    }
  }

  const handleType = (type: selectedDocument) => {
    setSelectedType(type)
    setPhase('photo')
  }

  const associateContact = async (contact: IContact) => {
    const toSend = { ...allPhotos, ...verificationInfo }
    if (selectedType === 'MRZ') {
      await sendVerification(toSend, contact._id as string)
    } else if (selectedType === 'PDF') {
      await sendVerificationPDF(toSend, contact._id as string)
    } else if (selectedType === 'PASS') {
      await sendDataVerificationPassFn(toSend, contact._id as string)
    }
    await verifyContactID(contact._id as string)
    navigation.goBack()
  }
  //#endregion functions

  return (
    <LayoutScreen
      title="Verificación"
      navigation={navigation}
      withoutSafeArea
      loading={loading}
      styleStatusBar="light"
    >
      <View style={{ ...styles.container, justifyContent: 'flex-start' }}>
        {phase === 'select' && (
          <>
            <View style={styles.containerText}>
              <Text style={{ ...styles.subTitle, color: Colors[colorScheme].text }}>Paso 1:</Text>
              <Text style={{ ...styles.text, color: Colors[colorScheme].text }}>
                Selecciona tipo de documento
              </Text>
            </View>

            <ButtonAction
              text={'DPI'}
              onPress={() => handleType('MRZ')}
              // onPress={}={() => <Entypo name="folder-images" size={24} color={Colors['dark'].text} />}
            />

            <ButtonAction
              text={'Pasaporte'}
              onPress={() => handleType('PASS')}
              // onPress={}={() => <Entypo name="folder-images" size={24} color={Colors['dark'].text} />}
            />
            <ButtonAction
              text={'Licencia'}
              onPress={() => handleType('PDF')}
              // onPress={}={() => <Entypo name="folder-images" size={24} color={Colors['dark'].text} />}
            />
          </>
        )}
        {(phase === 'A' || phase === 'B' || phase === 'photo' || phase === 'PASS_PHOTO') && (
          <>
            <View style={styles.containerText}>
              <Text style={{ ...styles.subTitle, color: Colors[colorScheme].text }}>Paso 2:</Text>
              <Text style={{ ...styles.text, color: Colors[colorScheme].text }}>
                {getTitle[phase]}
              </Text>
            </View>
            <GetPhoto sendPhoto={sendPhoto} />
          </>
        )}
        {phase === 'showInfo' && verificationInfo && (
          <>
            <VerificationInfo
              navigation={navigation}
              associateContact={associateContact}
              passport={!allPhotos.documentA}
              images={{
                photo: allPhotos?.photo?.uri,
                documentA: allPhotos?.documentA?.uri,
                documentB: allPhotos?.documentB?.uri
              }}
              data={{ ...allPhotos, ...verificationInfo }}
            />

            {/* {user && (
              <AddVerificationToContact modalRef={modalRef} associateContact={associateContact} />
            )} */}
          </>
        )}
      </View>
    </LayoutScreen>
  )
}

export default React.memo(verification)
