export const getDevice = /* GraphQL */ `
  query getDevice($_id: ID!) {
    getDevice(_id: $_id) {
      _id
      name
      type
      serialNumber
      status
      exists
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
