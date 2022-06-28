export const listMasterLocationActive = /* GraphQL */ `
  query listMasterLocationActive {
    listMasterLocationActive {
      _id
      name
      address
      location {
        _id
        address
        name
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
      }
    }
  }
`
