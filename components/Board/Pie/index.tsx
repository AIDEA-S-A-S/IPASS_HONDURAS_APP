import commonProps from 'components/styles'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import { windowsWidth } from 'constants/deviceInfo.constants'
import useColorScheme from 'hooks/useColorScheme'
import React, { FC, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
// import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { listAttemptsMonthExternalFn, listAttemptsMonthInternalFn } from 'services/events'
import { iProps } from './props.interface'
import styles from './styles'

const index: FC<iProps> = () => {
  //#region hooks
  const colorScheme = useColorScheme()
  //#endregion hooks

  //#region states
  const [dataInternal, setDataInternal] = useState<any[]>([])
  const [dataExternal, setDataExternal] = useState<any[]>([])
  //#endregion states

  //#region effect

  useEffect(() => {
    getData()
  }, [])
  //#endregion effect

  //#region  functions

  const getData = async () => {
    const monthInternal = await listAttemptsMonthInternalFn()
    const monthExternal = await listAttemptsMonthExternalFn()
    var initExternal
    if (monthExternal.length > 0) {
      var incumplimiento = 0
      const cumplimiento = monthExternal.filter(item => item.authenticated === true).length
      incumplimiento = monthExternal.map(item => item.attempts).reduce((prev, next) => prev + next)
      initExternal = [
        {
          name: 'CUMP',
          cumplimientos: cumplimiento,
          color: Colors[colorScheme]['color-primary-100'],
          legendFontColor: Colors[colorScheme].text,
          legendFontSize: RFPercentage(2)
        },
        {
          name: 'INCUMP',
          cumplimientos: incumplimiento,
          color: Colors[colorScheme]['color-primary-400'],
          legendFontColor: Colors[colorScheme].text,
          legendFontSize: RFPercentage(2)
        }
      ]
    } else {
      initExternal = [] as any
    }

    var initInternal
    if (monthInternal.length > 0) {
      var incumplimiento = 0
      const cumplimiento = monthInternal.filter(item => item.authenticated === true).length
      incumplimiento = monthInternal.map(item => item.attempts).reduce((prev, next) => prev + next)
      initInternal = [
        {
          name: 'CUMP',
          cumplimientos: cumplimiento,
          color: Colors[colorScheme]['color-primary-100'],
          legendFontColor: Colors[colorScheme].text,
          legendFontSize: RFPercentage(2)
        },
        {
          name: 'INCUMP',
          cumplimientos: incumplimiento,
          color: Colors[colorScheme]['color-primary-400'],
          legendFontColor: Colors[colorScheme].text,
          legendFontSize: RFPercentage(2)
        }
      ]
    } else {
      initInternal = [] as any
    }
    setDataInternal(initInternal)
    setDataExternal(initExternal)
  }

  const chartConfig: any = {
    color: (opacity = 1) => Colors[colorScheme].text,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => Colors[colorScheme].text
  }
  //#endregion functions

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            ...styles.container,
            backgroundColor: Colors[colorScheme].containerText,
            marginBottom: 10
          }}
        >
          <Text style={{ ...commonProps.mainTitle, color: Colors[colorScheme].text }}>
            Cumplimientos mensuales externos
          </Text>
          <PieChart
            data={dataExternal}
            width={windowsWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            accessor={'cumplimientos'}
            backgroundColor={'transparent'}
            paddingLeft={'0'}
            center={[10, 0]}
            absolute
          />
        </View>
        <View style={{ ...styles.container, backgroundColor: Colors[colorScheme].containerText }}>
          <Text style={{ ...commonProps.mainTitle, color: Colors[colorScheme].text }}>
            Cumplimientos mensuales Internos
          </Text>
          <PieChart
            data={dataInternal}
            width={windowsWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            accessor={'cumplimientos'}
            backgroundColor={'transparent'}
            paddingLeft={'0'}
            center={[10, 0]}
            absolute
          />
        </View>
      </ScrollView>
    </>
  )
}

export default index
