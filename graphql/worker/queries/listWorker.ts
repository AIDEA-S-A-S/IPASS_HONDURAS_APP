export const listWorker = /* GraphQL */ `
  query listWorker($page: Int, $limit: Int, $filters: Any) {
    listWorker(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        name
        lastname
        email
        verifyLogin
        photo {
          filename
          key
        }
        active
        phone
        document
        typeDocument
        QR
        temporal_Qr {
          QR
          worker
          timeEnd
          used
          valid
        }
        createdAt
        updatedAt
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
