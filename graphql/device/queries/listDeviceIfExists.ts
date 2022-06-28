export const listDeviceIfExists = /* GraphQL */ `
  query listDeviceIfExists {
    listDeviceIfExists {
      _id
      name
      type
      serialNumber
      status
      exists
      enableVideo
      enableTalk
      timeWait
    }
  }
`
