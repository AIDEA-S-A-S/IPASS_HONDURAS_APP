export const listBreachLast2DaysApp = /* GraphQL */ `
  query listBreachLast2DaysApp {
    listBreachLast2DaysApp {
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
