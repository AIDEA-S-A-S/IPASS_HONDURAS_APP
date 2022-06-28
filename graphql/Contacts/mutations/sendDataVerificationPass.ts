export const sendDataVerificationPass = /* GraphQL */ `
  mutation sendDataVerificationPass($input: verifiedDataInput, $ID: String) {
    sendDataVerificationPass(input: $input, ID: $ID) {
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
      DPI
    }
  }
`
