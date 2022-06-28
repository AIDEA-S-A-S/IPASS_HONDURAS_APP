import { Input } from '@ui-kitten/components'
import { View } from 'components/Themed'
import { windowsWidth } from 'constants/deviceInfo.constants'
import _ from 'lodash'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { IProps } from './props.interface'
import styles from './styles'
const CELL_COUNT = 6

const AnimatedCode: FC<IProps> = ({ value, onChange, onSubmit }) => {
  const size = (windowsWidth * 0.2) / CELL_COUNT
  const totalWidth = _.range(CELL_COUNT)
  const [values, setValues] = useState<string[]>(totalWidth.map(() => ''))
  const inputsRef = useRef<(Input | null)[]>(totalWidth.map(() => null))
  useEffect(() => {
    if (value.length === CELL_COUNT) {
      onSubmit && onSubmit()
    }
  }, [value])

  const onChangeText = (newText: string, i: number) => {
    if (newText === 'Backspace') {
      setValues(values.map((value, index) => (index === i ? '' : value)))
      inputsRef.current[i - 1]?.focus()
    } else {
      setValues(values.map((value, index) => (index === i ? newText : value)))
      inputsRef.current[i + 1]?.focus()
    }
  }

  const onChangeTextAndroid = (newText: string, i: number) => {
    setValues(values.map((value, index) => (index === i ? newText : value)))
    if (newText !== '' && newText !== ' ') {
      inputsRef.current[i + 1]?.focus()
    } else {
      inputsRef.current[i - 1]?.focus()
    }
  }

  useEffect(() => {
    onChange(values.join(''))
  }, [values])

  return (
    <View style={styles.containerCell}>
      {totalWidth.map((i: number) => (
        <Input
          value={values[i]}
          ref={el => (inputsRef.current[i] = el)}
          maxLength={1}
          textAlignVertical={'bottom'}
          textStyle={[
            styles.inputText,
            {
              height: size,
              width: size,
              ...{ padding: 0, paddingVertical: 0, fontSize: Platform.OS === 'android' ? RFPercentage(1.9) : RFPercentage(2.5) }
            }
          ]}
          size="large"
          key={i}
          {...(Platform.OS === 'android'
            ? {
                onChangeText: newText => onChangeTextAndroid(newText, i)
              }
            : {
                onKeyPress: e => onChangeText(e.nativeEvent.key, i)
              })}
          keyboardType="number-pad"
          style={[styles.input]}
        />
      ))}
    </View>
  )
}

AnimatedCode.propTypes = {}

export default React.memo(AnimatedCode)
