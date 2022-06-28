export const getMasterLocation = /* GraphQL */ `
  query getMasterLocation($_id: String) {
    getMasterLocation(_id: $_id) {
      _id
      name
      address
      location {
        _id
        address
        name
        typeCheck
        createdAt
        updatedAt
        state
        deletedDate
      }
      onlyAllowAuthUSers
      tree
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
        verifyLogin
        createdAt
        updatedAt
        canCreateHost
        allEventWithAuth
        canAccessToApp
        canAccessToWeb
        document
        typeDocument
        code
        phone
        QR
      }
    }
  }
`
