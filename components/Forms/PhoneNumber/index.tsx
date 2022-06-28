import { IndexPath, Input, Select, SelectItem } from '@ui-kitten/components'
import { Text, View } from 'components/Themed'
import { callingCountries } from 'country-data'
import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { capitalize } from 'utils/utils'
import { IProps } from './props.interface'
import styles from './styles'

const index: FC<IProps> = ({ value, onChange, element, control }) => {
  //#region states

  //#endregion states

  const renderLabel = (props: any) => (
    <Text style={[...props.style, styles.label]}>{`${capitalize(element.placeholder)}${
      element.required ? '*' : ''
    }`}</Text>
  )

  return (
    <View style={styles.container}>
      <Controller
        name="indicativo"
        control={control}
        defaultValue={
          new IndexPath(callingCountries?.all?.findIndex(e => e?.countryCallingCodes[0] === '+502'))
        }
        render={({ field: { onChange, value } }) => (
          <Select
            style={{ width: 140 }}
            selectedIndex={value}
            onSelect={index => onChange(index)}
            value={`${callingCountries.all[value?.row]?.emoji} ${
              callingCountries.all[value?.row]?.countryCallingCodes[0]
            }`}
            size="large"
          >
            {callingCountries.all.map((e, i) => (
              <SelectItem key={i} title={`${e.emoji} ${e.alpha2} `} />
            ))}
          </Select>
        )}
      />

      <Input
        value={value}
        keyboardType="number-pad"
        {...element.adicionalProps}
        style={styles.input}
        size={'large'}
        placeholderTextColor={'#ACACAC'}
        label={element.label ? renderLabel : ''}
        placeholder={`${capitalize(element.placeholder)}${element.required ? '*' : ''}`}
        onChangeText={value => onChange(value)}
      />
    </View>
  )
}

export default React.memo(index)
