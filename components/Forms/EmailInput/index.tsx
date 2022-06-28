import { Input } from '@ui-kitten/components'
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { capitalize } from 'utils/utils'
import RenderIcon from '../general/RenderIcon'
import { IProps } from './props.interface'
import styles from './styles'
const EmailInput: FC<IProps> = ({ value, onChange, element }) => {
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
        keyboardType="email-address"
        {...element.adicionalProps}
        style={styles.input}
        size={'large'}
        placeholderTextColor={'#ACACAC'}
        label={element.label ? renderLabel : ''}
        placeholder={`${capitalize(element.placeholder)}${element.required ? '*' : ''}`}
        {...(element.showIcon && {
          accessoryRight: props => <RenderIcon props={props} name={'email-outline'} />
        })}
        onChangeText={value => onChange(value)}
      />
    </View>
  )
}

export default React.memo(EmailInput)
