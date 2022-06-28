export const listAttemptsMonthInternal = /* GraphQL */ `
  query listAttemptsMonthInternal {
    listAttemptsMonthInternal {
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
