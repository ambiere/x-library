import _ from "lodash"
import userTypeDefs from "./user/typeDefs.js"
import userResolvers from "./user/resolvers.js"
import authorTypeDefs from "./author/typeDefs.js"
import authorResolvers from "./author/resolvers.js"
import bookTypeDefs from "./book/typeDefs.js"
import bookResolvers from "./book/resolvers.js"
import { makeExecutableSchema } from "@graphql-tools/schema"

const typeDefs = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`

const resolvers = {}

export default makeExecutableSchema({
  typeDefs: [typeDefs, userTypeDefs, authorTypeDefs, bookTypeDefs],
  resolvers: _.merge(resolvers, userResolvers, authorResolvers, bookResolvers)
})

