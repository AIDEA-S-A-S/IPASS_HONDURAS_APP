export const listEventActive = /* GraphQL */ `
  query listEventActive {
    listEventActive {
      invitations {
        _id
        contact {
          _id
          firstName
          lastName
          email
        }
      }
      _id
      name
      start
      host {
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
      end
      location {
        _id
        masterLocation {
          _id
          name
          address
          onlyAllowAuthUSers
          createdAt
          updatedAt
          state
          deletedDate
        }
        childLocations {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        parentLocations {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        address
        name
        admins {
          _id
          name
          lastname
          email
          active
          country
          token
          createdAt
          updatedAt
        }
        host {
          _id
          name
          lastname
          email
          active
          country
          token
          createdAt
          updatedAt
        }
        security {
          _id
          name
          lastname
          email
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
          active
          country
          token
          createdAt
          updatedAt
        }
      }
      beforeStart
      onlyAuthUser
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