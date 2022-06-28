export const getUsersAdmin = /* GraphQL */ `
  query getUsersAdmin {
    getUsersAdmin {
      _id
      name
      lastname
      photo {
        filename
        key
      }
      email
      privilegeID {
        _id
        name
        permissions {
          sectionID
          read
          create
          delete
          update
        }
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
`
