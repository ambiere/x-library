import { editAuthor } from "./util/index.js"

export default {
  Query: {
    authorCount: async (_root, _args, context) => {
      return await context.prisma.authors.count()
    },

    allAuthors: async (_root, _args, context) => {
      return await context
        .prisma
        .author
        .findMany({ include: { books: true } })
    }
  },

  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },

  Mutation: {
    editAuthor: async (_root, args, context) => {
      const name = args.name.split(" ")
      const firstName = name[0].length
      const lastName = name[1].length

      firstName < 4 || lastName < 4 && context.throw(context.errorCode.A1, context.errorMessage.A1)

      const [author, error] = await editAuthor(args, context)
      if (error) return context.throw(error.code, error.message)

      await context.pubsub.publish({
        topic: "AUTHOR_EDITED",
        payload: {
          authorEdited: {
            ...author,
            editedBy: context.app.user.id
          }
        }
      })
      return author
    }
  },

  Subscription: {
    authorEdited: {
      subscribe: async (_root, _args, { pubsub }) => {
        return await pubsub.subscribe('AUTHOR_EDITED')
      }
    }
  }
}
