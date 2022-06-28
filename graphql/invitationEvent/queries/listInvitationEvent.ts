export const listInvitationEvent = /* GraphQL */ `
  query listInvitationEvent {
    listInvitationEvent {
      _id
      event {
        _id
        name
        start
        end
        location {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        beforeStart
        onlyAuthUser
        createdAt
        updatedAt
        state
        deletedDate
      }
      contact {
        _id
        firstName
        lastName
        email
        phone
        nickname
        verified
        typeVerified
        verifiedData {
          photo
          documentA
          documentB
          birthDate
          expirationDate
          sex
          lastName
          firstName
          nationality
          documentNumber
          correctionName
          correctionLastname
          correctionNumber
        }
        verifiedDataPDF {
          photo
          documentA
          documentB
          num1
          type
          name
          expedition
          expiration
          licNum
          num2
        }
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
        email
      }
      location
      expiration
      createdAt
      updatedAt
    }
  }
`
