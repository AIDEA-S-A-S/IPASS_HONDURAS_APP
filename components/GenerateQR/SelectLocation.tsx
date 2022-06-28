import { Input } from '@ui-kitten/components'
import CardComponent from 'components/CardComponent'
import { Text } from 'components/Themed'
import React, { useEffect, useState } from 'react'
import { VirtualizedList } from 'react-native'
import { ILocation } from 'types/types'
import styles from './styles'

const SelectLocation = ({
  setSelectedLocation,
  locations
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<ILocation | undefined>>
  locations: ILocation[]
}) => {
  const commonProps = { placeholderTextColor: '#ACACAC', style: styles.input, size: 'large' }

  //#region states
  const [searchedData, setSearchedData] = useState<ILocation[]>([])
  const [searchedValue, setSearchedValue] = useState<string>('')
  //#endregion states

  const onSearch = (value: string) => {
    value !== ''
      ? setSearchedData(
          locations &&
            locations.filter(e => `${e.name?.toLowerCase()}`.includes(value.toLowerCase()))
        )
      : setSearchedData(locations)
    setSearchedValue(value)
  }

  useEffect(() => {
    searchedValue !== ''
      ? setSearchedData(
          locations &&
            locations.filter(e => `${e.name?.toLowerCase()}`.includes(searchedValue.toLowerCase()))
        )
      : setSearchedData(locations)
  }, [locations])

  return (
    <>
      <Text style={styles.info}>Seleccione locación a la que desee ingresar:</Text>
      <Input {...commonProps} onChangeText={onSearch} placeholder={`Buscar`} />
      {locations && (
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          data={searchedData}
          contentContainerStyle={{ width: '100%' }}
          getItemCount={data => data.length}
          getItem={(data, index) => ({ ...data[index] })}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }: { item: ILocation }) => (
            <CardComponent onPress={() => setSelectedLocation(item)} showButtonAction={false}>
              <Text style={styles.title}>{item.name}</Text>
            </CardComponent>
          )}
        />
      )}
    </>
  )
}

export default SelectLocation
