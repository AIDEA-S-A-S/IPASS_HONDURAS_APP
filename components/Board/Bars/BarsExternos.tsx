import commonStyles from 'components/styles'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import { windowsWidth } from 'constants/deviceInfo.constants'
import useColorScheme from 'hooks/useColorScheme'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { BarChart } from 'react-native-gifted-charts'
import { RFPercentage } from 'react-native-responsive-fontsize'
import styles from './styles'
const BarsTotals = ({ dataEvents }: { dataEvents: any[] }) => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region states
  const [dataBar, setDataBar] = useState<any>()
  const [maxNumber, setMaxNumber] = useState(0)
  //#endregion states

  //#region effect
  useEffect(() => {
    if (dataEvents) {
      getData()
    }
  }, [colorScheme])
  //#endregion Effect

  const getData = async () => {
    const newData: any[] = JSON.parse(JSON.stringify(dataEvents)).reverse()
    setMaxNumber(Math.max(..._.flattenDeep(newData.map(e => [e.Eventos, e.EventosExpress]))))
    const data = [
      {
        value: newData[0].Eventos,
        frontColor: '#FF8623',
        label: newData[0].month,
        spacing: 10,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[0].EventosExpress,
        frontColor: '#FFA962'
      },
      {
        value: newData[1].Eventos,
        frontColor: '#FF8623',
        label: newData[1].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[1].EventosExpress,
        frontColor: '#FFA962'
      },
      {
        value: newData[2].Eventos,
        frontColor: '#FF8623',
        label: newData[2].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[2].EventosExpress,
        frontColor: '#FFA962'
      },
      {
        value: newData[3].Eventos,
        frontColor: '#FF8623',
        label: newData[3].month,
        spacing: 1,
        labelWidth: 30,
        labelTextStyle: { color: Colors[colorScheme].text }
      },
      {
        value: newData[3].EventosExpress,
        frontColor: '#FFA962'
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
        Eventos Externos
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
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>Eventos</Text>
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
          <Text style={{ ...commonStyles.text, color: Colors[colorScheme].text }}>
            Eventos Express
          </Text>
        </View>
      </View>
      {dataBar && (
        <>
          <BarChart
            data={dataBar}
            barWidth={RFPercentage(2)}
            spacing={RFPercentage(2)}
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

export default React.memo(BarsTotals)
