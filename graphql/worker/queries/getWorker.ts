export const getWorker = /* GraphQL */ `
  query getWorker($_id: String) {
    getWorker(_id: $_id) {
      _id
      name
      tokenExpo
      lastname
      email
      verifyLogin
      active
      phone
      code
      document
      photo {
        filename
        key
      }
      typeDocument
      QR
      temporal_Qr {
        QR
        worker
        timeEnd
        used
        valid
      }
      canAccessToApp
      canAccessToWeb
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
      nativeLocation {
        _id
        address
        name
        typeCheck
      }
      canUseAuthenticator
      banFinish
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
      createdAt
      updatedAt
    }
  }
`
