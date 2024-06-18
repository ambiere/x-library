import mercurius from "mercurius"
import plugin from "fastify-plugin"
import schema from "../graphql/index.js"

export default plugin(
  async function(app) {
    app.decorate("errorWithProps", mercurius.ErrorWithProps)
    await app.register(mercurius, {
      schema,
      graphiql: true,
      subscription: true,
      context: (_request, reply) => {
        return {
          reply,
          prisma: app.prisma,
          pubsub: app.pubsub,
          auth: app.supabase(reply).auth,
          errorWithProps: app.errorWithProps,
          throw: app.throw,
          errorCode: app.errorCode,
          errorMessage: app.errorMessage
        }
      },
      errorFormatter: (result, context) => {
        result.errors = result.errors.map(hideSensitiveData)
        return mercurius.defaultErrorFormatter(result, context)
      }
    })
  },
  {
    name: "mercurius-plugin",
    dependencies: [
      "application-config",
      "prisma-client",
      "supabase-client"
    ]
  }
)

function hideSensitiveData(error) {
  if (error.extensions) {
    return error
  }
  error.message = "Internal server error"
  return error
}
