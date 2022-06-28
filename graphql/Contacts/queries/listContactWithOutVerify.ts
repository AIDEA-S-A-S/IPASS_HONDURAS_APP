export const listContactWithOutVerify = /* GraphQL */ `
  query listContactWithOutVerify {
    listContactWithOutVerify {
      _id
      firstName
      lastName
      email
      phone
      nickname
      verified
      typeVerified
      createdAt
      updatedAt
    }
  }
`
