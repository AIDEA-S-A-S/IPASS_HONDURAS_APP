import { Text, View } from 'components/Themed'
import React from 'react'
import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Elements from './Elements'
import { FormFactoryProps } from './formTypes'

const FormFactory = (props: FormFactoryProps) => {
  const { formElements, control, errors, isUpdate, data } = props
  return (
    <>
      {formElements?.map((element, i) => {
        const rulesEmail = {
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Ingresa un correo valido.'
          }
        }
        const rules = {
          required: { value: element?.required ? true : false, message: `Campo requerido` },
          ...(element?.type === 'email' && rulesEmail)
        }

        return (
          <React.Fragment key={i}>
            {element.name && (
              <View style={styles.container} key={i}>
                <Controller
                  control={control}
                  name={element?.name}
                  rules={rules}
                  defaultValue={
                    element?.defaultValue && !isUpdate && __DEV__
                      ? element?.defaultValue
                      : data
                      ? data[element?.name]
                      : ''
                  }
                  render={({ field: { onChange, value } }) => (
                    <Elements
                      onSubmit={props.onSubmit}
                      onChange={onChange}
                      value={value}
                      element={element}
                      control={control}
                      errors={errors}
                    />
                  )}
                />
                {errors[element?.name] && (
                  <Text style={styles.messagesError}>{errors[element?.name].message}</Text>
                )}
              </View>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default React.memo(FormFactory)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',
    alignItems: 'center'
    // borderWidth: 1
    // borderWidth: 1
  },
  messagesError: {
    fontSize: RFPercentage(2.5),
    width: '100%',
    color: '#EF0000'
  }
})
