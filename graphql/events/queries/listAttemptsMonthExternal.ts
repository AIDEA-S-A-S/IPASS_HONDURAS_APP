export const listAttemptsMonthExternal = /* GraphQL */ `
  query listAttemptsMonthExternal {
    listAttemptsMonthExternal {
      _id
      authenticated
      worker {
        _id
        name
        lastname
      }
      user {
        _id
        name
        lastname
      }
      attempts
      contact {
        _id
        firstName
        lastName
      }
      location {
        _id
        address
        name
      }
      type
      createdAt
      updatedAt
    }
  }
`
