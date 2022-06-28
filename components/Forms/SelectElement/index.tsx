// import { Datepicker } from '@ui-kitten/components'
import { Select, SelectItem } from '@ui-kitten/components'
import { Text, View } from 'components/Themed'
import React, { FC } from 'react'
import { capitalize } from 'utils/utils'
import { IProps } from './props.interface'
import styles from './styles'

const index: FC<IProps> = ({ value, onChange, element, data }) => {
  const renderLabel = (props: any) => (
    <Text style={[...props.style, styles.label]}>{`${capitalize(element.placeholder)}${
      element.required ? '*' : ''
    }`}</Text>
  )

  return (
    <View style={styles.container}>
      <Select
        label={element.label ? renderLabel : ''}
        onSelect={index => {
          onChange(index)
        }}
        multiSelect={element.multiple}
        value={
          value
            ? Object.keys(data[0]).findIndex(e => e === '_id') !== -1
              ? element.multiple
                ? element.key == 'contact'
                  ? value
                      ?.map(
                        (e: any) =>
                          `${capitalize(data[e?.row]?.firstName)} ${capitalize(
                            data[e?.row]?.lastName
                          )}`
                      )
                      ?.join(', ')
                  : value?.map((e: any) => data[e?.row]?.name)?.join(', ')
                : element.key == 'contact'
                ? `${capitalize(data[value?.row].firstName)} ${capitalize(
                    data[value?.row].lastName
                  )}`
                : data[value?.row].name
              : element.multiple
              ? value?.map((e: any) => data[e?.row])?.join(', ')
              : data[value?.row]
            : ''
        }
        size="large"
        selectedIndex={value}
        placeholder={element.placeholder}
      >
        {data.map((item: any, i) => {
          if (Object.keys(item).findIndex(e => e === '_id') !== -1) {
            if (element.key === 'contact') {
              return (
                <SelectItem
                  disabled={item?.disabled}
                  key={item._id}
                  title={`${capitalize(item.firstName)} ${capitalize(item?.lastName)}`}
                />
              )
            } else {
              return (
                <SelectItem
                  key={item._id}
                  title={
                    element.lastname
                      ? `${capitalize(item?.name)} ${capitalize(item?.lastname)}`
                      : item?.name
                  }
                />
              )
            }
          } else {
            return <SelectItem key={i} title={item} />
          }
        })}
      </Select>
    </View>
  )
}

export default React.memo(index)
