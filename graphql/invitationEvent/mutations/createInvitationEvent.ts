export const createInvitationEvent = /* GraphQL */ `
  mutation createInvitationEvent($input: InvitationEventInput) {
    createInvitationEvent(input: $input) {
      _id
      event {
        _id
        name
      }
      contact {
        _id
        firstName
        lastName
        email
      }
      confirmed
      alreadySendInvitation
      isIn
      hourIn
      type
      routes
      expiration
      createdAt
      updatedAt
    }
  }
`
