export const listUser = /* GraphQL */ `
  query listUser($page: Int, $limit: Int, $filters: Any) {
    listUser(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        name
        photo {
          filename
          key
        }
        lastname
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active
        country
        token
        verifyLogin
        createdAt
        updatedAt
        canCreateHost
        allEventWithAuth
        canAccessToApp
        canAccessToWeb
        document
        typeDocument
        code
        phone
        QR
      }
      totalDocs
      limit
      page
      totalPages
      pagingCounter
      hasPrevPage
      hasNextPage
      offset
      prevPage
      nextPage
    }
  }
`
