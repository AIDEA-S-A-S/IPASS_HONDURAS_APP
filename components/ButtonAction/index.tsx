import { Button, Icon } from '@ui-kitten/components'
import { View } from 'components/Themed'
import React, { FC } from 'react'
import { IProps } from './props.interface'
import styles from './styles'
const ButtonAction: FC<IProps> = props => {
  const {
    text,
    // mode,
    onPress,
    styles: newStyles,
    disabled,
    status,
    icon,
    RenderIcon,
    flexStart
  } = props

  const CustomIcon = (props: any) => <Icon {...props} name={icon} />

  return (
    <View style={{ ...styles.container, ...newStyles }}>
      <Button
        {...(icon && { accessoryLeft: CustomIcon })}
        {...(RenderIcon && { accessoryLeft: RenderIcon })}
        status={status ? status : 'primary'}
        size="large"
        style={{ ...styles.button, ...(flexStart && { justifyContent: 'flex-start' }) }}
        disabled={disabled}
        onPress={() => onPress()}
      >
        {text}
      </Button>
    </View>
  )
}

export default React.memo(ButtonAction)
