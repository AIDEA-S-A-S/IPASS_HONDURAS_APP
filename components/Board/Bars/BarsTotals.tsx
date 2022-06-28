import commonStyles from 'components/styles'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import React, { useEffect, useState } from 'react'
// @ts-ignore
import PureChart from 'react-native-pure-chart'
import styles from './styles'
import { BarChart } from 'react-native-gifted-charts'
import { windowsWidth } from 'constants/deviceInfo.constants'
import { RFPercentage } from 'react-native-responsive-fontsize'
import _ from 'lodash'

const BarsTotals = ({ dataCumpIncp }: { dataCumpIncp?: any[] }) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region states
  const [dataBar, setDataBar] = useState<any>()
  const [maxNumber, setMaxNumber] = useState(0)

  //#endregion states

  //#region effect
  useEffect(() => {
    getData()
  }, [colorScheme])
  //#endregion Effect

  const getData = async () => {
    const newData: any[] = JSON.parse(JSON.stringify(dataCumpIncp)).reverse()
    setMaxNumber(Math.max(..._.flattenDeep(newData.map(e => [e.CEXT, e.CINT, e.IEXT, e.IINT]))))

    const data = [
      {
        value: newData[0].CEXT,
        frontColor: '#FF8623',
        label: newData[0].month,
        spacing: 10,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[0].CINT,
        frontColor: '#FFA962'
      },
      {
        value: newData[0].IEXT,
        frontColor: '#FFC391'
      },
      {
        value: newData[0].IINT,
        frontColor: '#FFDDC0'
      },
      {
        value: newData[1].CEXT,
        frontColor: '#FF8623',
        label: newData[1].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[1].CINT,
        frontColor: '#FFA962'
      },
      {
        value: newData[1].IEXT,
        frontColor: '#FFC391'
      },
      {
        value: newData[1].IINT,
        frontColor: '#FFDDC0'
      },
      {
        value: newData[2].CEXT,
        frontColor: '#FF8623',
        label: newData[2].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[2].CINT,
        frontColor: '#FFA962'
      },
      {
        value: newData[2].IEXT,
        frontColor: '#FFC391'
      },
      {
        value: newData[2].IINT,
        frontColor: '#FFDDC0'
      },
      {
        value: newData[3].CEXT,
        frontColor: '#FF8623',
        label: newData[3].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[3].CINT,
        frontColor: '#FFA962'
      },
      {
        value: newData[3].IEXT,
        frontColor: '#FFC391'
      },
      {
        value: newData[3].IINT,
        frontColor: '#FFDDC0'
      }
    ]

    setDataBar(data)
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[colorScheme].containerText,
        marginBottom: 10
      }}
    >
      <Text style={{ ...commonStyles.mainTitle, color: Colors[colorScheme].text }}>
        Cumplimientos/Incumplimientos totales
      </Text>
      <View style={{ ...styles.containerLegend, backgroundColor: 'transparent' }}>
        <View style={styles.containerLegendItem}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#FF8623',
              marginRight: 5
            }}
          ></View>
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>C.EXT</Text>
        </View>
        <View style={styles.containerLegendItem}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#FFA962',
              marginRight: 5
            }}
          ></View>
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>C.INT</Text>
        </View>
        <View style={styles.containerLegendItem}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#FFC391',
              marginRight: 5
            }}
          ></View>
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>I.EXT</Text>
        </View>
        <View style={styles.containerLegendItem}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#FFDDC0',
              marginRight: 5
            }}
          ></View>
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>I.INT</Text>
        </View>
      </View>
      {dataBar && (
        <>
          <BarChart
            data={dataBar}
            barWidth={RFPercentage(1)}
            spacing={5}
            roundedTop
            width={windowsWidth * 0.7}
            xAxisThickness={1}
            yAxisColor={Colors[colorScheme].text}
            xAxisColor={Colors[colorScheme].text}
            yAxisThickness={1}
            yAxisTextStyle={{ color: Colors[colorScheme].text }}
            noOfSections={5}
            isAnimated
            maxValue={maxNumber}
          />
        </>
      )}
    </View>
  )
}

export default BarsTotals
