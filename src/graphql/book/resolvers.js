import { addBook, findMany } from "./util/index.js"

export default {
  Query: {
    bookCount: async (_root, _args, context) => {
      return await context.prisma.books.count()
    },

    allBooks: async (_root, args, context) => {
      const [books, error] = await findMany(args, context)
      if (error) return context.throw(error.code, error.message)
      return books
    }
  },

  Book: {
    author: async (root, _args, context) => {
      return (
        await context
          .prisma
          .author
          .findUnique({
            where: { id: root.authorId },
            select: {
              name: true
            }
          })
      ).name
    }
  },

  Mutation: {
    addBook: async (_root, args, context) => {
      const name = args.author.split(" ")
      const firstName = name[0].length
      const lastname = name[1].length

      args.title.length < 12 && context.throw(context.errorCode.T1, context.errorMessage.T1)
      firstName < 4 || lastname < 4 && context.throw(context.errorCode.A1, context.errorMessage.A1)

      const [book, error] = await addBook(args, context)
      error && context.throw(error.code, error.message)

      await context.pubsub.publish({
        topic: "BOOK_ADDED",
        payload: {
          bookAdded: {
            ...book,
            addedBy: context.app.user.id
          }
        }
      })
      return book
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: async (_root, _args, { pubsub }) => {
        return await pubsub.subscribe('BOOK_ADDED')
      }
    }
  }
}
