import { Input } from '@ui-kitten/components'
import { View } from 'components/Themed'
import React, { FC, useState } from 'react'
import { Text } from 'react-native'
import { capitalize } from 'utils/utils'
import RenderIcon from '../general/RenderIcon'
import { IProps } from './props.interface'
import styles from './styles'
const PasswordInput: FC<IProps> = ({ element, value, onChange }) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const renderLabel = (props: any) => (
    <Text style={[...props.style, styles.label]}>{`${capitalize(element.placeholder)}${
      element.required ? '*' : ''
    }`}</Text>
  )

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize="none"
        value={value}
        placeholderTextColor={'#ACACAC'}
        {...element.adicionalProps}
        style={styles.input}
        label={element.label ? renderLabel : ''}
        placeholder={`${capitalize(element.placeholder)}${element.required ? '*' : ''}`}
        accessoryRight={props => (
          <RenderIcon
            onPress={() => setSecureTextEntry(!secureTextEntry)}
            props={props}
            name={secureTextEntry ? 'eye-off' : 'eye'}
          />
        )}
        secureTextEntry={secureTextEntry}
        onChangeText={value => onChange(value)}
      />
    </View>
  )
}

export default PasswordInput
