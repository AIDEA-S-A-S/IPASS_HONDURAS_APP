export const getUser = /* GraphQL */ `
  query getUser($_id: String) {
    getUser(_id: $_id) {
      _id
      name
      lastname
      tokenExpo
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
      group {
        _id
        name
        location {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          abbreviation
          deletedDate
        }
        exists
        abbreviation
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
      canUseAuthenticator
      code
      phone
      QR
      nativeLocation {
        _id
        address
        name
        typeCheck
        createdAt
        updatedAt
        state
        abbreviation
        deletedDate
      }
      canUseAuthenticator
      timeZone {
        _id
        name
        start
        end
        days
        abbreviation
        createdAt
        updatedAt
      }
    }
  }
`
