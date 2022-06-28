export const sendVerification = /* GraphQL */ `
  mutation sendVerification($contactID: ID) {
    sendVerification(contactID: $contactID) {
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
