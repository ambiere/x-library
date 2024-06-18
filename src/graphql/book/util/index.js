function _filter(args) {
  if (args.genre) {
    return {
      genres: {
        has: args.genre
      }
    }
  }
  return {}
}

export async function findMany(args, context) {
  try {
    const filter = _filter(args)
    const books = await context
      .prisma
      .books
      .findMany({
        where: filter
      })

    if (args.author) {
      const authorId = await context
        .prisma
        .author
        .findUnique({
          select: { id: true },
          where: { name: args.author }
        })

      return [
        books.filter(book => book.authorId === authorId.id),
        null
      ]
    }
    return [books, null]
  } catch (err) {
    const error = new Error(err.message)
    error.code = context.errorCode.B2
    return [null, error]
  }
}

export async function addBook(args, context) {
  try {
    const addedBook = await context
      .prisma
      .books
      .create({
        data: {
          title: args.title,
          genres: args.genres,
          published: args.published,
          Author: {
            connectOrCreate: {
              where: { name: args.author },
              create: { name: args.author }
            }
          }
        }
      })

    return [addedBook, null]
  } catch (err) {
    const error = new Error(err.message)
    error.code = context.errorCode.B1
    return [null, error]
  }
}
