import { isString, isJson } from './is'
import Buffer from 'buffer'
export function getBase64(value: any) {
  let buffer: any = false
  if (isString(value)) {
    buffer = Buffer.Buffer.from(value, 'base64').toString('ascii')
  }
  if (isJson(buffer)) {
    buffer = JSON.parse(Buffer.Buffer.from(value, 'base64').toString('ascii'))
  }
  return buffer
}
