export type ColumnFactoryType = {
  name: string
  search?: boolean
  sort?: boolean
  filter?: string[]
  customRender?: (render: any) => JSX.Element | string
}

export type basicTable = {
  _id?: string
  key?: string
  createdAt?: Date
  updatedAt?: Date
  operation?: operation
}
export type operation = 'create' | 'update' | 'delete'

export type fileType = {
  filename: string
  key: string
}
