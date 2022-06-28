export const listBreachLast2Days = /* GraphQL */ `
  query listBreachLast2Days {
    listBreachLast2Days {
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
        banFinish
      }
      contact {
        _id
        firstName
        lastName
        banFinish
      }
      user {
        _id
        name
        lastname
        banFinish
        email
      }
      createdAt
      updatedAt
    }
  }
`
