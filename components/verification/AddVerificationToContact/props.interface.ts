import { IContact } from 'types/types'

export interface iProps {
  associateContact: (data: IContact) => Promise<void>
}
