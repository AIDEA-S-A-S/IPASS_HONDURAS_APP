import { StackScreenProps } from '@react-navigation/stack'
import SelectLocation from 'components/GenerateQR/SelectLocation'
import LayoutScreen from 'components/LayoutScreen'
import { View } from 'components/Themed'
import useAuth from 'providers/AuthContext'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import QRCode from 'react-native-qrcode-generator'
import { RFPercentage } from 'react-native-responsive-fontsize'
import _ from 'lodash'
import { getInfoQRHost } from 'services/invitationEvent'
import { ILocation, IWorker } from 'types/types'
import { generateNewTemporalQRFn } from 'services/workers'
import { typeQr } from 'types/valuesAddQr'

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(callback)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current()
    }, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default function GenerateQR({ navigation, route }: StackScreenProps<any>) {
  const startTime = 30
  const { user, worker } = useAuth()
  //#region states
  const [time, setTime] = useState<number>(startTime)
  const [showQr, setShowQr] = useState(false)
  const [QrText, setQrText] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<ILocation>()
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  //#endregion states

  //#region effect
  useEffect(() => {
    if (selectedLocation) {
      GenerateQR()
    }
  }, [selectedLocation])

  useEffect(() => {
    setProgress(time / startTime)
  }, [time])
  //#endregion effect

  //#region functions

  const GenerateQR = async () => {
    try {
      if (worker) {
        const qr = await generateNewTemporalQRFn(
          user?._id as string,
          selectedLocation?._id as string
        )
        setQrText(`${typeQr.worker_temporal}-${qr.QR}`)
        setShowQr(true)
        setIsValid(true)
        setLoading(false)
      } else {
        setLoading(true)
        const qr = await getInfoQRHost(user?._id as string, selectedLocation?._id as string)
        setQrText(`${typeQr.user_temporal}-${qr.QR}`)
        setShowQr(true)
        setIsValid(true)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useInterval(() => {
    if (showQr && isValid) {
      setTime(time - 1)
      if (time - 1 === 0) {
        setIsValid(false)
        setShowQr(false)
        setTime(30)
        setSelectedLocation(undefined)
      }
    }
  }, 1000)
  //#region functions

  return (
    <LayoutScreen
      loading={loading}
      navigation={navigation}
      withoutSafeArea
      // titleCreate="Generar QR temporal para ingreso"
      title="Generar QR temporal para ingreso"
      styleStatusBar="light"
    >
      <View style={styles.container}>
        {showQr && isValid && (
          <>
            <View style={styles.containerQr}>
              <QRCode
                value={QrText}
                size={Dimensions.get('screen').width * 0.85}
                bgColor="black"
                fgColor="white"
              />
            </View>
            <Progress.Circle
              style={{ marginTop: 10, alignSelf: 'center' }}
              color={'#E4661B'}
              formatText={() => time}
              showsText
              progress={progress}
              size={100}
            />
          </>
        )}
        {!showQr && !isValid && (
          <>
            <SelectLocation
              locations={_.uniqBy(
                [
                  ..._.flatten(user?.group?.map(e => e.location)),
                  ...(user as IWorker).nativeLocation
                ],
                e => e?._id
              )}
              setSelectedLocation={setSelectedLocation}
            />
          </>
        )}
      </View>
    </LayoutScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
    // borderWidth: 1
  },
  timer: {
    fontSize: RFPercentage(5),
    marginTop: 15
  },
  containerQr: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    padding: 10
  },
  containerCounter: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
})
