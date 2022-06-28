// import { Datepicker } from '@ui-kitten/components'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Text, View } from 'components/Themed'
import Colors from 'constants/Colors'
import useColorScheme from 'hooks/useColorScheme'
import moment from 'moment'
import React, { FC, useState } from 'react'
import { Platform, Pressable } from 'react-native'
import { capitalize } from 'utils/utils'
import { IProps } from './props.interface'
import styles from './styles'

const index: FC<IProps> = ({ value, onChange, element }) => {
  const colorScheme = useColorScheme()

  const [visible, setVisible] = useState(false)

  const handleChange = (_: any, selectedDate?: Date) => {
    setVisible(Platform.OS === 'ios')
    onChange(selectedDate)
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, fontWeight: 'bold', marginBottom: 10 }}>{`${capitalize(
        element.placeholder
      )}${element.required ? '*' : ''}`}</Text>
      {Platform.OS !== 'ios' && (
        <Pressable onPress={() => setVisible(true)}>
          <View
            style={{
              height: 50,
              borderRadius: 10,
              backgroundColor: Colors[colorScheme]['color-basic-900'],
              justifyContent: 'center',
              paddingLeft: 20,
              marginBottom: 10
            }}
          >
            <Text>{value ? moment(value).format('DD/MM/YYYY') : `Selecciona una fecha`}</Text>
          </View>
        </Pressable>
      )}

      {/* )} */}
      {Platform.OS === 'ios' && (
        <DateTimePicker
          mode="date"
          locale="es-ES"
          style={{
            backgroundColor: Colors[colorScheme]['color-basic-900'],
            borderRadius: 10,
            overflow: 'hidden'
          }}
          timeZoneOffsetInMinutes={0}
          display={'inline'}
          themeVariant={colorScheme}
          value={value ? value : new Date()}
          onChange={handleChange}
          {...element.adicionalProps}
        />
      )}
      {Platform.OS !== 'ios' && visible && (
        <DateTimePicker
          mode="date"
          locale="es-ES"
          timeZoneOffsetInMinutes={0}
          display={'default'}
          themeVariant={colorScheme}
          value={value ? value : new Date()}
          onChange={handleChange}
          {...element.adicionalProps}
        />
      )}
    </View>
  )
}

export default React.memo(index)
