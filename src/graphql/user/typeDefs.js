export default `
  type User {
    userId: String!
    username: String!
    email: String!
    favoriteGenres: [String!]
  }

  type SignOutUser {
    status: String!
  }

  type Genres {
    favoriteGenres: [String!]!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    signOutUser: SignOutUser
    signInUser(email: String!, password: String!): User
    signUpUser(email: String!, password: String!, username: String, genres: [String!]): User
    updateGenres(genres: [String!]!): Genres
  }
`
