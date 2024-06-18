const Author = `
  name: String!
  id: ID!
  born: Int
  bookCount: Int
  books: [Book!]
`

export default `
  type Author {
    ${Author}
  }

  type EditedAuthor {
    ${Author}
    editedBy: String!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]
  }

  extend type Mutation {
    editAuthor(id: Int!, name: String, setBornTo: Int): [Author!]
  }

  extend type Subscription {
    authorEdited: EditedAuthor!
  }
`
