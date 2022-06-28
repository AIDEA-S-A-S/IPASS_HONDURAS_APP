export const getEventContact = /* GraphQL */ `
  query getEventContact($_id: ID) {
    getEventContact(_id: $_id) {
      _id
      event {
        _id
        name
        start
        # address
        end
        beforeStart
        onlyAuthUser
        createdAt
        updatedAt
        state
        deletedDate
      }
      confirmed
      alreadySendInvitation
      isIn
      hourIn
      type
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
        address
        name

        typeCheck
        createdAt
        updatedAt
        state
        deletedDate
      }
      expiration
      createdAt
      updatedAt
    }
  }
`
