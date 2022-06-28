export const listAllUsers = /* GraphQL */ `
  query listAllUsers {
    listAllUsers {
      _id
      name
      lastname
      email
      photo {
        filename
        key
      }
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
`
