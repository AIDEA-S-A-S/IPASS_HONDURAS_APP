export const listLocationActive = /* GraphQL */ `
  query listLocationActive {
    listLocationActive {
      _id
      masterLocation {
        _id
        name
        address
      }
      address
      name
      security {
        _id
        name
        lastname
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active
        country
        token
        createdAt
        updatedAt
      }
      typeCheck
      device {
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
      }
      createdAt
      updatedAt
      state
      deletedDate
      whoDeleted {
        _id
        name
        lastname
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active
        country
        token
        createdAt
        updatedAt
      }
    }
  }
`
