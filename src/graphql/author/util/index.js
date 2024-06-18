export async function editAuthor(args, context) {
  try {
    const updatedAuthor = await context
      .prisma
      .author
      .update({
        where: { id: args.id },
        data: {
          name: args.name,
          born: args.setBornTo
        }
      })
    return [updatedAuthor, null]
  } catch (err) {
    const error = new Error(err.message)
    error.code = context.errorCode.A2
    return [null, error]
  }
}
