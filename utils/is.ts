export function isArray(v: any) {
  return Array.isArray(v)
}

export function isDefined(v: any) {
  return typeof v !== 'undefined' && v !== null
}

export function isFalse(v: any) {
  return isDefined(v) && v === false
}

export function isNumber(v: any) {
  return typeof v === 'number'
}

export function isFunction(v: any) {
  return typeof v === 'function'
}

export function isJson(str: any) {
  if (!str || str === null) {
    return false
  }
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export function isObject(v: any) {
  return isDefined(v) && typeof v === 'object' && !isArray(v)
}

export function isString(v: any) {
  return isDefined(v) && typeof v === 'string'
}

export function isUndefined(v: any) {
  return typeof v === 'undefined' || v === null
}

export function isEmptyObject(v: any) {
  return v ? Object.keys(v).length === 0 : true
}
