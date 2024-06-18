const Book = `
  id: ID!
  title: String!
  published: Int!
  authorId: Int!
  author: String!
  genres: [String!]
`

export default `
  type Book {
    ${Book}
  }

  type AddedBook {
    ${Book}
    addedBy: String!
  }

  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
  }

  extend type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]
    ): Book!
  }

  extend type Subscription {
    bookAdded: AddedBook!
  }
`
