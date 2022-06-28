export const getEventExpress = /* GraphQL */ `
  query getEventExpress($_id: String) {
    getEventExpress(_id: $_id) {
      _id
      name
      motivo
      authorizedBy {
        _id
        name
        lastname
      }
      invitados {
        _id
        firstName
        lastName
        email
        phone
      }
      host {
        _id
        name
        lastname
        email
      }
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
        abbreviation
        deletedDate
      }
      state
      createdAt
      updatedAt
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
        banFinish
        createdAt
        updatedAt
        empresa
      }
    }
  }
`
