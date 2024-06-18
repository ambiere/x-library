import plugin from 'fastify-plugin'

export default plugin(
  async function errorPlugin(app) {
    app.decorate("throw",
      function(code, message) {
        throw new app.errorWithProps(message,
          { ERR_CODE: code }
        )
      }
    )

    app.decorate("errorCode", {
      T1: "TITLE_VALIDATION_ERR",
      A1: "AUTHOR_VALIDATION_ERR",
      A2: 'EDIT_AUTHOR_ERR',
      B1: "CREATE_BOOK_ERR",
      B2: "QUERY_BOOKS_ERR",
      AU1: "AUTH_ERR",
      U1: "SIGN_IN_ERR",
      U2: "SIGN_UP_ERR",
      U3: "SIGN_OUT_ERR",
      U4: "UPDATE_GENRES_ERR",
      ON1: "OPERATION_NAME_ERR"
    })

    app.decorate("errorMessage", {
      T1: "ValidationError: Book title too short. Must be over 18 characters",
      A1: "ValidationError: Author's first or last name too short, must be over 4 characters",
      ON1: "Operation name required"
    })

    app.setErrorHandler(
      async function(error, request, reply) {
        if (reply.statusCode >= 500) {
          request.log.error({ request, reply, error }, error.message)
          reply.send(`[Fatal error] Contact the support team. Id ${request.id} `)
          return
        }

        request.log.info({ request, reply, error }, error.message)
        reply.send(error)
      }
    )
  },
  {
    dependencies: ["mercurius-plugin"]
  }
)
