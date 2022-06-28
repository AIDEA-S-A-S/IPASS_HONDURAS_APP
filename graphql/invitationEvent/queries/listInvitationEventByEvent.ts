export const listInvitationEventByEvent = /* GraphQL */ `
  query listInvitationEventByEvent($_id: String) {
    listInvitationEventByEvent(_id: $_id) {
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
        phone
        nickname
        verified
        createdAt
        updatedAt
      }
      confirmed
      alreadySendInvitation
      isIn
      hourIn
      type
      host {
        _id
        name
        lastname
      }
      location {
        _id
        address
        name
        typeCheck
        device {
          _id
          name
          type
          serialNumber
          status
          enableVideo
          enableTalk
          timeWait
        }
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
