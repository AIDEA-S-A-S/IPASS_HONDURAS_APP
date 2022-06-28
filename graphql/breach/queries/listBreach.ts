export const listBreach = /* GraphQL */ `
  query listBreach {
    listBreach {
      _id
      grade
      location {
        _id
        address
        name
      }
      status
      worker {
        _id
        name
        lastname
        email
      }
      contact {
        _id
        firstName
        lastName
      }
      user {
        _id
        name
        lastname
        email
      }
      createdAt
      updatedAt
    }
  }
`
