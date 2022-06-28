export const listAvailableDevices = /* GraphQL */ `
  query listAvailableDevices {
    listAvailableDevices {
      _id
      name
      type
      serialNumber
      status
      actualLocation {
        _id
        address
        name
      }
      enableVideo
      enableTalk
      timeWait
    }
  }
`
