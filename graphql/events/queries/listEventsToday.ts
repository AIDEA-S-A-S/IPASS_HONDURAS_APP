export const listEventsToday = /* GraphQL */ `
  query listEventsToday {
    listEventsToday {
      _id
      name
      start
      host {
        _id
        name
        lastname
        email
      }
      end
      location {
        _id
        address
        name
        admins {
          _id
          name
          lastname
        }
        host {
          _id
          name
          lastname
        }
        typeCheck
        device {
          _id
          name
          type
        }
        createdAt
        updatedAt
        state
        abbreviation
        deletedDate
      }
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
      state
      deletedDate
      invitations {
        _id
        event {
          _id
          name
          start
          end
          beforeStart
          onlyAuthUser
          createdAt
          updatedAt
          state
          deletedDate
        }
        contact {
          _id
          firstName
          lastName
          email
          phone
          nickname
          verified
          typeVerified
          banFinish
          createdAt
          updatedAt
        }
        confirmed
        alreadySendInvitation
        isIn
        hourIn
        type
        host {
          _id
          name
          lastname
          email
          active

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
        routes
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
        expiration
        createdAt
        updatedAt
      }
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
