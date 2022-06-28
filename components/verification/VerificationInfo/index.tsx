import ButtonAction from 'components/ButtonAction'
import ImageGallery from 'components/ImageGallery'
import TextToShowData from 'components/TextToShowData'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { verifiedData, verifiedDataPDF } from 'types/types'
import AddVerificationToContact from '../AddVerificationToContact'
import { IProps } from './props.interface'
import styles from './styles'

const VerificationInfo: FC<IProps> = ({
  data,
  images,
  HideButtonsContact,
  toAccept,
  verify,
  associateContact,
  navigation,
  passport,
  verificationRegistro
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container_main_info}>
      {(data as verifiedData).documentNumber ? (
        <>
          {!verificationRegistro && (
            <>
              <TextToShowData title="Nombre" text={(data as verifiedData)?.firstName} />
              <TextToShowData title="Apellido" text={(data as verifiedData)?.lastName} />
              <TextToShowData title="Número DPI" text={(data as verifiedData)?.documentNumber} />
              <TextToShowData
                title="Fecha de expiración"
                text={(data as verifiedData)?.expirationDate}
              />
              <TextToShowData title="Género" text={(data as verifiedData)?.sex} />
              <TextToShowData title="Nacionalidad" text={(data as verifiedData)?.nationality} />
              <TextToShowData
                title="Fecha de nacimiento"
                text={(data as verifiedData)?.birthDate}
              />
            </>
          )}

          <ImageGallery title="Foto" uri={images.photo} />

          {!passport && <ImageGallery title="Foto Documento Delantera" uri={images.documentA} />}
          <ImageGallery
            title={passport ? 'Foto de pasaporte' : 'Foto Documento Trasera'}
            uri={images.documentB}
          />
        </>
      ) : (
        <>
          {!verificationRegistro && (
            <>
              <TextToShowData title="Nombre" text={(data as verifiedDataPDF)?.name} />
              <TextToShowData title="Número de licencia" text={(data as verifiedDataPDF)?.licNum} />
              <TextToShowData
                title="Fecha de Expiración"
                text={(data as verifiedDataPDF)?.expiration}
              />
              <TextToShowData
                title="Fecha de expedición"
                text={(data as verifiedDataPDF)?.expedition}
              />
              <TextToShowData title="Tipo de licencia" text={(data as verifiedDataPDF)?.type} />
              <TextToShowData title="Tipo de licencia" text={(data as verifiedDataPDF)?.type} />
            </>
          )}

          <ImageGallery title="Foto" uri={images?.photo} />
          <ImageGallery title="Foto licencia Delantera" uri={images.documentA} />
          <ImageGallery title="Foto licencia Trasera" uri={images.documentB} />
        </>
      )}
      {toAccept && (
        <ButtonAction
          icon="checkmark-circle-2-outline"
          text="Aceptar verificación"
          // @ts-ignore
          onPress={() => verify()}
        />
      )}
      {!HideButtonsContact && (
        <>
          {/* @ts-ignore */}
          <AddVerificationToContact associateContact={associateContact} />
          <ButtonAction
            icon="person-add-outline"
            text="Agregar contacto nuevo"
            // @ts-ignore
            onPress={() => navigation.navigate('ContactCrud', { data })}
          />
        </>
      )}
    </ScrollView>
  )
}

export default React.memo(VerificationInfo)
