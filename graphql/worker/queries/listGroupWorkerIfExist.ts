export const listGroupWorkerIfExist = /* GraphQL */ `
  query listGroupWorkerIfExist {
    listGroupWorkerIfExist {
      _id
      name
      photo {
        filename
        key
      }
      abbreviation
      location {
        _id
        masterLocation {
          _id
          name
          address
          onlyAllowAuthUSers
          tree
          createdAt
          updatedAt
          state
          deletedDate
        }
        address
        typeCheck
        createdAt
        updatedAt
        state
        deletedDate
      }
      exists
    }
  }
`
