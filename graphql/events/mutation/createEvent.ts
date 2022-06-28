export const createEvent = /* GraphQL */ `
  mutation createEvent($input: EventInput) {
    createEvent(input: $input) {
      _id
      name
    }
  }
`
