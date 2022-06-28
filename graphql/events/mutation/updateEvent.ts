export const updateEvent = /* GraphQL */ `
  mutation updateEvent($input: updateEventInput) {
    updateEvent(input: $input) {
      _id
      name
    }
  }
`
