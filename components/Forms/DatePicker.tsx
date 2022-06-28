import ButtonAction from 'components/ButtonAction'
import moment from 'moment'
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { capitalize } from 'utils/utils'
const DatePicker = ({
  onChange,
  value,
  placeholder,
  minDate,
  maxDate
}: {
  onChange: any
  value: any
  placeholder: string
  minDate?: Date
  maxDate?: Date
}) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  const onConfirm = (date: any) => {
    onChange(date)
    handleClose()
  }

  return (
    <>
      <ButtonAction
        width={'100%'}
        white
        text={`${capitalize(placeholder)} ${value && `- ${moment(value).format('DD/MM/YYYY hh:mm A')}`}`}
        mode="light"
        action={() => setOpen(true)}
      />
      <DateTimePickerModal
        confirmTextIOS="Aceptar"
        locale="Es-es"
        headerTextIOS="Elige la fecha"
        cancelTextIOS="Cancelar"
        isVisible={open}
        date={value ? new Date(value) : new Date()}
        mode="datetime"
        onConfirm={onConfirm}
        maximumDate={maxDate}
        minimumDate={minDate}
        onCancel={handleClose}
      />
    </>
  )
}

export default React.memo(DatePicker)
