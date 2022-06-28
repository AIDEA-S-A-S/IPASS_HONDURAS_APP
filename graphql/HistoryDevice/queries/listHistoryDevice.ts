export const listHistoryDevice = /* GraphQL */ `
  query listHistoryDevice {
    listHistoryDevice {
      _id
      name
      type
      serialNumber
      status
      actualLocation {
        _id
        address
        name
        typeCheck
        createdAt
        updatedAt
        state
        deletedDate
      }
      enableVideo
      enableTalk
      timeWait
      origID
      deletedDate
      createdAt
      updatedAt
    }
  }
`
