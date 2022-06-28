import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import BarsTotals from './BarsTotals'
import BarsExternos from './BarsExternos'
import { iLocationAttemptAnalythics } from 'types/types'
import { analythicsAttemptsAppFn } from 'services/analythics'
const index = () => {
  //#region  states
  const [dataAnalythics, setDataAnalythics] = useState<iLocationAttemptAnalythics>()
  //#endregion states

  //#region  effect
  useEffect(() => {
    getData()
  }, [])
  //#region  effect

  //#region functions
  const getData = async () => {
    setDataAnalythics(await analythicsAttemptsAppFn())
  }

  //#endregion functions

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }} horizontal>
      {dataAnalythics && (
        <>
          <BarsTotals dataCumpIncp={dataAnalythics.dataCumpIncp} />
          <BarsExternos dataEvents={dataAnalythics.dataEvents} />
        </>
      )}
    </ScrollView>
  )
}

export default React.memo(index)
