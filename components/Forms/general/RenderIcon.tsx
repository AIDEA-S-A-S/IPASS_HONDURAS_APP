import { Icon } from '@ui-kitten/components'
import React, { FC } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { IProps } from './props.interface'

const RenderIcon: FC<IProps> = ({ props, name, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Icon {...props} name={name} />
    </TouchableWithoutFeedback>
  )
}

export default RenderIcon
