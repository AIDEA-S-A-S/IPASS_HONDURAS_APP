import { Input, Toggle } from '@ui-kitten/components'
import { Text, View } from 'components/Themed'
import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { capitalize } from 'utils/utils'
import DatePickerElement from './DatePickerElement'
import EmailInput from './EmailInput'
import { elementsObject, FormFactory } from './formTypes'
import PasswordInput from './PasswordInput'
import PhoneNumber from './PhoneNumber'
import SelectElement from './SelectElement'
import TimePickerElement from './TimePickerElement'
import VerificationCode from './VerificationCode'

const Elements = ({
  onChange,
  value,
  element,
  onSubmit,
  control,
  errors
}: {
  onChange: (...event: any[]) => void
  value: any
  element: FormFactory.FormFactoryType
  onSubmit?: () => void
  errors: DeepMap<Record<string, any>, FieldError>
  control: Control<Record<string, any>>
}): JSX.Element => {
  //props
  const commonProps = {
    placeholderTextColor: '#ACACAC',
    style: styles.input,
    size: 'large',
    ...element.adicionalProps
  }

  const RenderLabel = (props: any) => (
    <Text style={[...props.style, styles.label]}>{`${capitalize(element.placeholder)}${
      element.required ? '*' : ''
    }`}</Text>
  )

  //Elements
  const elementsObject: elementsObject = {
    string: (
      <Input
        onChangeText={value => onChange(value)}
        value={value}
        label={element.label ? RenderLabel : ''}
        {...commonProps}
        placeholder={`${capitalize(element.placeholder)}${element.required ? '*' : ''}`}
      />
    ),
    number: (
      <Input
        onChangeText={value => onChange(value)}
        value={value}
        label={element.label ? RenderLabel : ''}
        keyboardType="numeric"
        {...commonProps}
        placeholder={`${capitalize(element.placeholder)}${element.required ? '*' : ''}`}
      />
    ),
    phone: (
      <PhoneNumber
        control={control}
        errors={errors}
        value={value}
        onChange={onChange}
        element={element}
      />
    ),
    numberCode: (
      <VerificationCode
        onSubmit={onSubmit}
        onChange={onChange}
        value={value}
        commonProps={commonProps}
      />
    ),
    password: <PasswordInput element={element} value={value} onChange={onChange} />,
    email: <EmailInput element={element} value={value} onChange={onChange} />,
    time: (
      <TimePickerElement
        element={element}
        value={value}
        onChange={onChange}
        aditionalProps={element.adicionalProps}
      />
    ),
    date: (
      <DatePickerElement
        element={element}
        value={value}
        onChange={onChange}
        aditionalProps={element.adicionalProps}
      />
    ),
    select: (
      <SelectElement
        data={element.data as any[]}
        element={element}
        value={value}
        onChange={onChange}
      />
    ),
    boolean: (
      <View style={styles.switch}>
        {
          <Text style={{ ...styles.label, fontWeight: 'bold', marginBottom: 5 }}>
            {capitalize(element.placeholder)}
          </Text>
        }

        <Toggle status="primary" checked={value} onChange={onChange} />
      </View>

      // <View style={styles.switch}>
      //   <Text style={styles.text}>{element.placeholder}</Text>
      //   {/* <Switch onValueChange={e => onChange(e)} value={value} trackColor={{ true: Colors['dark'].blueAdmin, false: '#ACACAC' }} /> */}
      // </View>
    )
  }
  return elementsObject[element.type]
}

export default React.memo(Elements)

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    borderRadius: 15
  },
  switch: {
    width: '100%',
    alignItems: 'flex-start',
    paddingVertical: 10,
    backgroundColor: 'transparent'
  },
  label: {
    fontSize: RFPercentage(2.5)
  },
  text: {
    fontSize: RFPercentage(2)
  }
})
